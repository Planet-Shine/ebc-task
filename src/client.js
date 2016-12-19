require('./styl/styles.less');

import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import { createStore, applyMiddleware, compose } from 'redux';
import reducers from './reducers/reducer'
import preloadedState from './localstorage/preloadedState'

import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';
import { routerMiddleware } from 'react-router-redux';

import getRoutes from './routes';

require('./store/initialize');


import { syncHistoryWithStore } from 'react-router-redux';
import useScroll from 'scroll-behavior/lib/useStandardScroll';

const _browserHistory = useScroll(() => browserHistory)();
const reduxRouterMiddleware = routerMiddleware(_browserHistory);

const middleware = [reduxRouterMiddleware];
const finalCreateStore = applyMiddleware(...middleware)(createStore);

const store = finalCreateStore(reducers, preloadedState);
const history = syncHistoryWithStore(_browserHistory, store);


// const store = createStore(reducers, preloadedState);

// todoLocalStorage.getAll();

const component = (
    <Router history={history}>
        {getRoutes(store)}
    </Router>
);

$(document).ready(function () {
    const dest = document.getElementById('root');

    ReactDOM.render(
        <Provider store={store} key="provider">
            {component}
        </Provider>,
        dest
    );
});