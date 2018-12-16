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

            case ActionTypes.PINCH_DOWN_ON_STAGE:
                stage.zoomByPinchStart(action.x1, action.y1);
                break;

            case ActionTypes.PINCH_MOVED_ON_STAGE:
                if (mouse.touchPoints) {
                    let dx = mouse.touchPoints[0].x - mouse.touchPoints[1].x;
                    let dy = mouse.touchPoints[0].y - mouse.touchPoints[1].y;
                    let distStart = Math.sqrt(dx*dx + dy*dy);

                    dx = action.x2 - action.x1;
                    dy = action.y2 - action.y1;
                    let distCurrent = Math.sqrt(dx*dx + dy*dy);
                    let ratio = distCurrent / distStart;
                    stage.zoomByPinchMove(action.x1, action.y1, ratio);
                }
                break;

            case ActionTypes.PINCH_UP_ON_STAGE:
                stage.zoomByPinchStop();
                break;

            default:
                break;
        }
    }

    next(action);
};

export default stageController;