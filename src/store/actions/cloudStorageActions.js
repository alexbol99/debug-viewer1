import * as ActionTypes from "../actionTypes";
import axios from "../../axios-database";
import * as appActions from "../actions/appActions";
import * as layerActions from '../../store/actions/layersActions';
import Layer from "../../models/layer";
import {parseJSON} from "../../dataParsers/parseJSON";
import Layers from "../../models/layers";

const defaultName = "document";

export const getNewName = (documents) => {
    let name = defaultName;
    let inc = 1;
    let comparator = (document) => document.name === name;
    while (Object.values(documents).find(comparator)) {
        name = defaultName + inc;
        inc++;
    }
    return name;
};

export const registerDocumentAddedToDatabase = (id, lastUpdated) => {
    return {
        type: ActionTypes.REQUEST_ADD_DOCUMENT_TO_DATABASE_SUCCEED,
        id: id,
        lastUpdated: lastUpdated
    }
};

export const updateDocumentTimeStamp = (lastUpdated) => {
    return {
        type: ActionTypes.REQUEST_UPDATE_DOCUMENT_IN_DATABASE_SUCCEED,
        lastUpdated: lastUpdated
    }
};

export const updateDocumentName = (name) => {
    return {
        type: ActionTypes.DOCUMENT_NAME_UPDATED,
        name
    }
};

export const clearCurrentDocument = () => {
    return {
        type: ActionTypes.CLEAR_ALL_BUTTON_CLICKED,
    }
};

export const updateCurrentDocument = (document) => {
    return {
        type: ActionTypes.DOCUMENT_SELECTED_FROM_LIST,
        document
    }
};

export const requestFetchDocumentFromDatabaseSucceed = (id, name, owner, lastUpdated) => {
    return {
        type: ActionTypes.REQUEST_FETCH_DOCUMENT_FROM_DATABASE_SUCCEED,
        id,
        name,
        owner,
        lastUpdated
    }
};

export const deleteDocumentFromDatabaseSucceed = (id) => {
    return {
        type: ActionTypes.DELETE_DOCUMENT_FROM_DATABASE_SUCCEED,
        id
    }
};

export const requestFetchDocumentsFromDatabaseSucceed = (documentsList) => {
    return {
        type: ActionTypes.REQUEST_FETCH_DOCUMENTS_FROM_DATABASE_SUCCEED,
        documentsList
    }
};

export const fetchDocumentsFromDatabase = (token, userId) => {
    return dispatch => {
        dispatch(appActions.asyncOperationStarted());
        const queryParams = '?auth=' + token + '&orderBy="userId"&equalTo="' + userId + '"';
        const url = '/documents.json' + queryParams;
        axios.get(url)
            .then(response => {
                dispatch(requestFetchDocumentsFromDatabaseSucceed(response.data));
                dispatch(appActions.asyncOperationEnded());
            })
            .catch(error => {
                alert(error.message);
                dispatch(appActions.asyncOperationEnded());
            })
    }
};

export const deleteDocumentFromDatabase = (id) => {
    return dispatch => {
        dispatch(appActions.asyncOperationStarted());
        const url = '/documents/' + id + '.json';
        axios.delete(url)
            .then (response => {
                // query geom by "id"
                const queryParams = '?orderBy="id"&equalTo="' + id + '"';
                const url = '/geom.json' + queryParams;
                return axios.get(url)
            })
            .then (response => {
                const geomId = Object.keys(response.data)[0];
                return axios.delete(`/geom/${geomId}.json`)
            })
            .then(response => {
                dispatch(deleteDocumentFromDatabaseSucceed(id));
                dispatch(appActions.asyncOperationEnded());
            })
            .catch(error => {
                alert(error.message);
                dispatch(appActions.asyncOperationEnded());
            })
    }
};

export const fetchDocumentFromDatabase = (stage, id) => {
    return dispatch => {
        dispatch(layerActions.deleteAllLayers());
        dispatch(appActions.asyncOperationStarted());
        let name = "";
        let lastUpdated = undefined;
        let owner = "Alex Bol";
        let firstLayer = undefined;
        const url = '/documents/' + id + '.json';
        axios.get(url)
            .then(response => {
                if (response.data) {
                    name = response.data.name;
                    lastUpdated = response.data.lastUpdated;
                }

                // query geom by "id"
                const queryParams = '?orderBy="id"&equalTo="' + id + '"';
                const url = '/geom.json' + queryParams;
                return axios.get(url);
            })
            .then( response => {
                for (let layerData of Object.values(response.data)[0].layers) {
                    let layer = new Layer();
                    layer.shapes = parseJSON(layerData.shapes);
                    layer.name = layerData.name;

                    if (!firstLayer) firstLayer = layer;
                    dispatch(layerActions.addNewLayer(layer));
                }
                dispatch(requestFetchDocumentFromDatabaseSucceed(id, name, owner, lastUpdated));
                dispatch(appActions.setHomeView(stage, firstLayer));
                dispatch(layerActions.toggleDisplayLayer(firstLayer));
                dispatch(appActions.asyncOperationEnded());
            })
            .catch(error => {
                alert(error.message);
                dispatch(appActions.asyncOperationEnded());
            })
    }
};

export const addDocumentToDatabase = (payload, layers, history) => {
    return dispatch => {
        let id = undefined;
        dispatch(appActions.asyncOperationStarted());
        axios.post('/documents.json', payload)
            .then(response => {
                id = response.data.name;
                let layersJSON = Layers.toJSON(layers);
                let geomPayload = {
                    id: id,
                    layers: layersJSON
                };
                return axios.post('/geom.json', geomPayload)
            })
            .then(response => {
                dispatch(registerDocumentAddedToDatabase(id, Date.now()));
                dispatch(appActions.asyncOperationEnded());

                // update url
                history.push('/documents/' + id);
            })
            .catch(error => {
                alert(error.message);
                dispatch(appActions.asyncOperationEnded());
            })
    }
};

export const updateDocumentInDatabase = (id, payload, layers) => {
    return dispatch => {
        dispatch(appActions.asyncOperationStarted());
        // update documents header
        axios.put(`/documents/${id}.json`, payload)
            .then(response => {
                dispatch(updateDocumentTimeStamp(Date.now()));
                // dispatch(appActions.asyncOperationEnded());

                // query geom by "id"
                const queryParams = '?orderBy="id"&equalTo="' + id + '"';
                const url = '/geom.json' + queryParams;
                return axios.get(url)
            })
            .then( response => {
                let layersJSON = Layers.toJSON(layers);
                let geomPayload = {
                    id: id,
                    layers: layersJSON
                };
                let geomId = Object.keys(response.data)[0];  // response.data.name;
                return axios.put(`/geom/${geomId}.json`, geomPayload)
            })
            .then( reponse => {
                dispatch(appActions.asyncOperationEnded());
            })
            .catch(error => {
                alert(error.message);
                dispatch(appActions.asyncOperationEnded());
            })
    }
};



