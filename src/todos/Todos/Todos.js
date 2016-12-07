import React, { Component } from 'react';
import { connect } from 'react-redux';
import { IndexLink, Link } from 'react-router';
import {
    Calendar
} from '../'


export default class Todos extends Component {

    render () {
        return (
            <div className="workspace">
                <Calendar />
                <div className="rest-col">
                    <div className="todos">
                        {this.props.children}
                    </div>
                </div>
            </div>
        )
    }

}
