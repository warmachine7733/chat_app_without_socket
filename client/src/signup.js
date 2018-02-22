import React, { Component } from 'react';
import './App.css';
import { Link } from 'react-router-dom';

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
    this.handleSignin = this.handleSignin.bind(this);

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
        })
        console.log("nameMsg" + res.nameMsg);
        console.log("from server", res.updateStatus);
        if (res.updateStatus === true) {
          console.log("jk")
          this.props.history.push('/signin')
        }


      });

  }
  handleSignin(e) {
    this.setState({
      updateStatus: true
    })
    if (true) {
      this.props.history.push('/signup');
    }
  }


render() {
    return (
      
      <div >
      <h1 className="header">Register</h1>
        <div className='container'>
          
          <form action='/signup' method='post'>
            <label htmlFor='name'>Name</label>&nbsp;&nbsp;&nbsp;&nbsp;
          <input type='text' id='name' className="TextField" onChange={this.handleChangeName} value={this.state.name} /> <nobr>{this.state.nameAlert}</nobr><br /><br />
            <label htmlFor='email'>Email</label>&nbsp;&nbsp;&nbsp;&nbsp;
          <input type='text' id='email' onChange={this.handleChangeEmail} value={this.state.email} /> <nobr>{this.state.emAlert}</nobr><br /><br />
            <label htmlFor='pw'>Password</label>
            <input type='password' id='pw' onChange={this.handleChangePw} value={this.state.pw} /> <nobr>{this.state.pwAlert}</nobr><br /><br />
            <input type="button" value="signup" onClick={this.handleSubmit} className="button" />
            <a className="Anchor" href="/signin">go to signin page</a>
          </form>
          
        </div>
      </div >
    );

  }

}



export default Signup;
