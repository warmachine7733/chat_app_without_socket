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
            localArr: []

        }
        this.handleContacts = this.handleContacts.bind(this);
        this.logoutOps = this.logoutOps.bind(this);
        this.firedEvent = this.firedEvent.bind(this);
    }
    handleContacts(e) {
        this.setState({
            contact: e.target.value
        })
    }
    logoutOps() {
        console.log(window.localStorage.getItem("lastname"));
        localStorage.removeItem("lastname");
        this.setState({
            localArr: []
        }, function() {
            console.log(window.localStorage.getItem("lastname"));
            console.log("local arr after logout",this.state.localArr);
    
            this.props.history.push('/signin');
        });
        
       
       
    }
    firedEvent() {
        var arr =[];

        console.log("local array",this.state.localArr);
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
        //window.localStorage.setItem("array", storedNames);
        //console.log("state of contact", this.state.contact);
        //console.log(window.localStorage.getItem("array"));
        //console.log("local storage", arr)

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
                    localArr: res.renderedArr
                })
                console.log("res.renderedArr ", this.state.localArr);
                console.log("from server", res.arr);
            });
    }
    render() {
        return (
            <div>
                <div>
                    <h5 className="HomeContainer">welcome <b>{window.localStorage.getItem("lastname")}</b></h5>
                    <div className="Contacts">
                        Contacts
                    <form action="/home" method="post">
                            <input type="text" placeholder="add contacts" className="InputField3" onChange={this.handleContacts} required />
                            <input type="button" value="add" onClick={this.firedEvent} />
                        </form>
                        <ul>
                            
                            {this.state.localArr==undefined?console.log():this.state.localArr.map(function (name, index) {
                                return <li key={index}>{name}</li>;

                            })
                            }
                        </ul>

                    </div>
                    <div className="Chathead">
                        Chathead
                    </div>
                    <div className="Newmsg">
                        <input type="text" className="HomeContainer" />
                    </div>
                    <input type="button" className="logoutButton" onClick={this.logoutOps} value="logout" />
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
