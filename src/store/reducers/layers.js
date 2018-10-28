import * as ActionTypes from "../action-types";
import {Layers} from "../../models/layers";

const layers = (state = [], action) => {
    let curLayer = state.find(layer => layer.affected);
    let curLayerId = state.findIndex(layer => layer.affected);

    switch (action.type) {
        case ActionTypes.ADD_LAYER_PRESSED:
            return [...state, action.layer];

        case ActionTypes.DELETE_LAYER_BUTTON_PRESSED:
            return Layers.delete(action.layers, action.layer);

        case ActionTypes.SORT_LAYERS_BUTTON_PRESSED:
            return Layers.sort(action.layers);

        case ActionTypes.TOGGLE_DISPLAY_LAYER_PRESSED:
            let color = "";
            if (!action.layer.displayed) {
                color = Layers.getNextColor(state);
                if (color === "") return;  // no free colors
            }
            return state.map((layer) => {
                if (layer !== action.layer) {
                    // if action.layer will be undisplayed,
                    // it cannot become affected, then
                    // keep affected on this layer
                    if (action.layer.displayed) {
                        return layer;
                    }
                    else {
                        return layer.setAffected(false);
                    }
                }
                else {
                    let newLayer = layer.toggleDisplayed(color);
                    newLayer.affected = newLayer.displayed;
                    return newLayer;
                }
                // return layer.toggleDisplayed(color);
            });

        case ActionTypes.TOGGLE_AFFECTED_LAYER_PRESSED:
            return state.map((layer) => {
                if (layer !== action.layer) {
                    return layer.setAffected(false);
                }
                else {
                    return layer.setAffected(!layer.affected);
                }
            });

        case ActionTypes.NEW_SHAPE_PASTED:
            return state.map((layer) => {
                if (layer.affected) {
                    return layer.addShapesArray(action.shapesArray);
                }
                else {
                    return layer;
                }
            });

        case ActionTypes.OPEN_LAYER_EDIT_FORM_PRESSED:
            return state.map((layer) => {
                if (layer !== action.layer) {
                    return layer;
                }
                else {
                    return layer.setEdited(true);
                }
            });

        case ActionTypes.SUBMIT_LAYER_EDIT_FORM_PRESSED:
            return state.map((layer) => {
                if (layer.edited) {
                    return layer.setNameAndTitle(action.newLayer.name, action.newLayer.title);
                }
                else {
                    return layer;
                }
            });

        case ActionTypes.ESCAPE_LAYER_EDIT_FORM_PRESSED:
            return state.map((layer) => {
                if (layer.edited) {             // !== action.layer) {
                    return layer.setEdited(false);
                }
                else {
                    return layer;
                }
            });

        case ActionTypes.LAYERS_LIST_ARROW_DOWN_PRESSED:
            if (curLayerId === state.length - 1) {
                return state;
            }
            else {

                let nextLayer = state[curLayerId + 1];

                return state.map(layer => {
                    if (layer === curLayer) {
                        let newCurLayer = layer.toggleDisplayed("");
                        newCurLayer.affected = false;
                        return newCurLayer;
                    }
                    else if (layer === nextLayer) {
                        let color = curLayer.color;
                        let newNextLayer = layer.toggleDisplayed(color);
                        newNextLayer.affected = true;
                        return newNextLayer;
                    }
                    else {
                        return layer;
                    }
                });
            }

        case ActionTypes.LAYERS_LIST_ARROW_UP_PRESSED:
            if (curLayerId === 0) {
                return state;
            }
            else {
                let nextLayer = state[curLayerId - 1];

                return state.map(layer => {
                    if (layer === curLayer) {
                        let newCurLayer = layer.toggleDisplayed("");
                        newCurLayer.affected = false;
                        return newCurLayer;
                    }
                    else if (layer === nextLayer) {
                        let newNextLayer = layer.toggleDisplayed(curLayer.color);
                        newNextLayer.displayed = true;
                        newNextLayer.affected = true;
                        return newNextLayer;
                    }
                    else {
                        return layer;
                    }
                });
            }

        default:
            return state;
    }
};

export default layers;