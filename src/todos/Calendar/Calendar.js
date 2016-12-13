import React, { Component, PropTypes } from 'react';
import { connect, dispatch } from 'react-redux';
import DateItem from './DateItem';
import { IndexLink, Link } from 'react-router';
import { push } from 'react-router-redux';

const mapStateToProps = (state) => {
    return {
        month : state.currentMonth,
        date  : state.currentDate
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        onPreviousMonthHandle() {
            dispatch({
                type : 'PREVIOUS_MONTH'
            });
        },
        onNextMonthHandle() {
            dispatch({
                type : 'NEXT_MONTH'
            });
        },
        onComponentMountDate(date) {
            dispatch(push(`/todos/date/${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`))
        }
    }
};

@connect(mapStateToProps, mapDispatchToProps)
export default class Calendar extends Component {

    weekCount  = 6;
    dateOfWeek = 7;

    componentDidMount () {
        if (!/^\/?todos\/date\/[\s\S]+$/.test(window.location.pathname)) {
            this.props.onComponentMountDate(this.props.date);
        }
    }

    getMonthDates (monthDate) {
        var month     = monthDate.getMonth(),
            year      = monthDate.getFullYear(),
            firstDate = new Date(year, month, 1, 1, 0, 0),
            day       = firstDate.getDay(),
            dates     = [],
            currentDate;

        if (day === 0) {
            day = 7;
        }
        firstDate = new Date(year, month, -day + 2, 1);
        currentDate = firstDate;
        for (let i = 0; i < this.weekCount * this.dateOfWeek; i += 1) {
            dates.push(new Date(currentDate.getTime()));
            currentDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() + 1, 1);
        }
        return dates;
    }

    handlePreviousMonth() {
        this.props.onPreviousMonthHandle();
    }

    handleNextMonth() {
        this.props.onNextMonthHandle();
    }

    render () {
        var month = this.props.month,
            nodes = [],
            dates,
            monthNumber,
            year;

        if (month) {
            monthNumber = month.getMonth();
            year = month.getFullYear();
            dates = this.getMonthDates(month);
            nodes = dates.map(function (date, index) {
                var isOtherMonth = date.getMonth() !== month.getMonth();
                return (
                    <DateItem key={index} date={date} isOtherMonth={isOtherMonth} />
                );
            });
        }

        return (
            <div className="medium-col">
                <div className="calendar">

                    <div className="calendar__slider">
                        <div className="calendar__slider-previous" onClick={this.handlePreviousMonth.bind(this)}></div>
                        <div className="calendar__month-name">
                            {["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"][monthNumber]} {year}
                        </div>
                        <div className="calendar__slider-next" onClick={this.handleNextMonth.bind(this)}></div>
                    </div>

                    <ul className="calendar__header">
                        <li className="calendar__header-item">MON</li>
                        <li className="calendar__header-item">TUE</li>
                        <li className="calendar__header-item">WED</li>
                        <li className="calendar__header-item">THU</li>
                        <li className="calendar__header-item">FRI</li>
                        <li className="calendar__header-item">SAT</li>
                        <li className="calendar__header-item">SUN</li>
                    </ul>
                    <div className="calendar__header-separator"></div>
                    <div className="calendar__dates">
                        {nodes}
                    </div>
                </div>
            </div>
        );
    }

}

