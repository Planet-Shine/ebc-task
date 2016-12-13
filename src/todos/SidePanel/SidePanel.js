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

    state = {
        list : [
            {
                id    : 0,
                to    : '/todos/',
                icon  : 'list',
                name  : 'Schedule'
            },
            {
                id   : 1,
                to   : '/my-clients/',
                icon : 'man',
                name : 'My clients'
            }
        ]
    };

    setCountOfTodos(props) {
        var item   = this.state.list.find(item => item.name === 'Schedule');
        item.value = props.todoCount;
        this.setState({
            'list' : this.state.list
        });
    }

    componentWillReceiveProps (newProps) {
        this.setCountOfTodos(newProps);
    }

    componentWillUnmount () {
        window.removeEventListener('popstate', this.onWindowPopState);
    }

    componentDidMount () {
        this.setCountOfTodos(this.props);
        this.onWindowPopState = this.onWindowPopState.bind(this);
        window.addEventListener('popstate', this.onWindowPopState);
    }

    onWindowPopState() {
        this.render();
    }

    render () {
        var pathname = location.pathname,
            nodes    = this.state.list.map(item => {
                var testUrlRegExp = new RegExp("^" + item.to);
                return <MenuItem to={item.to}
                                 name={item.name}
                                 icon={item.icon}
                                 key={item.id}
                                 isSelected={testUrlRegExp.test(pathname)}
                                 value={item.value} />
            });

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
                    {nodes}
                </ul>
            </div>
        )
    }

}

