import React, { Component } from 'react';
//import { withRouter } from 'react-router'
import './App.css';

//var x = new Array();
var names = [];
//var xyz;
//var array2 = [];
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
            sentMsg: [],
            rcvMsg: [],

        }


        this.handleContacts = this.handleContacts.bind(this);
        this.logoutOps = this.logoutOps.bind(this);
        this.firedEvent = this.firedEvent.bind(this);
        this.sendClick = this.sendClick.bind(this);
        this.radioSelected = this.radioSelected.bind(this);
        this.handleMsg = this.handleMsg.bind(this);
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

    logoutOps() {
        console.log(window.localStorage.getItem("lastname"));
        localStorage.removeItem("lastname");
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
                    cantAddOwn: res.cantAddOwn
                })

                console.log("message ie u cant add yourself", res.cantAddOwn);
                console.log("contact status", res.contactStatus);
                console.log("contactMsg", res.contactMsg);
                console.log("res.renderedArr ", this.state.localArr);
                console.log("from server array", res.arr);
            });
    }
    sendClick() {

        var array3 = [];
        var array4 = [];
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
        var time = hours + minutes + seconds;
        console.log('time is', time);
        console.log("msg", RecievedMsg)



        fetch('http://localhost:5000/message',
            {
                method: 'POST',
                body: JSON.stringify({
                    RecievedMsg, recieverName, senderName, time
                }),
                headers: { 'Content-Type': 'application/json' }
            })
            .then(res =>
                res.json()
            )
            .then((res) => {
                this.setState({
                    selectContact: res.selectContact,
                    messageArray: res.x
                })
                console.log('from sever', res.message);
                console.log('from db', res.x);
               if(this.state.messageArray==undefined){

               }else{
                for (i = 0; i < this.state.messageArray.length; i++) {
                    var descriptor1 = Object.getOwnPropertyDescriptor(this.state.messageArray[i], 'sentFrom');

                    if (descriptor1.value == localStorage.getItem('lastname')) {
                        var descriptor2 = Object.getOwnPropertyDescriptor(this.state.messageArray[i], 'message');
                        console.log('msg sent from logi', localStorage.getItem('lastname'), ' ', descriptor2.value);
                        array3.push(descriptor2.value);
                        this.setState({
                            sentMsg: array3
                        })
                        console.log(this.state.sentMsg);
                    }
                    var descriptor3 = Object.getOwnPropertyDescriptor(this.state.messageArray[i], 'sentFrom')
                    if (descriptor3.value == this.state.reciever) {
                        var descriptor4 = Object.getOwnPropertyDescriptor(this.state.messageArray[i], 'message')
                        console.log('msg sent from', this.state.reciever, '  ', descriptor4.value);
                        array4.push(descriptor4.value);
                        this.setState({
                            rcvMsg: array4
                        })
                    }
                }
                console.log(this.state.sentMsg);
                console.log(this.state.rcvMsg);
            }
            })


        
    }
    radioSelected(e) {
        var sendThis = e.target.value;
        if (sendThis === undefined) {

        } else {
            this.setState({
                reciever: sendThis,
                selectContact: ''

            })
        }
          
        console.log(this.state.Reciever);
        console.log("send and verify", sendThis);

    }
    render() {
        return (

            <div>
                <div>
                    <h5 className="HomeContainer">welcome <b>{window.localStorage.getItem("lastname")}</b></h5>
                    <div className="Contacts">
                        <span className="ContactTitle">Contacts</span>
                        <form action="/home" >
                            <input type="text" placeholder="add contacts" className="InputField3" onChange={this.handleContacts} required />
                            <input type="button" value="add" onClick={this.firedEvent} className="AddButton" />
                        </form>
                        <span>{this.state.contactStat}{this.state.contactMsg}{this.state.cantAddOwn}{this.state.selectContact}</span>
                        <br /><br /><br />

                        <ul onClick={this.radioSelected}>
                            {this.state.localArr === undefined ? console.log() : this.state.localArr.map(function (name, index) {
                                return (
                                    <div>
                                        <input type="radio" name="kal" value={name} key={name} />{name}&nbsp;<span></span>
                                    </div>
                                );
                            })
                            }

                        </ul>
                    </div>

                <i class="material-icons logoutButton" onClick={this.logoutOps} >power_settings_new</i>
 
                    <div className="Chathead">

                    </div>


                    <div className="Newmsg">
                        <input type="text" className="EnterMsgField" placeholder="enter" onChange={this.handleMsg} />
                        <i className="material-icons sendButton" onClick={this.sendClick} >send</i>
                    </div>

                    <span className="sentMsg">{this.state.sentMsg.map(function (msg, index) {
                        return (
                            <div>
                                <span>{msg}</span>
                            </div>
                        );
                    })}</span>
                    <span className="rcvMsg">{this.state.rcvMsg.map(function (msgs, index) {
                        return (
                            <div>
                                <span>{msgs}</span>
                            </div>
                        );
                    })}</span>

                    
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
