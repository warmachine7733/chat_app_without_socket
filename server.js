var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var router = express.Router();
var app = new express();

//file Upload
var multer = require('multer');
var path = require('path');

var mongo = require('mongodb');
var mongoose = require('mongoose');
//var arr = new Array();

mongoose.connect('mongodb://localhost/loginapp');
var db = mongoose.connection;

var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://localhost:27017/loginapp';
//requiring from model
var User = require('./model/index');
//var UserSchema = require('./model/index');
var Msg = require('./model/msgs.js');

var flak;




app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

app.post('/', function (req, res) {
  var nameMsg, nameDB, lnDB, emMsg, emDB, pwMsg, pwDB, name, email, Password
  name = req.body.data.name;
  email = req.body.data.email;
  password = req.body.data.pw;
  console.log("name " + name);
  console.log("email" + email);
  console.log("password" + password);
  console.log(req.body.data.status);
  console.log('user', User);
  var updateStatus = req.body.data.status;

  //server side verification of fields 
  (req.body.data.name === "") ? nameMsg = "required" : nameMsg = "";
  (req.body.data.email === "") ? emMsg = "required" : emMsg = "";
  (req.body.data.pw === "") ? pwMsg = "required" : pwMsg = "";
  if (emMsg === "required" || nameMsg === "required" || pwMsg === "required") {
    updateStatus = false;
  } else {
    updateStatus = true;
  }
  res.json({
    nameMsg, updateStatus, emMsg, pwMsg
  })

  if (updateStatus) {
    var newUser = new User({
      name: name,
      email: email,
      password: password,
      contact: []
    });
    console.log('newUser', newUser);
    newUser.save(function (err, user) {
      if (err) throw err;
      console.log(user);
    });
  }
});
app.post('/signin', function (req, res) {
  console.log("you are here");
  var dbName;
  var dbPw;
  var sName = req.body.data.name;
  var sPw = req.body.data.pw;
  var updatedCred = req.body.data.credential;
  var changedStat = req.body.data.status;
  console.log("before mongo" + changedStat + " cred val: " + updatedCred);
  var MongoClient = require('mongodb').MongoClient;
  var url = 'mongodb://localhost:27017/loginapp'
  MongoClient.connect(url, function (err, client) {
    if (err) {
      console("error " + err);
    } else {
      console.log("connection established")
      var db = client.db('loginapp');
      db.collection('users').findOne({ name: sName, password: sPw }, function (findErr, result) {
        if (findErr) throw findErr;
        if (result != null) {
          dbName = result.name;
          dbPw = result.password;
          console.log(dbName + " " + dbPw)
          changedStat = true;
          console.log("in mongo" + changedStat)
          res.json({
            changedStat, dbName
          });
          console.log("after res " + changedStat + " " + dbName)

        } else {
          console.log('notmatched')
          updatedCred = "wrong credentials"
          res.json({
            updatedCred
          });
        }
        client.close();

      });
    }
  });
});
app.post('/home', function (req, res) {

  var user = req.body.data.user;
  var contact = req.body.data.contact;
  var arr = req.body.arr;
  var previousContactArr;
  var contactStatus;
  var contactMsg;
  var cantAddOwn;
  MongoClient.connect(url, function (err, client) {
    if (err) {
      console("error " + err);
    } else {
      console.log("connection established")
      var db = client.db('loginapp');
      db.collection('users').findOne({ name: contact }, function (findErr, result) {
        if (findErr != null) {
          console.log("not")
        };
        if (result === null) {
          console.log("not found");
          db.collection('users').findOne({ name: user }, function (err, results) {
            if (err) throw err;
            arrayOfContacts = results.contact;
            console.log("results.contact", arrayOfContacts);
            var renderedArr = arrayOfContacts;
            contact === "" || contact == undefined ? contactStatus = "" : contactStatus = "not in our db"
            console.log(contactStatus);
            res.json({
              arr, renderedArr, contactStatus
            })

          });


        } else {

          db.collection('users').findOne({ name: user }, function (err, results) {
            if (err) throw err;
            previousContactArr = results.contact;
            console.log("results.contact", previousContactArr);
            if (previousContactArr.includes(contact)) {
              contactMsg = "already added";
              renderedArr = previousContactArr;
            } else if (contact === user) {
              cantAddOwn = "cant add yourself in contacts"

              renderedArr = previousContactArr;
            }
            else if (contact === undefined) {
              contactMsg = "enter a name";
              renderedArr = previousContactArr;
            }
            else {
              renderedArr = previousContactArr.concat(arr);
              db.collection("users").update({ name: user }, { $set: { "contact": previousContactArr.concat(arr) } });

              console.log(renderedArr);
            }
            console.log(cantAddOwn);
            res.json({
              arr, renderedArr, contactMsg, cantAddOwn
            })

          });
        }
      });
    }
  });
});
app.post("/message", function (req, res) {
  var arrayOfMsgs = [];
  var file = req.body.file;
  console.log('file is of', typeof (file));
  var sentFrom = req.body.senderName;
  var sentTo = req.body.recieverName;
  message = req.body.RecievedMsg;
  sentAt = req.body.time;
  //console.log(sentFrom);
  //console.log(sentTo);
  var selectContact;

  //console.log("message sent");
  //console.log(req.body.RecievedMsg);
  //console.log("to be pushed inside reciever msg", req.body.recieverObj);
  //console.log("to be pushde inside sender msg", req.body.senderObj);
  if (sentTo === '' || sentTo == undefined) {
    selectContact = "select a contact";
    console.log(selectContact);
    res.json({
      selectContact
    })
  } else {
    var newMsg = new Msg({
      message: message,
      sentFrom: sentFrom,
      sentTo: sentTo,
      sentAt: sentAt,
    })
    console.log('newMsg', newMsg);
    newMsg.save(function (err, Msg) {
      console.log('1')
      if (err) throw err;
      else {
        db.collection('msgs').find({ $or: [{ sentFrom: sentFrom, sentTo: sentTo }, { sentFrom: sentTo, sentTo: sentFrom }] }).toArray(function (arr, result) {
          //console.log('res', result);
          //console.log('2')
          arrayOfMsgs = result;
          //console.log(x);
         
          res.json({
            arrayOfMsgs, message,sentTo
          })
        });
      }
      // console.log(Msg);
    });
    console.log('3')
  }

});

