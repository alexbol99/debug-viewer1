import * as ActionTypes from "../actionTypes";

const documents = (state = [], action) => {
    switch (action.type) {
        case ActionTypes.DOCUMENTS_LIST_LOADED:
            return action.documents;
        default:
            return state;
    }
};

export default documents