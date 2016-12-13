import React, { Component } from 'react';
import { connect } from 'react-redux';;
import classNames from 'classnames';
import { push } from 'react-router-redux';
import MenuItem  from './MenuItem';

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
                    <MenuItem to="/todos/" icon={'list'} key={0} name={'Schedule'} value={this.props.todoCount} isSelected={isTodoSelected} />
                    <MenuItem to="/my-clients/" icon={'man'}  key={1} name={'My clients'} isSelected={isMyClientsSelected} />
                </ul>
            </div>
        )
    }

}

