import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

const mapStateToProps = (state) => {
    var todos = state.todos,
        date  = state.currentDate,
        stringDate = [date].map((date) => `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`)[0],
        list;

    list = todos.filter((item) => {
        return item.date === stringDate;
    });

    return {
        date : state.currentDate,
        list : list
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onDelete(id) {
            dispatch({
                type : 'DELETE_TASK',
                id   : id
            });
        }
    }
};

@connect(mapStateToProps, mapDispatchToProps)
class TodoItem extends Component {

    onDelete() {
        this.props.onDelete(this.props.item.id);
    }

    render () {
        var item     = this.props.item,
            editLink = `/todos/edit-task/${item.id}`;
        return (
            <div className="todos__item">
                <div className="todos__item-info">
                    <div className="todos__item-tools">
                        <Link className="tool-button tool-button_pen" to={editLink}></Link>
                        <div className="tool-button tool-button_bin" onClick={this.onDelete.bind(this)}></div>
                    </div>
                    <div className="todos__item-description">{item.description}</div>
                    <div className="todos__item-participant">{item.participant}</div>
                </div>
            </div>
        )
    }
}

export default TodoItem;

