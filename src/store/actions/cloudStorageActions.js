import * as ActionTypes from "../actionTypes";
import axios from "../../axios-database";

// export const updateDocumentsList = (documents) => {
//     return {
//         type: ActionTypes.DOCUMENTS_LIST_LOADED,
//         documents: documents
//     }
// };

export const updateDocumentInDatabase = ( id, payload) => {
    return axios.put(`/documents/${id}.json`, payload);
};

export const addDocumentToDatabase = ( payload) => {
    return axios.post('/documents.json', payload);
};

export const registerDocumentAddedToDatabase = (id, timestamp) => {
    return {
        type: ActionTypes.REQUEST_ADD_DOCUMENT_TO_DATABASE_SUCCEED,
        id: id,
        lastSaved: timestamp
    }
};

export const updateDocumentState = (timestamp) => {
    return {
        type: ActionTypes.REQUEST_UPDATE_DOCUMENT_IN_DATABASE_SUCCEED,
        lastSaved: timestamp
    }
};


