import React, { Component } from 'react';
import './App.css';
import { Link } from 'react-router-dom';

import Signup from './signup'

class App extends Component {
  render() {
    return (
      <Link to="/">HomePage</Link>
    )
  }
}



export default App;
