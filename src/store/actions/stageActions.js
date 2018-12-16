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

export const handlePinchDown = (stage, touchPoints) => {
    return {
        type: ActionTypes.PINCH_DOWN_ON_STAGE,
        stage: stage,
        x1: touchPoints[0].x,
        y1: touchPoints[0].y,
        x2: touchPoints[1].x,
        y2: touchPoints[1].y
    }
};

export const handlePinchMove = (stage, touchPoints) => {
    return {
        type: ActionTypes.PINCH_MOVED_ON_STAGE,
        stage: stage,
        x1: touchPoints[0].x,
        y1: touchPoints[0].y,
        x2: touchPoints[1].x,
        y2: touchPoints[1].y
    }
};

export const handlePinchUp = (stage) => {
    return {
        type: ActionTypes.PINCH_UP_ON_STAGE,
        stage
    }
};