//getting msgs on click of radios
app.post("/getMsg", function (req, res) {
  var x = [];
  var freshArr = [];
  var lengthStoringArr = [];
  var length;
  var testArr;
  var lengthStoringArr;
  db.collection('msgs').find({ $or: [{ sentFrom: sentFrom, sentTo: sentTo }, { sentFrom: sentTo, sentTo: sentFrom }] }).toArray(function (arr, result) {
    length = result.length;
    testArr = [{ deletedBy: sentFrom, deletedOf: sentTo, lengthTobeshown: length }]
    //console.log(testArr, 'hi');
    db.collection('arrays').findOne({ name: 'wtf' }, function (findErr, result) {
      //console.log(result.val)
      lengthStoringArr = result.val;
     
      lengthStoringArr = result.val.reverse();
      console.log('this is wtf array',lengthStoringArr);
      var index = lengthStoringArr.findIndex(x => x.deletedBy === 'jonh');
      console.log(index, 'index is');
      res.json({
        x, flak,length, freshArr, lengthStoringArr
      })
    })

  })
  console.log("got it")
  console.log(req.body);
  var sentTo = req.body.sendThis;
  var sentFrom = req.body.loggedInUser;
  db.collection('msgs').find({ $or: [{ sentFrom: sentFrom, sentTo: sentTo }, { sentFrom: sentTo, sentTo: sentFrom }] }).toArray(function (arr, result) {
    console.log(result);
    x = result;
    
  });
});

app.post("/delete", function (req, res) {
  var freshArr = [];
  var lengthStoringArr = [];

  flak = req.body.flak;
  var sentTo = req.body.sendThis;
  var sentFrom = req.body.loggedInUser;
  var deletedBy = req.body.deletedBy;
  var deletedOf = req.body.deletedOf;
  console.log(deletedBy);
  console.log(deletedOf);
  var list = 'list';
  MongoClient.connect(url, function (err, client) {
    if (err) {
      console("error " + err);
    } else {
      console.log("connection established")
      var db = client.db('loginapp');
      db.collection('arrays').findOne({ name: 'deleted' }, function (findErr, result) {
        freshArr = result.val;
        console.log(freshArr);
        if (freshArr.indexOf(deletedOf) != 1) {
          console.log('didnt add as the name is already in db');
        } else {
          freshArr.push(deletedOf);
          console.log(freshArr);
          db.collection('arrays').update({ name: 'deleted' }, { $set: { val: freshArr } })
        }
      })
    }
  })
  db.collection('msgs').find({ $or: [{ sentFrom: sentFrom, sentTo: sentTo }, { sentFrom: sentTo, sentTo: sentFrom }] }).toArray(function (arr, result) {
    var length = result.length;
    var testArr = [{ deletedBy: sentFrom, deletedOf: sentTo, lengthTobeshown: length }]
    console.log(testArr, 'hi');
    db.collection('arrays').findOne({ name: 'wtf' }, function (findErr, result) {
      console.log(result.val)
      var lengthStoringArr = result.val;
      db.collection('arrays').update({ name: 'wtf' }, { $set: { val: result.val.concat(testArr) } })
      lengthStoringArr = result.val.concat(testArr).reverse();
      console.log(lengthStoringArr);
      var index = lengthStoringArr.findIndex(x => x.deletedBy === 'jonh');
      console.log(index, 'index is');
      res.json({
        length, freshArr, lengthStoringArr
      })
    })

  })
})
app.listen(5000, function () {
  console.log(`Listening on port 5000..`);
});

