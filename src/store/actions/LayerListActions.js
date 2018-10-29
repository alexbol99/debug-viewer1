import * as ActionTypes from '../action-types';

export const refreshLayerList = () => {
    return {
        type: ActionTypes.LAYER_LIST_PANEL_PRESSED
    }
};

export const toggleDisplayLayer = (layer) => {
    return {
        type: ActionTypes.TOGGLE_DISPLAY_LAYER_PRESSED,
        layer: layer
    }
};

