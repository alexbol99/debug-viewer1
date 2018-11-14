import * as ActionTypes from '../store/actionTypes';
import axios from '../axios-database';
import Layers from '../models/layers';

const saveDocumentOnCloud = ({ getState, dispatch }) => next => action => {

    if(action.type === ActionTypes.SAVE_DOCUMENT_BUTTON_CLICKED) {
        let state = getState();
        let layers = state.layers;
        let stage = state.app.stage;
        let storage = state.cloudStorage;

        if (layers.length > 0) {
            let payload = {
                name: storage.document.name,
                layers: Layers.toJSON(layers),
                dataURL: stage.toDataURL()
            };

            if (storage.document.id) {
                axios.put(`/documents/${storage.document.id}.json`, payload)
                    .then(response => {
                        dispatch({
                            type: ActionTypes.REQUEST_UPDATE_DOCUMENT_IN_DATABASE_SUCCEED,
                            lastSaved: Date.now()
                        });
                        dispatch({
                            type: ActionTypes.ASYNC_OPERATION_ENDED
                        });
                    })
                    .catch(error => {
                        console.log(error);
                    });
            }
            else {
                axios.post('/documents.json', payload)
                    .then(response => {
                        dispatch({
                            type: ActionTypes.REQUEST_ADD_DOCUMENT_TO_DATABASE_SUCCEED,
                            id: response.data.name,
                            lastSaved: Date.now()
                        });
                        dispatch({
                            type: ActionTypes.ASYNC_OPERATION_ENDED
                        });
                        // this.props.history.push('/documents/'+response.data.name);
                    })
                    .catch(error => {
                        console.log(error);
                    });
            }

            dispatch({
                type: ActionTypes.ASYNC_OPERATION_STARTED
            });
        }
    }

    next(action);
};

export default saveDocumentOnCloud;