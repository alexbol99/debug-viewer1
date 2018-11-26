import * as ActionTypes from "../actionTypes";
import axios from "../../axios-database";

const defaultName = "document";

export const getNewName = (documents) => {
    let name = defaultName;
    let inc = 1;
    let comparator = (document) => document.name === name;
    while ( Object.values(documents).find(comparator) ) {
        name = defaultName + inc;
        inc++;
    }
    return name;
};

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

export const fetchDocumentFromDatabase = (id) => {
    return axios.get('/documents/' + id + '.json');
};

export const deleteDocumentFromDatabase = (id) => {
    return axios.delete('/documents/' + id + '.json');
};

export const fetchDocumentsFromDatabase = () => {
    return axios.get('/documents.json');
};

export const registerDocumentAddedToDatabase = (id, lastUpdated) => {
    return {
        type: ActionTypes.REQUEST_ADD_DOCUMENT_TO_DATABASE_SUCCEED,
        id: id,
        lastUpdated: lastUpdated
    }
};

export const updateDocumentState = (lastUpdated) => {
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

export const updateCurrentDocument = (document) => {
    return {
        type: ActionTypes.DOCUMENT_SELECTED_FROM_LIST,
        document
    }
};

export const requestFetchDocumentsFromDatabaseSucceed = (documentsList) => {
    return {
        type: ActionTypes.REQUEST_FETCH_DOCUMENTS_FROM_DATABASE_SUCCEED,
        documentsList
    }
};



