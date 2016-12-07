import React, { Component } from 'react';
import { connect } from 'react-redux';
import { IndexLink, Link } from 'react-router';


export default class NotFound extends Component {

    render () {
        return (
            <div className="todos">
                <div className="todos__hint">
                    Not found
                </div>
            </div>
        )
    }

}
