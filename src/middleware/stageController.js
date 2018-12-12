import * as ActionTypes from '../store/actionTypes';

const stageController = ({getState, dispatch}) => next => action => {

    const mouse = getState().mouse;
    let stage = action.stage;


    if (stage) {
        switch (action.type) {
            case ActionTypes.STAGE_RESIZED:
                stage.resize();
                break;

            case ActionTypes.MOUSE_DOWN_ON_STAGE:
                stage.panByMouseStart();
                break;

            case ActionTypes.MOUSE_MOVED_ON_STAGE:
                if (action.dx !== undefined && action.dy !== undefined) {
                    stage.panByMouseMove(action.dx, action.dy);
                }
                break;

            case ActionTypes.MOUSE_UP_ON_STAGE:
                stage.panByMouseStop();
                break;

            case ActionTypes.PAN_AND_ZOOM_TO_SHAPE:
                let center = action.shape.center;
                let box = action.shape.box;
                if (isNaN(center.x) || isNaN(center.y)) return;
                stage.panToCoordinate(center.x, center.y);
                stage.zoomToLimits(box.xmax - box.xmin, box.ymax - box.ymin);
                break;

            case ActionTypes.MOUSE_WHEEL_MOVE_ON_STAGE:
                let bIn = action.delta > 0;
                // stage.zoomByMouse(action.x, action.y, bIn, 1 + Math.abs(action.delta)/100.);
                stage.zoomByMouse(action.x, action.y, bIn, 1.2);
                break;

            case ActionTypes.CLEAR_ALL:
                stage.removeAllChildren();
                stage.removeAllListeners();
                break;

            case ActionTypes.SECOND_TOUCH_DOWN_ON_STAGE:
                stage.zoomByPinchStart(action.x, action.y);
                break;

            case ActionTypes.SECOND_TOUCH_MOVED_ON_STAGE:
                if (mouse.startX && mouse.startY && mouse.startX_2 && mouse.startY_2) {
                    let dx = mouse.startX_2 - mouse.startX;
                    let dy = mouse.startY_2 - mouse.startY;
                    const distStart = Math.sqrt(dx*dx + dy*dy);
                    dx = action.x - mouse.x;
                    dy = action.y - mouse.y;
                    const distCurrent = Math.sqrt(dx*dx + dy*dy);
                    const ratio = distCurrent / distStart;
                    stage.zoomByPinchMove(action.x, action.y, ratio);
                }
                break;

            case ActionTypes.SECOND_TOUCH_UP_ON_STAGE:
                stage.zoomByPinchStop();
                break;

            default:
                break;
        }
    }

    next(action);
};

export default stageController;