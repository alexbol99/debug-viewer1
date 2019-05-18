import React from 'react';
import ReactDOM from 'react-dom';
import {createStore, applyMiddleware, compose} from 'redux';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import {BrowserRouter} from 'react-router-dom';

import * as serviceWorker from './serviceWorker';

import reducer from './store/reducer';
import log from './middleware/log';
// import readFiles from './middleware/readFiles';
import pasteData from './middleware/pasteData';
import stageController from './middleware/stageController';
import skeleton_recognition from './middleware/skeleton_recognition';
import App from "./App";

import './index.css';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(reducer,
    composeEnhancers(
        applyMiddleware(log, pasteData, skeleton_recognition, stageController, thunk)
    )
);

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter basename={process.env.PUBLIC_URL}>
            <App/>
        </BrowserRouter>
    </Provider>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
