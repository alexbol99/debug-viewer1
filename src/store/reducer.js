/**
 * Created by alexanderbol on 13/04/2017.
 */

import {combineReducers} from 'redux';

import app from "./reducers/app";
import layers from "./reducers/layers";
import mouse from "./reducers/mouse";
import measureShapesTool from "./reducers/measureShapesTool";
import aabbDemoTool from "./reducers/aabbDemoTool";

const reducer = combineReducers({
    app,
    layers,
    measureShapesTool,
    aabbDemoTool,
    mouse
});

export default reducer;
