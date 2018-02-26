import React, { Component } from 'react';
//import { withRouter } from 'react-router'
import './App.css';
var arr = new Array();
var x = new Array();
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
        localStorage.removeItem("lastname")
        console.log(window.localStorage.getItem("lastname"));
        this.props.history.push('/signin');
        localStorage.removeItem("array");
        console.log(window.localStorage.getItem("array"));
    }
    firedEvent() {

        //e.preventDefault();
        var data = {
            "contact": this.state.contact,
            "user": window.localStorage.getItem("lastname"),
            

        }
        if(this.state.contact===""){

        }else{
        arr.push(this.state.contact);
        console.log(arr);
        }
        //window.localStorage.setItem("array", arr);
        console.log("state of contact", this.state.contact);
        //console.log(window.localStorage.getItem("array"));
        //console.log("local storage", arr)
        fetch('http://localhost:5000/home',
            {
                method: 'POST',
                body: JSON.stringify({
                    data,arr

                }),
                headers: { 'Content-Type': 'application/json' }
            })
            .then(res =>
                res.json()
            )
            .then((res) => {
                x = res.arr;
                this.setState({
                    localArr: res.arr
                })
                console.log(this.state.localArr);
                console.log("from server", res.x);
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
                            {this.state.localArr.map(function (name, index) {
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
