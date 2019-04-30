import * as ActionTypes from '../actionTypes';

export const resizeStage = () => {
    return {
        type: ActionTypes.STAGE_RESIZED
    }
};

export const destroyStage = () => {
    return {
        type: ActionTypes.STAGE_UNMOUNTED
    }
};

export const toggleUnits = () => {
    return {
        type: ActionTypes.TOGGLE_UNITS_CLICKED
    }
};

export const toggleWidthMode = () => {
    return {
        type: ActionTypes.TOGGLE_WIDTH_MODE_CLICKED
    }
};

export const toggleDisplayVertices = () => {
    return {
        type: ActionTypes.TOGGLE_DISPLAY_VERTICES_CLICKED
    }
};

export const toggleDisplayLabels = () => {
    return {
        type: ActionTypes.TOGGLE_DISPLAY_LABELS_CLICKED
    }
};

export const toggleAboutPopup = () => {
    return {
        type: ActionTypes.TOGGLE_ABOUT_POPUP_CLICKED
    }
};

// export const closeAboutPopup = () => {
//     return {
//         type: ActionTypes.CLOSE_ABOUT_POPUP_BUTTON_PRESSED
//     }
// };

export const toggleMeasureBetweenPoints = () => {
    return {
        type: ActionTypes.MEASURE_POINTS_BUTTON_PRESSED
    }
};

export const toggleMeasureBetweenShapes = () => {
    return {
        type: ActionTypes.MEASURE_SHAPES_BUTTON_PRESSED
    }
};

export const applySkeletonRecognition = () => {
    return {
        type: ActionTypes.SKELETON_RECOGNITION_BUTTON_PRESSED
    }
};

export const handleFileSelect = (files, stage, layers) => {
    return {
        type: ActionTypes.FILENAME_LIST_SELECTED,
        files,
        stage,
        layers
    }
};

export const setHomeView = (stage, shape) => {
    return {
        type: ActionTypes.PAN_AND_ZOOM_TO_SHAPE,
        stage,
        shape
    }
};

export const togglePanByDrag = () => {
    return {
        type: ActionTypes.PAN_BY_DRAG_BUTTON_CLICKED
    }
};

export const handleMouseRollOverShape = (shape) => {
    return {
        type: ActionTypes.MOUSE_ROLL_OVER_SHAPE,
        shape
    }
};

export const handleMouseRollOutShape = () => {
    return {
        type: ActionTypes.MOUSE_ROLL_OUT_SHAPE
    }
};

export const handleClickOnShape = (shape, layer) => {
    return {
        type: ActionTypes.MOUSE_CLICKED_ON_SHAPE,
        shape,
        layer
    }
};

export const asyncOperationStarted = () => {
    return {
        type: ActionTypes.ASYNC_OPERATION_STARTED
    }
};

export const asyncOperationEnded = () => {
    return {
        type: ActionTypes.ASYNC_OPERATION_ENDED
    }
};

export const openDocumentOnCloud = () => {
    return {
        type: ActionTypes.MANAGE_CLOUD_STORAGE_BUTTON_CLICKED
    }
};

export const toggleLayerList = () => {
    return {
        type: ActionTypes.TOGGLE_SHOW_LAYER_LIST_CLICKED
    }
};

export const toggleDownloadPopup = () => {
    return {
        type: ActionTypes.TOGGLE_DOWNLOAD_POPUP_CLICKED
    }
};


