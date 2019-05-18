/**
 * Created by alexanderbol on 13/04/2017.
 */

import {combineReducers} from 'redux';

import auth from "./reducers/auth";
import app from "./reducers/app";
import layers from "./reducers/layers";
import mouse from "./reducers/mouse";
import measureShapesTool from "./reducers/measureShapesTool";
import cloudStorage from "./reducers/cloudStorage";
import upload from "./reducers/upload";

const reducer = combineReducers({
    auth,
    app,
    layers,
    upload,
    cloudStorage,
    measureShapesTool,
    mouse
});

export default reducer;
