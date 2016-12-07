import React, { Component } from 'react';
import { connect } from 'react-redux';
import { IndexLink, Link } from 'react-router';
import {
    SidePanel
} from '../';


export default class MainLayout extends Component {

    render () {
        return (
            <div className="main-container">
                <SidePanel />
                {this.props.children}
            </div>
        )
    }

}

