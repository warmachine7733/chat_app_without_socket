import React, { Component } from 'react';
//import { withRouter } from 'react-router'
import './App.css';

//var x = new Array();
var names = [];

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            contact: '',
            localArr: [],
            contactStat:'',
            contactMsg:'',
            cantAddOwn:''

        }
        this.handleContacts = this.handleContacts.bind(this);
        this.logoutOps = this.logoutOps.bind(this);
        this.firedEvent = this.firedEvent.bind(this);
        this.sendClick = this.sendClick.bind(this);
        this.radioSelected = this.radioSelected.bind(this);
    }
    handleContacts(e) {
        this.setState({
            contact: e.target.value.toLowerCase()
        })
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
        console.log("contact is",this.state.contact);
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
                    contactStat:res.contactStatus,
                    contactMsg:res.contactMsg,
                    cantAddOwn:res.cantAddOwn
                })

                console.log("w",res.cantAddOwn);
                console.log("contact status",res.contactStatus);
                console.log("contactMsg",res.contactMsg);
                console.log("res.renderedArr ", this.state.localArr);
                console.log("from server array", res.arr);
            });
    }
    sendClick() {
        console.log("value", document.getElementsByName("kal").value)

    }
    radioSelected(e) {
        var sendThis = e.target.value
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
                        <span>{this.state.contactStat}{this.state.contactMsg}{this.state.cantAddOwn}</span>
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
                    <div className="Chathead">
                        Chathead
                    </div>
                    <div className="Newmsg">
                        <input type="text" className="EnterMsgField" placeholder="enter" />
                        <i className="material-icons sendButton" >send</i>
                        
                    </div>

                    
                    <i class="material-icons logoutButton" onClick={this.logoutOps} >power_settings_new</i>
                </div>
               
            </div>
        );
    }
    componentWillMount() {
        this.firedEvent()
        console.log("component will mount is here")
    }
}
export default Home;
