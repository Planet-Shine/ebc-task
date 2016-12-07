import React, { Component } from 'react';
import { connect } from 'react-redux';
import { IndexLink, Link } from 'react-router';
import TodoItem from './TodoItem';
import _ from 'underscore';

const mapStateToProps = (state) => {
    var todos      = state.todos,
        date       = state.currentDate,
        list       = [],
        stringDate;

    if (date) {
        stringDate = [date].map((date) => `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`)[0]
        list = todos.filter((item) => {
            return item.date === stringDate;
        });
    }

    return {
        date : state.currentDate,
        list : list
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onNewDate(newDate) {
            dispatch({
                type : 'SET_DATE',
                date : newDate
            });
        }
    }
};


@connect(mapStateToProps, mapDispatchToProps)
class TodoList extends Component {

    parseDateAndSetToStore(date) {
        date = date.split('-').map(function (item) {
            return parseInt(item);
        });
        if (date.length === 3 && date.every((item) => !isNaN(item))) {
            date = new Date(date[0], date[1] - 1, date[2]);
        } else {
            date = null;
        }
        this.props.onNewDate(date);
    }

    /*
        componentWillReceiveProps (nextProps) {
            this.parseDateAndSetToStore(nextProps.params.date);
        }
    */

    componentDidMount () {
        var date = this.props.params.date;
        if (date) {
            this.parseDateAndSetToStore(date);
        }
    }

    render () {
        var date  = this.props.date,
            nodes = this.props.list.map((item) => {
                return (
                    <TodoItem key={item.id} item={item} />
                );
            });

        if (!nodes.length) {
            nodes = (
                <span className="todos__hint">Nothing planned</span>
            );
        }


        return (
            <div>
                <div className="todos__header">
                    <h2 className="todos__header-caption">
                        {[
                            "January",
                            "February",
                            "March",
                            "April",
                            "May",
                            "June",
                            "July",
                            "August",
                            "September",
                            "October",
                            "November",
                            "December"
                        ][date.getMonth()]} {date.getDate()}
                    </h2>
                    <Link className="todos__header-button theme-button" to="/todos/create-task">
                        CREATE
                    </Link>
                </div>
                {nodes}
            </div>
        )
    }
}

export default TodoList;

