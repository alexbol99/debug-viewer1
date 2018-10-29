import * as ActionTypes from '../actionTypes';

export const addEmptyLayer = (stage) => {
    return {
        type: ActionTypes.ADD_LAYER_BUTTON_PRESSED,
        stage: stage
    }
};

export const addNewLayer = (layer) => {
    return {
        type: ActionTypes.ADD_NEW_LAYER,
        stage: layer
    }
};

export const deleteAffectedLayer = () => {
    return {
        type: ActionTypes.DELETE_LAYER_BUTTON_PRESSED
    };
};

export const sortLayers = () => {
    return {
        type: ActionTypes.SORT_LAYERS_BUTTON_PRESSED
    };
};

export const toggleDisplayLayer = (layer) => {
    return {
        type: ActionTypes.TOGGLE_DISPLAY_LAYER_PRESSED,
        layer: layer
    }
};

export const toggleAffectedLayer = (event, layer) => {
    event.stopPropagation();
    return {
        type: ActionTypes.TOGGLE_AFFECTED_LAYER_PRESSED,
        layer: layer
    };
};

export const updateLayer = (newLayer) => {
    return {
        type: ActionTypes.SUBMIT_LAYER_EDIT_FORM_PRESSED,
        newLayer: newLayer
    };
};

export const closeEditLayerForm = () => {
    return {
        type: ActionTypes.ESCAPE_LAYER_EDIT_FORM_PRESSED
    };
};

export const openAffectedLayerEditForm = () => {
    return {
        type: ActionTypes.OPEN_LAYER_EDIT_FORM_PRESSED,
    }
};

export const refreshLayerList = () => {
    return {
        type: ActionTypes.LAYER_LIST_PANEL_PRESSED
    }
};

export const setAffectedNextLayer = () => {
    return {
        type: ActionTypes.LAYERS_LIST_ARROW_DOWN_PRESSED
    }
};

export const setAffectedPrevLayer = () => {
    return {
        type: ActionTypes.LAYERS_LIST_ARROW_UP_PRESSED
    }
};


