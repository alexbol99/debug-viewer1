import * as actionTypes from '../actionTypes';

const initialState = {
    token: null,
    userId: null,
    username: null,
    error: null,
    loading: false
};

const auth = (state=initialState, action) => {
    switch (action.type) {
        case actionTypes.AUTHENTICATION_STARTED:
            return {
                ...state,
                error: null,
                loading: true
            };
        case actionTypes.AUTHENTICATION_SUCCEED:
            return {
                ...state,
                error: null,
                token: action.token,
                userId: action.userId,
                username: action.username,
                loading: false
            };
        case actionTypes.AUTHENTICATION_FAILED:
            return {
                ...state,
                error: action.error,
                token: null,
                userId: null,
                username: null,
                loading: false
            };
        case actionTypes.AUTHENTICATION_LOGOUT:
            return {
                ...state,
                token: null,
                userId: null,
                username: null
            };
        case actionTypes.AUTHENTICATION_SET_USERNAME:
            return {
                ...state,
                username: action.username
            };
        default:
            return state
    }
};

export default auth;