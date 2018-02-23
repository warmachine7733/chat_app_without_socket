import React, { Component } from 'react';
//import { withRouter } from 'react-router'


class Home extends Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }
    handleClick() {
    console.log(this.props);
    }
    render() {
        return (
            <div>
                homepage
            welcome
            
                <input type="button" onClick={this.handleClick} value="props" />
            </div>
        );
    }
}
export default Home;