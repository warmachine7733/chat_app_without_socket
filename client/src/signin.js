import React, { Component } from 'react';
import './App.css';
//import Home from './home'
let user;


class Signin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            pw: '',
            status: false,
            credential: '',
            user:''
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
                
            
                console.log("signed in " + user);

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
        return (
            <div>
                <h1 className="header">Signin</h1>
            <div className="container">
                <h5 className="App">{this.state.credential}</h5>
                <form method="post">

                  
            <input type='text' id='name' required onChange={this.nameHandle} placeholder="Username" className="InputField1"/> <br /><br />
                    
            <input type='password' id='password' onChange={this.pwHandle} className="InputField2" placeholder="Password"/><br />
                    <input type="button" value="signin" className="button" onClick={this.signinHandle} />
                </form>
             <a href="/" className="RegAnchor">Registration page</a>
            </div>
            </div>
        )
    }

  
}

export const assets = {
    user,
}


//export default styles;

export default Signin;
