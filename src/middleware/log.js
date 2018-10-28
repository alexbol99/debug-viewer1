import * as ActionTypes from '../store/action-types';

const log = ({ getState, dispatch }) => next => action => {

    if(action.type !== ActionTypes.MOUSE_MOVED_ON_STAGE) {
        console.log('ACTION: ' + action.type, action);
    }

    next(action);
};

export default log;