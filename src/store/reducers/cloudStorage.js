import * as ActionTypes from "../actionTypes";

const cloudStorageDefaultState = {
    document: {
        id: undefined,
        name: "",
        owner: "Alex Bol",
        lastUpdated: undefined
    },
    documentsList: []
};

function isUpToDate(list1, list2) {
    if (Object.keys(list1).length !== Object.keys(list2).length)
        return false;
    for (let key in list1) {
        if ( !(list2.hasOwnProperty(key) && (list1[key].lastUpdated !== list2[key].lastUpdated)) ) {
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
                    lastUpdated: action.timestamp
                }
            };
        case ActionTypes.REQUEST_FETCH_DOCUMENT_FROM_DATABASE_SUCCEED:
            return {
                ...state,
                document: {
                    id: action.id,
                    name: action.name,
                    owner: action.owner,
                    lastUpdated: action.timestamp
                }
            };
        case ActionTypes.REQUEST_UPDATE_DOCUMENT_IN_DATABASE_SUCCEED:
            return {
                ...state,
                document: {
                    ...state.document,
                    lastUpdated: action.timestamp
                }
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