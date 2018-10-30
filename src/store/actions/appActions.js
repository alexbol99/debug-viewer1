import * as ActionTypes from '../actionTypes';

/* not in use ?*/
export const resizeStage = () => {
    return {
        type: ActionTypes.STAGE_RESIZED
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
        files: files,
        stage: stage,
        layers: layers
    }
};

export const setHomeView = (stage, shape) => {
    return {
        type: ActionTypes.PAN_AND_ZOOM_TO_SHAPE,
        stage: stage,
        shape: shape
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
        shape: shape
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
        shape: shape,
        layer: layer
    }
};
