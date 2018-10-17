import React from 'react';
import './index.css';

import App from './App';
import { createStore, applyMiddleware, compose } from 'redux';
import {reducer} from './reducer';

// import about from './middleware/about';
import log from './middleware/log';
import readFiles from './middleware/readFiles';
import pasteData from './middleware/pasteData';
import stageController from './middleware/stageController';
import demo from './middleware/demo';
import aabb_demo from './middleware/aabb_demo';
// import collision_demo from './middleware/collision_demo';
// import boolean_test from './middleware/boolean_test';
// import skeleton_recognition from './middleware/skeleton_recognition'

// import matrix_test from './middleware/matrix-test';
// import webgl_test from './middleware/webgl-test';

const store = createStore(reducer, compose(applyMiddleware(
    log,
    readFiles,
    pasteData,
    demo,
    aabb_demo,
    /*boolean_test,*/
    /*skeleton_recognition,*/
    stageController,
)));

const Preloader = () => {
    return (
        <App store={store} />
    );
};

export default Preloader;

