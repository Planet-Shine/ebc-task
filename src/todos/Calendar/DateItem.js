import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import classNames from 'classnames';


const mapStateToProps = (state, ownProps) => {
    var date          = ownProps.date,
        currentDate   = state.currentDate,
        todos         = state.todos,
        isCurrentDate = false,
        isHereTodo    = false,
        isToday       = false,
        nowDate;

    if (date && currentDate) {
        [date, currentDate, nowDate] = [date, currentDate, new Date()].map((item) => {
            var year      = item.getFullYear(),
                month     = item.getMonth() + 1,
                monthDate = item.getDate();
            return `${year}-${month}-${monthDate}`;
        });
        if (date === currentDate) {
            isCurrentDate = true;
        }
        if (todos.some((todo) => todo.date === date)) {
            isHereTodo = true;
        }
        if (date === nowDate) {
            isToday = true;
        }
    }

    return {
        isToday              : isToday,
        isCurrentDate        : isCurrentDate,
        isHereTodo           : isHereTodo,
        isChangeUrlAvailable : !state.isTaskEditInProgress
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        onSetDate(date) {
            dispatch({
                type : 'SET_DATE',
                date : date
            });
        },
        onChangeLocation(link) {
            dispatch(push(link));
        }
    }
};

@connect(mapStateToProps, mapDispatchToProps)
class DateItem extends Component {

    getLink() {
        var [date] = [this.props.date].map((item) => `${item.getFullYear()}-${item.getMonth()+1}-${item.getDate()}`);
        return `/todos/date/${date}`;
    }

    onClick() {
        var link;
        if (!this.props.isOtherMonth) {
            if (this.props.isChangeUrlAvailable) {
                this.props.onChangeLocation(this.getLink());
            }
            this.props.onSetDate(this.props.date);
        }
    }

    render () {
        return (
            <div className={classNames({
                    'calendar__dates-item'             : true,
                    'calendar__dates-item_selected'    : this.props.isCurrentDate,
                    'calendar__dates-item_today'       : this.props.isToday,
                    'calendar__dates-item_todo'        : this.props.isHereTodo,
                    'calendar__dates-item_other-month' : this.props.isOtherMonth
                })}  onClick={this.onClick.bind(this)}>
                <div className="calendar__dates-item-circle">
                    {this.props.date.getDate()}
                    <div className="calendar__dates-item-indicator"></div>
                </div>
            </div>
        );
    }

}

export default DateItem;

