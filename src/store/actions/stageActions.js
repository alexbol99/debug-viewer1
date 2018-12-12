import * as ActionTypes from '../actionTypes';

export const registerStage = (stage) => {
    return {
        type: ActionTypes.NEW_STAGE_CREATED,
        stage: stage
    }
};

export const handleMouseDown = (stage, x, y) => {
    return {
        type: ActionTypes.MOUSE_DOWN_ON_STAGE,
        stage: stage,
        x: x,
        y: y
    }
};

export const handleMouseUp = (stage, x, y) => {
    return {
        type: ActionTypes.MOUSE_UP_ON_STAGE,
        stage: stage,
        x: x,
        y: y
    }
};

export const handleMouseMove = (stage, x, y, dx, dy) => {
    return {
        type: ActionTypes.MOUSE_MOVED_ON_STAGE,
        stage: stage,
        x: x,
        y: y,
        dx: dx,
        dy: dy
    }
};

export const handleMouseWheelMove = (stage, x, y, delta) => {
    return {
        type: ActionTypes.MOUSE_WHEEL_MOVE_ON_STAGE,
        stage: stage,
        x: x,
        y: y,
        delta: delta
    }
};

export const handleSecondTouchDown = (stage, x, y) => {
    return {
        type: ActionTypes.SECOND_TOUCH_DOWN_ON_STAGE,
        stage: stage,
        x,
        y
    }
};

export const handleSecondTouchMove = (stage, x, y) => {
    return {
        type: ActionTypes.SECOND_TOUCH_MOVED_ON_STAGE,
        stage: stage,
        x,
        y
    }
};

export const handleSecondTouchUp = (stage) => {
    return {
        type: ActionTypes.SECOND_TOUCH_UP_ON_STAGE,
        stage
    }
};

