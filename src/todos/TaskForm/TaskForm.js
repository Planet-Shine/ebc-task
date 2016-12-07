import React, { Component } from 'react';
import { connect } from 'react-redux';
import { IndexLink, Link } from 'react-router';
import ClientsAutocomplete from './ClientsAutocomplete';
import classNames from 'classnames';
import { push } from 'react-router-redux';
import _ from 'underscore';


const mapStateToProps = (state, ownParams) => {
    var currentTaskId = state.currentTask,
        todos         = state.todos,
        currentTask   = _.findWhere(todos, {
            id : currentTaskId
        });

    return {
        date     : state.currentDate,
        taskItem : currentTask
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        onSubmit(task) {
            dispatch({
                type : 'SET_TASK',
                task : task
            });
        },
        onBackToLists(date) {
            date = [date].map((date) => `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`)[0];
            dispatch(push(`/todos/date/${date}`));
        },
        pushCurrentTaskId(id) {
            dispatch({
                type : 'SET_CURRENT_TASK_ID',
                id   : id
            });
        },
        setTaskEditInProgress : function (isTaskEditInProgress) {
            dispatch({
                type  : 'SET_IS_TASK_EDIT_IN_PROGRESS',
                value : isTaskEditInProgress
            });
        }
    }
};

@connect(mapStateToProps, mapDispatchToProps)
export default class TaskForm extends Component {

    autocompleteTimeout = 500;
    hideParticipantAutocompleteTimeout = null;
    requiredErrorClass = 'control_error-required';

    state = {
        participantClass : '',
        descriptionClass : '',
        participant      : '',
        description      : ''
    };

    componentDidMount () {
        var params = this.props.params,
            id;
        if (params) {
            id = params.id;
            id = parseInt(id, 10);
            if (!isNaN(id)) {
                this.props.pushCurrentTaskId(id);
                this.componentWillReceiveProps(this.props);
            }
        }
        this.props.setTaskEditInProgress(true);
        this.setState({date : this.props.date});
    }

    componentWillReceiveProps (nextProps) {
        var taskItem = nextProps.taskItem;
        if (nextProps.taskItem) {
            this.setState({
                id          : taskItem.id,
                description : taskItem.description,
                participant : taskItem.participant
            });
        }
    }

    handleParticipantChange(e) {
        this.setState({participant: e.target.value});
        this.hideParticipantNotValid();
    }

    handleDescriptionChange(e) {
        this.setState({description: e.target.value});
        this.hideDescriptionNotValid();
    }

    participantAutocompleteNewValue(value) {
        this.setState({participant: value});
    }


    isValid() {
        return (this.state.participant && this.state.description);
    }

    showParticipantAutocomplete() {
        clearTimeout(this.hideParticipantAutocompleteTimeout);
        this.setState({isParticipantAutocompleteHidden : false});
    }

    hideParticipantAutocomplete() {
        this.hideParticipantAutocompleteTimeout = setTimeout(() => {
            this.setState({isParticipantAutocompleteHidden : true});
        }, this.autocompleteTimeout);
    }

    hideParticipantNotValid() {
        this.setState({participantClass: ''});
    }

    showParticipantNotValid() {
        if (!this.state.participant) {
            this.setState({participantClass : this.requiredErrorClass});
        }
    }

    hideDescriptionNotValid() {
        this.setState({descriptionClass : ''});
    }

    showDescriptionNotValid() {
        if (!this.state.description) {
            this.setState({descriptionClass : this.requiredErrorClass});
        }
    }

    showNotValid() {
        this.showDescriptionNotValid();
        this.showParticipantNotValid();
    }

    onSubmit(e) {
        e.preventDefault();
        if (this.isValid()) {
            let state = this.state;
            this.props.onSubmit({
                'id'          : state.id,
                'participant' : state.participant ,
                'description' : state.description,
                'date'        : [this.state.date].map((dateItem) => {
                    return `${dateItem.getFullYear()}-${dateItem.getMonth()+1}-${dateItem.getDate()}`;
                })[0]
            });
            // Переход на текущий день.
            this.goBack();
        } else {
            this.showNotValid();
        }
    }

    onCancel() {
        // Переход на текущий день.
        this.goBack();
    }

    goBack() {
        this.props.setTaskEditInProgress(false);
        this.props.onBackToLists(this.props.date);
    }

    render () {
        var date = this.state.date;
        if (!date) {
            return (<div></div>);
        }
        return (
            <div>
                <div className="todos__header">
                    <h2 className="todos__header-caption">
                        {this.state.id ? 'New' : 'Edit'} meeting on {[
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
                    <div className="tool-button tool-button_close todos__header-button" onClick={this.onCancel.bind(this)}></div>
                </div>
                <form onSubmit={this.onSubmit.bind(this)}>

                    <div className={
                            classNames('control', this.state.participantClass)
                        }>
                        <label htmlFor="name-input" className="control__label">
                            Participant
                        </label>
                        <input id="name-input"
                               className="control__text control__text-input medium-input"
                               type="text"
                               placeholder="Name"
                               onFocus={this.showParticipantAutocomplete.bind(this)}
                               onBlur={this.hideParticipantAutocomplete.bind(this)}
                               onChange={this.handleParticipantChange.bind(this)}
                               value={this.state.participant} />
                        <ClientsAutocomplete
                            isHidden={this.state.isParticipantAutocompleteHidden}
                            onNewValue={this.participantAutocompleteNewValue.bind(this)}
                            value={this.state.participant} />
                        <div className="error-required">
                            Participant is required
                        </div>
                    </div>
                    <div className={
                            classNames('control', this.state.descriptionClass)
                        }>
                        <label htmlFor="description-textarea" className="control__label">
                            Description
                        </label>
                        <textarea
                            id="description-textarea"
                            value={this.state.description}
                            onChange={this.handleDescriptionChange.bind(this)}
                            placeholder="Meeting description"
                            className="control__text control__textarea">
                        </textarea>
                        <div className="error-required">
                            Description is required
                        </div>
                    </div>
                    <div className="form-buttons">
                        <button type="submit"
                                className="theme-button theme-button_form-actions">
                            SAVE
                        </button>
                        <button type="button"
                                className="theme-button theme-button_negative theme-button_form-actions"
                                onClick={this.onCancel.bind(this)}>
                            CANCEL
                        </button>
                    </div>
                </form>
            </div>
        )
    }

}

