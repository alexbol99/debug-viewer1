import * as ActionTypes from "../actionTypes";

const cloudStorageDefaultState = {
    document: {
        id: undefined,
        name: "",
        owner: "Alex Bol",
        lastSaved: undefined
    },
    documentsList: []
};

const cloudStorage = (state = cloudStorageDefaultState, action) => {
    switch (action.type) {
        case ActionTypes.REQUEST_ADD_DOCUMENT_TO_DATABASE_SUCCEED:
            return {
                ...state,
                document: {
                    id: action.id,
                    name: action.name,
                    owner: action.owner,
                    lastSaved: action.timestamp
                }
            };
        case ActionTypes.REQUEST_FETCH_DOCUMENT_FROM_DATABASE_SUCCEED:
            return {
                ...state,
                document: {
                    id: action.id,
                    name: action.name,
                    owner: action.owner,
                }
            };
        case ActionTypes.REQUEST_UPDATE_DOCUMENT_IN_DATABASE_SUCCEED:
            return {
                ...state,
                document: {
                    ...state.document,
                    lastSaved: action.timestamp
                }
            };
        case ActionTypes.REQUEST_FETCH_DOCUMENTS_FROM_DATABASE_SUCCEED:
            return {
                ...state,
                documentsList: action.documentsList
            };
        default:
            return state;
    }
};

export default cloudStorage