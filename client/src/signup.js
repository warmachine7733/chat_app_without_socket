import React, { Component } from 'react';
import './App.css';
//import { Link } from 'react-router-dom';

class Signup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      pw: '',
      name: '',
      status: false,
      fnAlert: '',
      lnAlert: '',
      emAlert: '',
      pwAlert: '',


    };

    this.handleChangeName = this.handleChangeName.bind(this);
    this.handleChangeEmail = this.handleChangeEmail.bind(this);
    this.handleChangePw = this.handleChangePw.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    //this.handleSignin = this.handleSignin.bind(this);

  }

  handleChangeName(e) {
    this.setState({
      name: e.target.value
    })
  }
  handleChangeEmail(e) {
    this.setState({
      email: e.target.value,
    });
  }
  handleChangePw(e) {
    this.setState({
      pw: e.target.value
    });
  }
  handleSubmit(e) {
    let self = this;
    var data = {
      'name': this.state.name,
      'email': this.state.email,
      'pw': this.state.pw,
      'status': this.state.status,
    }
    e.preventDefault();
    fetch('http://localhost:5000/',
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
        console.log(res)
        self.setState({
          nameAlert: res.nameMsg,
          emAlert: res.emMsg,
          pwAlert: res.pwMsg,
          status: res.updateStatus
        });
        console.log(res.emMsg);
        console.log(this.state.nameAlert);
        console.log("nameMsg" + res.nameMsg);
        console.log("from server", res.updateStatus);
        window.localStorage.setItem("status", res.updateStatus)
        if (res.updateStatus === true) {
          this.props.history.push('/signin')
        }
      });
  }
 /* handleSignin(e) {
   this.setState({
      updateStatus: true
    })
    if (true) {
      this.props.history.push('/signup');
    }
  }*/
  changeStatus(){
    window.localStorage.setItem("status",false);
  }


  render() {
    return (

      <div >
        <h1 className="header">Register</h1>
        <div className='container'>

          <form action='/signup' method='post'>

            <input type='text' id='name' className="InputField1" onChange={this.handleChangeName} placeholder="Userame" value={this.state.name} /> <nobr className="Alert">{this.state.nameAlert}</nobr><br /><br />

            <input type='text' id='email' className="InputField1" onChange={this.handleChangeEmail} placeholder="Email" value={this.state.email} /> <nobr className="Alert">{this.state.emAlert}</nobr><br /><br />

            <input type='password' id='pw' className="InputField1" onChange={this.handleChangePw} placeholder="password" value={this.state.pw} /> <nobr className="Alert">{this.state.pwAlert}</nobr><br /><br />
            <input type="button" value="signup" onClick={this.handleSubmit} className="button" />
            <a className="Anchor" onClick={this.changeStatus.bind(this)} href="/signin">Signin now</a>
          </form>

        </div>
      </div >
    );

  }

}



export default Signup;
