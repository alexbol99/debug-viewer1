import * as ActionTypes from '../store/actionTypes';
import axios from '../axios-database';
import Layers from '../models/layers';

const saveDocumentOnCloud = ({ getState, dispatch }) => next => action => {

    if(action.type === ActionTypes.SAVE_DOCUMENT_BUTTON_CLICKED) {
        let state = getState();
        let layers = state.layers;
        let stage = state.app.stage;

        let document = {
            name: "document_1",
            description: "",
            layers: Layers.toJSON(layers),
            dataURL: stage.toDataURL()
        };

        // for (let layer of layers) {
        //     let layerDoc = {
        //         name: layer.name,
        //         title: layer.title,
        //         shapes: JSON.stringify(layer.shapes, null, ' '),
        //         dataURL: stage.toDataURL()
        //     };
        //     document.push(layerDoc);
        // }

        axios.post('/documents.json', document)
            .then( response => {
                console.log(response)
            })
            .catch( error => {
                console.log(error);
            });
    }

    next(action);
};

export default saveDocumentOnCloud;