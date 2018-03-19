import React, { Component } from 'react';
import './App.css';
import { error } from 'util';
import ReactDOM from 'react-dom';
var Scroll = require('react-scroll');
var scroll = Scroll.animateScroll;


var i;


class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            contact: '',
            localArr: [],
            contactStat: '',
            contactMsg: '',
            cantAddOwn: '',
            reciever: '',
            message: '',
            selectContact: '',
            messageArray: [],
            deletedOf: '',
            freshArr: [],
            lengthOfDeletion: '',
            flak: '',
            file: null,
            afterDeletionData: []


        }


        this.handleContacts = this.handleContacts.bind(this);
        this.logoutOps = this.logoutOps.bind(this);
        this.firedEvent = this.firedEvent.bind(this);
        this.sendClick = this.sendClick.bind(this);
        this.radioSelected = this.radioSelected.bind(this);
        this.handleMsg = this.handleMsg.bind(this);
        this.deleteChat = this.deleteChat.bind(this);
        this.handleFileChange = this.handleFileChange.bind(this);
       // this.handleFile = this.handleFile.bind(this);
        this.scrollTest = this.scrollTest.bind(this);
    }


    handleContacts(e) {
        this.setState({
            contact: e.target.value.toLowerCase()
        })
    }
    handleMsg(e) {
        this.setState({
            message: e.target.value
        });

    }
    handleFileChange(){
        this.setState({
            file:this.state.file,
        })
        console.log(this.state.file);
    }


   
    logoutOps() {
        console.log(window.localStorage.getItem("lastname"));
        localStorage.removeItem("lastname");
        localStorage.removeItem("lengthis");
        this.setState({
            localArr: []
        }, function () {
            console.log(window.localStorage.getItem("lastname"));
            console.log("local arr after logout", this.state.localArr);

            this.props.history.push('/signin');
        });



    }
    firedEvent() {


        var arr = [];


        console.log("local array", this.state.localArr);
        console.log("contact is", this.state.contact);
        //e.preventDefault();
        var data = {
            "contact": this.state.contact,
            "user": window.localStorage.getItem("lastname"),
        }
        if (this.state.contact === "") {

        } else {
            arr.push(this.state.contact);
            console.log();
        }
        console.log("state of local arr", this.state.localArr)
        fetch('http://localhost:5000/home',
            {
                method: 'POST',
                body: JSON.stringify({
                    data, arr
                }),
                headers: { 'Content-Type': 'application/json' }
            })
            .then(res =>
                res.json()
            )
            .then((res) => {
                this.setState({
                    localArr: res.renderedArr,
                    contactStat: res.contactStatus,
                    contactMsg: res.contactMsg,
                    cantAddOwn: res.cantAddOwn,
                    contact: ''
                })

                console.log("message ie u cant add yourself", res.cantAddOwn);
                console.log("contact status", res.contactStatus);
                console.log("contactMsg", res.contactMsg);
                console.log("res.renderedArr ", this.state.localArr);
                console.log("from server array", res.arr);
            });

    }
    sendClick(e) {


        console.log('file is', this.state.file);
        var file = this.state.file;
        console.log(this.state.flak)
        var recieverName = this.state.reciever;
        if (e.which === 13 || e.which == undefined) {

            var recieverName = this.state.reciever;
            var senderName = window.localStorage.getItem("lastname");
            var RecievedMsg = this.state.message;
            console.log("message is ", this.state.message);
            console.log("reciever", recieverName);
            console.log("sender", senderName);
            //console.log(JSON.stringify({ senderName: this.state.message }));
            //time 
            var D = new Date();
            var hours = D.getHours().toString();
            var minutes = D.getMinutes().toString();
            var seconds = D.getSeconds().toString();
            console.log(hours, minutes, seconds)
            var time = hours + ":" + minutes + ":" + seconds;
            console.log('time is', time);
            console.log("msg", RecievedMsg)
            if (RecievedMsg === '') {
                console.log("empty cant be sent")

            } else {

                fetch('http://localhost:5000/message',
                    {
                        method: 'POST',
                        body: JSON.stringify({
                            RecievedMsg, recieverName, senderName, time, file
                        }),
                        headers: { 'Content-Type': 'application/json' }
                    })
                    .then(res =>
                        res.json()
                    )
                    .then((res) => {
                        this.setState({
                            selectContact: res.selectContact,
                            messageArray: res.arrayOfMsgs,
                            message: ''
                        })
                        if (this.state.flak == false && res.sentTo != undefined) {

                            var newArrayIs = [];
                            for (i = window.localStorage.getItem('lengthis'); i < this.state.messageArray.length; i++) {
                                newArrayIs = newArrayIs.concat(this.state.messageArray[i])

                            }
                            this.setState({
                                messageArray: newArrayIs
                            })

                            console.log('new arr', newArrayIs, ' length to be shown', window.localStorage.getItem('lengthis'));

                        }
                        console.log('from sever', res.message);
                        console.log('from db', res.arrayOfMsgs);
                        console.log(this.state.message);


                    })

            }
        }

        //scroll.scrollToBottom();
    }

    radioSelected(e) {
        var sendThis = e.target.value;
        var loggedInUser = window.localStorage.getItem("lastname");
        fetch('http://localhost:5000/getMsg',
            {
                method: 'POST',

                headers: { 'Content-Type': 'application/json' }
            })
            .then(res =>
                res.json()
            )
            .then((res) => {
                this.setState({

                    afterDeletionData: res.lengthStoringArr,


                })
                console.log('the real mvp ', this.state.afterDeletionData)
                var index = res.lengthStoringArr.findIndex(x => x.deletedOf === sendThis && x.deletedBy === loggedInUser);
                console.log(index, 'index is');

                if (index != -1) {
                    console.log('freaking length', res.lengthStoringArr[index].lengthTobeshown);
                    console.log(window.localStorage.setItem('lengthis', res.lengthStoringArr[index].lengthTobeshown))
                } else {
                    window.localStorage.setItem('lengthis', 0);
                }
            });



        console.log(this.state.flak);


        console.log('index is', index);
        if (this.state.afterDeletionData == undefined) {

        } else {
            var index = this.state.afterDeletionData.findIndex(x => x.deletedOf === sendThis);
            console.log('final length', this.state.afterDeletionData[index]);
        }
        if (sendThis === undefined) {

        } else {
            this.setState({
                reciever: sendThis,
                selectContact: '',
                contactMsg: '',
                cantAddOwn: '',
                contactStat: ''
            })
        }

        //console.log(window.localStorage.getItem('deletedBy'));
        //console.log(window.localStorage.getItem('deletedOf'));
        console.log(sendThis);

        if (this.state.freshArr.indexOf(sendThis) != -1) {
            this.setState({
                messageArray: []
            })
        } else {

            fetch('http://localhost:5000/getMsg',
                {
                    method: 'POST',
                    body: JSON.stringify({
                        sendThis, loggedInUser
                    }),
                    headers: { 'Content-Type': 'application/json' }
                })
                .then(res =>
                    res.json()
                )
                .then((res) => {
                    this.setState({
                        messageArray: res.x
                    })
                    console.log("get message array is", res.x)
                    if (this.state.flak == false) {

                        var newArrayIs = [];
                        for (i = window.localStorage.getItem('lengthis'); i < this.state.messageArray.length; i++) {
                            newArrayIs = newArrayIs.concat(this.state.messageArray[i])

                        }
                        console.log('new arr is', newArrayIs);
                        this.setState({
                            messageArray: newArrayIs
                        })

                    }
                    console.log('ok testing', res.x)
                })
        }
    }
    deleteChat() {
        console.log("clicked");
        var sendThis = this.state.reciever;
        var loggedInUser = window.localStorage.getItem("lastname");
        var deletedBy = window.localStorage.getItem("lastname");
        var deletedOf = this.state.reciever;
        this.setState({
            flak: false
        })
        fetch('http://localhost:5000/delete',
            {
                method: 'POST',
                body: JSON.stringify({
                    deletedBy, deletedOf, sendThis, loggedInUser,
                }),
                headers: { 'Content-Type': 'application/json' }
            })
            .then(res =>
                res.json()
            )
            .then((res) => {
                this.setState({
                    freshArr: res.freshArr,
                    messageArray: [],
                    afterDeletionData: res.lengthStoringArr,

                })
                var lengthis = res.length
                //console.log(res.testArr,'this is a test array');
                console.log(res.lengthStoringArr, 'this is a test array');


                console.log('afterDeletionData', this.state.afterDeletionData)
                window.localStorage.setItem('lengthis', lengthis)
                console.log('lenght from server', res.length);
                console.log('length in local storage', window.localStorage.getItem('lengthis'));

                console.log('retrieved array is', this.state.freshArr);

                //window.localStorage.setItem("deletedBy", deletedBy);
                //window.localStorage.setItem("deletedOf", deletedOf);
                //console.log('ok testin in deleteclick', this.state.messageArray);
                //console.log(window.localStorage.getItem('deletedBy'));
                //console.log(window.localStorage.getItem('deletedOf'));
            })
    }
    scrollTest() {
        var scrollName = ReactDOM.findDOMNode(this.refs.cpDev1).value;
        console.log(scrollName);

    }

    render() {
        return (
            <div>
                <div>
                    <h5 className="HomeContainer">welcome <b>{window.localStorage.getItem("lastname")}</b></h5>
                    <div className="Contacts">
                        <span className="ContactTitle">Contacts</span>
                        <form action="/home" >
                            <input type="text" placeholder="add contacts" className="InputField3" onChange={this.handleContacts} required value={this.state.contact} />
                            <i onClick={this.firedEvent} className=" material-icons AddButton" >library_add</i>
                        </form>
                        <span>{this.state.contactStat}{this.state.contactMsg}{this.state.cantAddOwn}{this.state.selectContact}</span>
                        <br /><br /><br />
                        <ul onClick={this.radioSelected}>
                            {this.state.localArr === undefined ? console.log() : this.state.localArr.map(function (name, index) {
                                return (
                                    <div>
                                        <input type="radio" name="kal" value={name} key={name.id} />{name}&nbsp;<span></span>
                                    </div>
                                );
                            })
                            }
                        </ul>
                    </div>
                    <div className="chatContainer">
                        <div className="chatbox" >
                            {this.state.messageArray == undefined || this.state.messageArray == [] ? console.log() : this.state.messageArray.map(function (msgs, i) {
                                console.log(msgs);
                                if (msgs.sentFrom === localStorage.getItem("lastname")) {
                                    return (
                                        <span class="chatlogs">
                                            <span class="chat self">
                                                <span class="user-photo">{msgs.sentFrom}</span>
                                                <span class="chat-message">{msgs.message}</span>
                                                <span class="sender-chat-time">{msgs.sentAt}</span>
                                                <i className="material-icons adjust-tick">done</i>
                                            </span>
                                        </span>
                                    );
                                } else {
                                    return (
                                        <span class="chat friend">
                                            <span class="user-photo">{msgs.sentFrom}</span>
                                            <span class="chat-message">{msgs.message}</span>
                                            <span class="reciever-chat-time" >{msgs.sentAt}</span>

                                        </span>
                                    );
                                }
                            })}</div>
                        <div className="Newmsg">
                            <input type="text" className="EnterMsgField" placeholder="enter" value={this.state.message} onChange={this.handleMsg} onKeyPress={this.sendClick} />

                            <input type="file" className="fileUpload" onChange={this.handleFileChange}  />
                            <div>{console.log(this.state.file)}></div>
                            &nbsp; &nbsp; &nbsp;<br /><i className="material-icons sendButton" onClick={this.sendClick} >send</i>
                        </div>
                    </div>

                    <i class="material-icons logoutButton" onClick={this.logoutOps} >power_settings_new</i>
                    <div><input type="button" className="logoutButton" ref="cpDev1" value="delete" onClick={this.deleteChat} /></div>
                    <input type="button" className="logoutButton" value="scroll" onClick={this.scrollTest} />
                </div>

            </div>
        );
    }

    componentWillMount() {
        this.firedEvent();

        console.log("component will mount is here")
    }
}
export default Home;
