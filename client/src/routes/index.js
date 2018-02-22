import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Signup from '../signup';
import Signin from '../signin';
import Home from '../home';

class Routing extends React.Component {
    render() {
        return (
            <BrowserRouter>
                <div>
                    <Route path="/" exact component={Signup} />
                    <Route path="/signin" component={Signin} />
                    <Route path="/home" exact component={Home}/>
                </div>
            </BrowserRouter>
        )
    }
}
export default Routing;