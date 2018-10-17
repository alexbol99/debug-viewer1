import React from 'react';
import './index.css';

import App from './App';
import { createStore, applyMiddleware, compose } from 'redux';
import {reducer} from './reducer';

import log from './middleware/log';
import readFiles from './middleware/readFiles';
import pasteData from './middleware/pasteData';
import stageController from './middleware/stageController';
// import aabb_demo from './middleware/aabb_demo';
// import collision_demo from './middleware/collision_demo';
// import skeleton_recognition from './middleware/skeleton_recognition'

const store = createStore(reducer, compose(applyMiddleware(
    log,
    readFiles,
    pasteData,
    /*aabb_demo,*/
    /*skeleton_recognition,*/
    stageController,
)));

const Preloader = () => {
    return (
        <App store={store} />
    );
};

export default Preloader;

