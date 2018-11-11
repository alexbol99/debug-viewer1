/**
 * Created by alexanderbol on 13/04/2017.
 */

import {combineReducers} from 'redux';

import app from "./reducers/app";
import layers from "./reducers/layers";
import mouse from "./reducers/mouse";
import measureShapesTool from "./reducers/measureShapesTool";
import documents from "./reducers/documents";

const reducer = combineReducers({
    app,
    layers,
    documents,
    measureShapesTool,
    mouse
});

export default reducer;
