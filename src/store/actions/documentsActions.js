import * as ActionTypes from "../actionTypes";

export const updateDocumentsList = (documents) => {
    return {
        type: ActionTypes.DOCUMENTS_LIST_LOADED,
        documents: documents
    }
};

