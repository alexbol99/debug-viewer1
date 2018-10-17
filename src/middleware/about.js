import * as ActionTypes from "../actions/action-types";
import manifest from '../../build/asset-manifest';

const about = ({ dispatch, getState }) => next => action => {

    if (action.type !== ActionTypes.NEW_STAGE_CREATED) {
        return next(action);
    }

    let str = manifest;
    let state = getState();
    let a = str["main.css"].split('/')[2];
    let build = a.split('.')[1];
    state.app.build = build;
    
    next(action);
};


export default about;