import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import * as serviceWorker from './serviceWorker';
import asyncComponent from "./components/HighOrderComponents/asyncComponent";

const AsyncPreloader = asyncComponent( () => {
    return import("./Preloader");
});

import("@createjs/easeljs")
    .then( (resp) => {
        window.createjs = resp.createjs;
        ReactDOM.render(
            <AsyncPreloader />,
            document.getElementById('root')
        );
    });

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
