import React, { Component } from 'react';
import { connect } from 'react-redux';
import { IndexLink, Link } from 'react-router';


export default class App extends Component {

    render () {
        return (
            <div>
                {this.props.children}
            </div>
        );
    }

}

