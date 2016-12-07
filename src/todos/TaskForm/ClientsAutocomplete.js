import React, { Component } from 'react';
import { connect } from 'react-redux';
import { IndexLink, Link } from 'react-router';
import classNames from 'classnames';

const mapStateToProps = (state, ownProps) => {
    var value = ownProps.value,
        list    = [];
    if (value) {
        let testReg = new RegExp(value, 'i');
        list = state.clients.filter((item) => testReg.test(item));
    }
    return {
        list : list
    }
};

@connect(mapStateToProps)
export default class ClientsAutocomplete extends Component {

    state = {
        currentIndex : null
    };

    onDocumentKeyDown(event){
        var currentIndex = this.state.currentIndex,
            list         = this.props.list;
        switch (event.keyCode) {
            // Вверх.
            case 38:
                event.preventDefault();
                if (currentIndex == null) {
                    currentIndex = 0;
                } else {
                    currentIndex -= 1;
                    if (currentIndex < 0) {
                        currentIndex = 0;
                    }
                }
                this.setState({currentIndex : currentIndex});
                break;
            // Вниз.
            case 40:
                event.preventDefault();
                if (currentIndex == null) {
                    currentIndex = 0;
                } else {
                    currentIndex += 1;
                    if (currentIndex === list.length) {
                        currentIndex = list.length -1;
                    }
                }
                this.setState({currentIndex : currentIndex});
                break;
            // Ввод.
            case 13:
                event.preventDefault();
                if (list[currentIndex]) {
                    this.props.onNewValue(list[currentIndex]);
                }
                break;
            default :
                return;
        }
    }

    componentDidMount() {
        this.onDocumentKeyDown = this.onDocumentKeyDown.bind(this);
    }

    componentWillUnmount(){
        this.onDocumentKeyDown = null;
        this.unsubscribeDocumentKeyDown();
    }

    unsubscribeDocumentKeyDown() {
        document.removeEventListener('keydown', this.onDocumentKeyDown);
    }

    subscribeDocumentKeyDown() {
        document.addEventListener('keydown', this.onDocumentKeyDown);
    }

    componentWillReceiveProps (newProps) {
        if (newProps.list.sort().join('') !== this.props.list.sort().join('')) {
            this.setState({currentIndex : null});
        }
        if (newProps.isHidden && newProps.list.length) {
            this.setState({currentIndex : null});
            this.unsubscribeDocumentKeyDown();
        } else {
            this.subscribeDocumentKeyDown();
        }
    }

    onItemClick(text) {
        this.props.onNewValue(text);
    }

    onItemMouseMove(index) {
        this.setState({currentIndex : index});
    }

    render () {
        var nodes = this.props.list.map((item, index) =>
            <li className={classNames({
                autocomplete__item : true,
                active             : index === this.state.currentIndex
            })}
                onClick={this.onItemClick.bind(this, item)}
                onMouseMove={this.onItemMouseMove.bind(this, index)}>
                    {item}
            </li>
        );
        return (
            <ul className="autocomplete medium-input" style={this.props.isHidden || !nodes.length ? {display : 'none'} : {}}>
                {nodes}
            </ul>
        );
    }
}
