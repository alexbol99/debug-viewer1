import * as ActionTypes from '../store/actionTypes';
import axios from '../axios-database';
import Flatten from 'flatten-js';
import {Layer} from '../models/layer';

const saveDocumentOnCloud = ({ getState, dispatch }) => next => action => {

    if(action.type === ActionTypes.MANAGE_CLOUD_STORAGE_BUTTON_CLICKED) {
        let state = getState();
        let layers = state.layers;

        axios.get('/documents/-LQxnLEB82RFvfpC_wu6.json')
            .then( response => {
                for (let data of response.data) {
                    let layer = new Layer();

                    let shapes = JSON.parse(data.shapes);

                    for (let shape of shapes) {
                        let polygon = new Flatten.Polygon();
                        for (let faceArray of shape.geom) {
                            polygon.addFace(faceArray);
                        }
                        layer.add(polygon);
                    }

                    layer.name = data.name;
                    layer.title = data.title;
                    layers.push(layer);

                    dispatch({
                        type: ActionTypes.PAN_AND_ZOOM_TO_SHAPE,
                        shape: layer,
                        stage: state.app.stage
                    });
                    dispatch({
                        type: ActionTypes.TOGGLE_DISPLAY_LAYER_PRESSED,
                        layer: layer
                    });

                    dispatch({
                        type: ActionTypes.ASYNC_OPERATION_ENDED
                    });
                }
            })
            .catch( error => {
                console.log(error);
            });

        dispatch({
            type: ActionTypes.ASYNC_OPERATION_STARTED
        })

    }

    next(action);
};

export default saveDocumentOnCloud;