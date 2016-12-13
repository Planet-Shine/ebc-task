
import React, { Component } from 'react';
import classNames from 'classnames';
import { IndexLink, Link } from 'react-router'

export default class SidePanel extends Component {

    render () {
        return (
            <li>
                <Link className={classNames({ 'menu-item' : true, 'menu-item_selected' : this.props.isSelected })} to={this.props.to}>
                    <div className={'menu-item__icon menu-item__icon_' + this.props.icon}></div>
                    <div className="menu-item__caption">
                        {this.props.name}
                    </div>
                    {this.props.value !== undefined &&
                        <div className="menu-item__value">
                            {this.props.value}
                        </div>
                    }
                </Link>
            </li>
        );
    }

}
