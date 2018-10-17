import * as ActionTypes from '../actions/action-types';
// import { parseXML } from "../models/parserXML";
// import { Layers } from '../models/layers';
// import { Model } from "../models/model";

// let {point, arc, segment, circle, Polygon} = Flatten;

const aabb_demo = ({ dispatch, getState }) => next => action => {

    if (action.type === ActionTypes.NEW_STAGE_CREATED || action.type === ActionTypes.WINDOW_HASH_CHANGED) {
        if (document.location.href.split('#')[1] === 'aabb_demo') {
            dispatch({
                type: ActionTypes.AABB_DEMO_URI
            })
        }
    }
    return next(action);
};


export default aabb_demo;
