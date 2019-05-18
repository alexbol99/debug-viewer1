import * as ActionTypes from "../actionTypes";
import {Parser} from "../../dataParsers/parser";

const unitsList = [
    {
        name: "pixels",
        decimals: 0,
        divisor: 1
    },
    {
        name: "inch",
        decimals: 7,
        divisor: 10160000
    },
    {
        name: "mm",
        decimals: 6,
        divisor: 400000
    }];

const defaultAppState = {
    title: "Debug Viewer",
    version: process.env.REACT_APP_VERSION,
    build: "",
    units: "pixels",
    decimals: 0,
    divisor: 1,
    // bg: "#F1F1F1",
    parser: new Parser(),
    widthOn: true,
    displayVertices: false,
    displayLabels: true,
    measurePointsActive: false,
    zoomFactor: undefined,
    originX: undefined,
    originY: undefined,
    showAboutPopup: false,
    importDataToNewLayer: true,       // if false, import data to affected layer
    showSkeletonRecognitionButton: false,
    applySkeletonRecognition: false,
    stage: null,
    showSpinner: false,
    showLayerList: false,
    showDownloadPopup: false,
    showUploadPopup: false,
};

const app = (state = defaultAppState, action) => {
    switch (action.type) {
        case ActionTypes.NEW_STAGE_CREATED:
            return Object.assign({}, state, {
                stage: action.stage,
                zoomFactor: action.stage.zoomFactor * action.stage.resolution,
                originX: action.stage.origin.x,
                originY: action.stage.origin.y,
            });

        case ActionTypes.STAGE_UNMOUNTED:
            return Object.assign({}, state, {
                stage: null,
                zoomFactor: undefined,
                originX: undefined,
                originY: undefined
            });

        case ActionTypes.MOUSE_WHEEL_MOVE_ON_STAGE:
        case ActionTypes.PAN_AND_ZOOM_TO_SHAPE:
        case ActionTypes.PINCH_MOVED_ON_STAGE:
            return Object.assign({}, state, {
                zoomFactor: action.stage.zoomFactor * action.stage.resolution,
                originX: action.stage.origin.x,
                originY: action.stage.origin.y,
            });
        case ActionTypes.MOUSE_MOVED_ON_STAGE:
            return Object.assign({}, state, {
                originX: action.stage.origin.x,
                originY: action.stage.origin.y
            });
        case ActionTypes.TOGGLE_UNITS_CLICKED:
            let curUnitsId = unitsList.findIndex(units => state.units === units.name);
            let newUnits = unitsList[(curUnitsId + 1) % 3];
            return Object.assign({}, state, {
                units: newUnits.name,
                decimals: newUnits.decimals,
                divisor: newUnits.divisor
            });
        case ActionTypes.TOGGLE_WIDTH_MODE_CLICKED:
            return Object.assign({}, state, {
                widthOn: !state.widthOn,
                displayVertices: state.widthOn ? state.displayVertices : false
            });
        case ActionTypes.TOGGLE_DISPLAY_VERTICES_CLICKED:
            if (state.displayVertices) {
                return Object.assign({}, state, {
                    displayVertices: false
                });
            }
            else {
                return Object.assign({}, state, {
                    widthOn: false,
                    displayVertices: true
                });
            }

        case ActionTypes.TOGGLE_DISPLAY_LABELS_CLICKED:
            return Object.assign({}, state, {
                displayLabels: !state.displayLabels
            });

        case ActionTypes.TOGGLE_ABOUT_POPUP_CLICKED:
            return Object.assign({}, state, {
                showAboutPopup: !state.showAboutPopup
            });

        // case ActionTypes.CLOSE_ABOUT_POPUP_BUTTON_PRESSED:
        //     return Object.assign({}, state, {
        //         showAboutPopup: false
        //     });

        case ActionTypes.PAN_BY_DRAG_BUTTON_CLICKED:
            return Object.assign({}, state, {
                measurePointsActive: false
            });

        case ActionTypes.MEASURE_POINTS_BUTTON_PRESSED:
            return Object.assign({}, state, {
                measurePointsActive: true
            });
        case ActionTypes.MEASURE_SHAPES_BUTTON_PRESSED:
            return Object.assign({}, state, {
                measurePointsActive: false
            });
        case ActionTypes.SKELETON_RECOGNITION_URI:
            return Object.assign({}, state, {
                showSkeletonRecognitionButton: true
            });
        case ActionTypes.SKELETON_RECOGNITION_BUTTON_PRESSED:
            return Object.assign({}, state, {
                applySkeletonRecognition: true
            });
        case ActionTypes.ASYNC_OPERATION_STARTED:
            return Object.assign({}, state, {
                showSpinner: true
            });
        case ActionTypes.ASYNC_OPERATION_ENDED:
            return Object.assign({}, state, {
                showSpinner: false
            });
        case ActionTypes.AABB_TREE_NEXT_LEVEL:
            return state;
        case ActionTypes.TOGGLE_SHOW_LAYER_LIST_CLICKED:
            return {
                ...state,
                showLayerList: !state.showLayerList
            };
        case ActionTypes.TOGGLE_DOWNLOAD_POPUP_CLICKED:
            return {
                ...state,
                showDownloadPopup: !state.showDownloadPopup
            };
        case ActionTypes.TOGGLE_UPLOAD_POPUP_CLICKED:
            return {
                ...state,
                showUploadPopup: !state.showUploadPopup
            }
        default:
            return state;
    }
};

export default app;
