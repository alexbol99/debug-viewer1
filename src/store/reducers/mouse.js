import * as ActionTypes from "../actionTypes";

const defaultMouseState = {
    x: 0,
    y: 0,
    x_2: undefined,
    y_2: undefined,
    startX: undefined,
    startY: undefined,
    startX_2: undefined,
    startY_2: undefined
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

        case ActionTypes.SECOND_TOUCH_DOWN_ON_STAGE: {
            return {
                ...state,
                startX_2: action.x,
                startY_2: action.y
            }
        }
        case ActionTypes.SECOND_TOUCH_MOVED_ON_STAGE: {
            return {
                ...state,
                x_2: action.x,
                y_2: action.y
            }
        }
        case ActionTypes.SECOND_TOUCH_UP_ON_STAGE: {
            return {
                ...state,
                x_2: undefined,
                y_2: undefined,
                startX_2: undefined,
                startY_2: undefined
            }
        }

        default:
            return state;
    }
};

export default mouse;