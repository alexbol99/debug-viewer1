import * as ActionTypes from "../action-types";

const defaultMouseState = {
    x: 0,
    y: 0,
    startX: undefined,
    startY: undefined
};

const mouse = (state = defaultMouseState, action) => {
    switch (action.type) {
        case ActionTypes.MOUSE_MOVED_ON_STAGE:
            return Object.assign({}, state, {
                x: action.x,
                y: action.y
            });
        case ActionTypes.MOUSE_DOWN_ON_STAGE:
            return Object.assign({}, state, {
                startX: action.x,
                startY: action.y
            });
        case ActionTypes.MOUSE_UP_ON_STAGE:
            return Object.assign({}, state, {
                startX: undefined,
                startY: undefined
            });
        default:
            return state;
    }
};

export default mouse;