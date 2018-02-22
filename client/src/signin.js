import React, { Component } from 'react';
import './App.css';

class Signin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            pw: '',
            status: false,
            credential: ''
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
        let self = this;


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
                console.log("from server"+res.updatedCred)
                this.setState({
                    status: res.changedStat,
                    credential:res.updatedCred,
                })

                if (res.changedStat === true) {
                    this.props.history.push('/home');
                }

            });

    }

    render() {
        return (
            <div className="container">
            <h5 className="App">{this.state.credential}</h5>
                <form method="post">
                    
                    <label htmlFor='name'>name</label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <input type='text' id='name' required onChange={this.nameHandle} /> <br /><br />
                    <label htmlFor='password'>password</label>&nbsp;&nbsp;
            <input type='text' id='password' onChange={this.pwHandle} /><br />
                    <input type="button" value="signin" className="button" onClick={this.signinHandle} />
                </form>

            </div>
        )
    }

}
export default Signin;