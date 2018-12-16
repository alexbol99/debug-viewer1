import * as ActionTypes from "../actionTypes";

const defaultMouseState = {
    x: 0,
    y: 0,
    startX: undefined,
    startY: undefined,
    touchPoints: undefined
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

        case ActionTypes.PINCH_DOWN_ON_STAGE: {
            return {
                ...state,
                touchPoints: [
                    {x: action.x1, y: action.y1},
                    {x: action.x2, y: action.y2}
                ]
            }
        }
        // case ActionTypes.PINCH_MOVED_ON_STAGE: {
        //     return {
        //         ...state,
        //         touchPoints: [
        //             {x: action.x1, y: action.y1},
        //             {x: action.x2, y: action.y2}
        //         ]
        //     }
        // }
        case ActionTypes.PINCH_UP_ON_STAGE: {
            return {
                ...state,
                touchPoints: undefined
            }
        }

        default:
            return state;
    }
};

export default mouse;