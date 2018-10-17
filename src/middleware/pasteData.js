import * as ActionTypes from "../actions/action-types";
import {Layers} from "../models/layers";

const pasteData = ({ dispatch, getState }) => next => action => {

    if (action.type !== ActionTypes.DATA_FROM_BUFFER_PASTED) {
        return next(action);
    }

    let state = getState();
    let stage = state.stage;
    let layers = state.layers;
    let parser = state.app.parser;

    let layer = undefined;
    if (state.app.importDataToNewLayer) {   // import data to new layer
        layer = Layers.newLayer(stage, layers);
        layers.push(layer);
    }
    else {                                  // import data to affected layer
        layer = layers.find((lay) => lay.affected);
        if (!layer) {                       // if no layer affected, add new
            layer = Layers.newLayer(stage, layers);
            layers.push(layer);
        }
    }

    // Paste data from ClipBoard
    for (let item of action.data.items) {
        item.getAsString((string) => {
            let shapesArray = parser.parse(string);

            // TODO: add something like poly.valid()

            if (shapesArray.length > 0) {
                for (let shape of shapesArray) {
                    layer.add(shape);
                }
            }

            if (layer.shapes.length > 0) {
                dispatch({
                    type: ActionTypes.PAN_AND_ZOOM_TO_SHAPE,
                    shape: layer,
                    stage: stage
                });
                dispatch({
                    type: ActionTypes.TOGGLE_DISPLAY_LAYER_PRESSED,
                    layer: layer
                })
            }

        });

        break;
    }

};

export default pasteData;
