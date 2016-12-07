import React, { Component } from 'react';
import { connect } from 'react-redux';
import { IndexLink, Link } from 'react-router';
import classNames from 'classnames';
import { push } from 'react-router-redux';

function mapStateToProps(state, ownProps) {
    return {
        todoCount : (state.todos || []).length
    }
}

@connect(mapStateToProps)
export default class SidePanel extends Component {

    componentWillUnmount () {
        window.removeEventListener('popstate', this.onWindowPopState);
    }

    componentDidMount () {

        this.onWindowPopState = this.onWindowPopState.bind(this);

        window.addEventListener('popstate', this.onWindowPopState);
    }

    onWindowPopState() {
        this.render();
    }

    render () {
        var pathname            = location.pathname,
            isTodoSelected      = /^\/todos\//.test(pathname),
            isMyClientsSelected = /^\/my-clients\//.test(pathname);


        // location.pathname
        return (
            <div className="side-panel">
                <div className="avatar">
                    <div className="avatar__photo">
                        <img className="avatar__photo-img" src="/static/images/avatar.png" />
                    </div>
                </div>
                <div className="tools">
                    <div className="tools-item round-button round-button_gear"></div>
                    <div className="tools-item round-button round-button_out"></div>
                </div>
                <ul className="menu">
                    <li>
                        <Link className={classNames({ 'menu-item' : true, 'menu-item_selected' : isTodoSelected })} to="/todos/">
                            <div className="menu-item__icon menu-item__icon_list"></div>
                            <div className="menu-item__caption">
                                Schedule
                            </div>
                            <div className="menu-item__value">
                                {this.props.todoCount}
                            </div>
                        </Link>
                    </li>
                    <li>
                        <Link  className={classNames({ 'menu-item' : true, 'menu-item_selected' : isMyClientsSelected })} to="/my-clients/">
                            <div className="menu-item__icon menu-item__icon_man"></div>
                            <div className="menu-item__caption">
                                My clients
                            </div>
                        </Link>
                    </li>
                </ul>
            </div>
        )
    }

}

