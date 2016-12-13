import React, { Component, PropTypes } from 'react';
import ClientItem from './ClientItem';
import { connect } from 'react-redux';

const mapStateToProps = (state) => {
    return {
        clients : state.clients
    }
};

@connect(
    mapStateToProps
)
export default class MyClients extends Component {

    static propTypes = {
        clients: PropTypes.array
    };

    render() {
        var clients = this.props.clients,
            nodes = [],
            currentLetter;
        clients = clients.sort();
        clients.forEach(function (client, index) {
            if (currentLetter !== client[0]) {
                currentLetter = client[0];
                nodes.push(<h3 key={ 'h' + index } className="letter-header">{currentLetter}</h3>);
            }
            nodes.push(<ClientItem key={index} name={client} />);
        });

        return (
            <div className="my-clients">
                <h2>My clients</h2>
                <ul className="alphabetical-list">
                    {nodes}
                </ul>
            </div>
        )
    }
}
