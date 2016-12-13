
import React, { Component } from 'react';

export default class ClientItem extends Component{

    render() {
        return (
            <li className="alphabetical-list__item">
                {this.props.name}
            </li>
        )
    }

}

