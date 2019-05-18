import * as ActionTypes from "../actionTypes";

const defaultState = {
    uploadStarted:  false,
    uploadCompleted: false,
    uploadedFiles: []
};

const upload = (state=defaultState, action) => {
    switch (action.type) {
        case ActionTypes.INITIALIZE_UPLOAD_STATE:
            return defaultState;

        case ActionTypes.FILES_UPLOAD_COMPLETED:
            return {
                ...state,
                uploadCompleted: true,
                uploadedFiles: action.uploadedFiles
            };
        default:
            return state
    }
};

export default upload