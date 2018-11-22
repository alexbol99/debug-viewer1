import * as ActionTypes from "../actionTypes";

const documentDefaultState = {
    id: undefined,
    name: "",
    owner: "Alex Bol",
    lastUpdated: undefined
};

const cloudStorageDefaultState = {
    document: documentDefaultState,
    documentsList: {}
};

function isUpToDate(stateDocumentsList, actionDocumentsList) {
    if (actionDocumentsList === null || actionDocumentsList === undefined)
        return true;

    if (Object.keys(stateDocumentsList).length !== Object.keys(actionDocumentsList).length)
        return false;
    for (let key in stateDocumentsList) {
        if (!(actionDocumentsList.hasOwnProperty(key) && (stateDocumentsList[key].lastUpdated !== actionDocumentsList[key].lastUpdated))) {
            return false
        }
    }

    return true;
}

const cloudStorage = (state = cloudStorageDefaultState, action) => {
    switch (action.type) {
        case ActionTypes.REQUEST_ADD_DOCUMENT_TO_DATABASE_SUCCEED:
            return {
                ...state,
                document: {
                    id: action.id,
                    name: action.name,
                    owner: action.owner,
                    lastUpdated: action.lastUpdated
                }
            };

        case ActionTypes.REQUEST_FETCH_DOCUMENT_FROM_DATABASE_SUCCEED:
            return {
                ...state,
                document: {
                    id: action.id,
                    name: action.name,
                    owner: action.owner,
                    lastUpdated: action.lastUpdated
                }
            };

        case ActionTypes.REQUEST_UPDATE_DOCUMENT_IN_DATABASE_SUCCEED:
            return {
                ...state,
                document: {
                    ...state.document,
                    lastUpdated: action.lastUpdated
                }
            };

        case ActionTypes.DOCUMENT_NAME_UPDATED:
            return {
                ...state,
                document: {
                    ...state.document,
                    name: action.name
                }
            };

        case ActionTypes.DELETE_DOCUMENT_FROM_DATABASE_SUCCEED:
            let { [action.id]: document, ...newList } = state.documentsList;
            return {
                ...state,
                document: state.document.id === action.id ? documentDefaultState : state.document,
                documentsList: newList
            };

        case ActionTypes.DOCUMENT_SELECTED_FROM_LIST:
            return {
                ...state,
                document: action.document
            };

        case ActionTypes.CLEAR_ALL_BUTTON_CLICKED:
            return {
                ...state,
                document: documentDefaultState
            };

        case ActionTypes.REQUEST_FETCH_DOCUMENTS_FROM_DATABASE_SUCCEED:
            return isUpToDate(state.documentsList, action.documentsList) ?
                state :
            {
                ...state,
                documentsList: action.documentsList
            };

        default:
            return state;
    }
};

export default cloudStorage