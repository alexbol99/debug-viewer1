import React from 'react';
import './index.css';

import App from './App';
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';

import reducer from './store/reducer';

import log from './middleware/log';
import readFiles from './middleware/readFiles';
import pasteData from './middleware/pasteData';
import stageController from './middleware/stageController';
// import aabb_demo from './middleware/aabb_demo';
// import collision_demo from './middleware/collision_demo';
import skeleton_recognition from './middleware/skeleton_recognition'

const store = createStore(reducer, applyMiddleware(
    log,
    readFiles,
    pasteData,
    /*aabb_demo,*/
    skeleton_recognition,
    stageController,
));

const Preloader = () => {
    return (
        <Provider store={store}>
            <App store={store}/>
        </Provider>
    );
};

export default Preloader;

