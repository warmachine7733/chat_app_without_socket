var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var router = express.Router();
var app = new express();

var mongo = require('mongodb');
var mongoose = require('mongoose');


mongoose.connect('mongodb://localhost/loginapp');
var db = mongoose.connection;

//requiring from model
var User = require('./model/index');
// User Schema
/*var UserSchema = mongoose.Schema({
  name: {
    type: String,
    index: true
  },
  password: {
    type: String
  },
  email: {
    type: String
  },

});
var User = mongoose.model('Users', UserSchema);*/


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
      password: password
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
            changedStat,dbName
          });
          console.log("after res " + changedStat+" "+dbName)

        } else {
          console.log('notmatched')
          updatedCred="wrong credentials"
          res.json({
            updatedCred
          });
        }
        client.close();

      });


    }
  });


});
app.listen(5000, function () {
  console.log(`Listening on port 5000...`);
});

