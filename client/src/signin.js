import React, { Component } from 'react';
import './App.css';
//import Home from './home'
var user;


class Signin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            pw: '',
            status: false,
            credential: '',
            user: '',
            signUpResult: ''
        }

        this.nameHandle = this.nameHandle.bind(this);
        this.pwHandle = this.pwHandle.bind(this);
        this.signinHandle = this.signinHandle.bind(this);
    }
    nameHandle(e) {
        this.setState({
            name: e.target.value
        })

    }

    pwHandle(e) {
        this.setState({
            pw: e.target.value
        })
    }
    signinHandle(e) {

        console.log("hi")

        var data = {
            'name': this.state.name,
            'pw': this.state.pw,
            'status': this.state.status,
            'credential': this.state.credential
        }
        e.preventDefault();
        fetch('http://localhost:5000/signin',
            {
                method: 'POST',
                body: JSON.stringify({
                    data

                }),
                headers: { 'Content-Type': 'application/json' }
            })
            .then(res =>
                res.json()
            )
            .then((res) => {
                console.log("from server" + res.updatedCred)
                this.setState({
                    status: res.changedStat,
                    credential: res.updatedCred,
                    user: res.dbName
                })

                user = res.dbName;

                console.log("signin " + this.state.user);

                window.localStorage.setItem("lastname", user)
                if (res.changedStat === true) {
                    this.props.history.push({
                        pathname: '/home',
                        status: res.changedStat
                    });
                    console.log("signed in " + res.dbName);
                }

            });


    }

    render() {
        setTimeout(() => {
            this.setState({
                signUpResult: ''
            })
        }, 2000);

        return (
            <div>
                <h4 className='success'>{this.state.signUpResult}</h4>
                <h1 className="header">Signin</h1>
                <div className="container">
                    <h5 className="App">{this.state.credential}</h5>
                    <form method="post">


                        <input type='text' id='name' required onChange={this.nameHandle} placeholder="Username" className="InputField1" /> <br /><br />

                        <input type='password' id='password' onChange={this.pwHandle} className="InputField2" placeholder="Password" /><br />
                        <input type="button" value="signin" className="button" onClick={this.signinHandle} />
                    </form>
                    <a href="/" className="RegAnchor">Registration page</a>
                </div>

            </div>
        )
    }
    componentWillMount() {
        this.setState({
            status: window.localStorage.getItem('status')
        })
        console.log('hola ' + this.state.status);
        if (this.state.status == 'true') {
            console.log('successful')
            this.setState({
                signUpResult: 'successful'
            })
        } else {
            this.setState({
                signUpResult: ''
            })
        }
    }

}





//export default styles;

export default Signin;
