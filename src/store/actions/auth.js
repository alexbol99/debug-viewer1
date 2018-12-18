import * as actionTypes from '../actionTypes';
import axios from 'axios';

const apiKey = "AIzaSyDMUAcjgolAlapdpFmPEz8SaId1DZw7MpQ";

export const authStart = () => {
    return {
        type: actionTypes.AUTHENTICATION_STARTED
    }
};

export const authSucceed = (token, userId, username=null) => {
    return {
        type: actionTypes.AUTHENTICATION_SUCCEED,
        token,
        userId,
        username
    }
};

export const authFailed = (error) => {
    return {
        type: actionTypes.AUTHENTICATION_FAILED,
        error
    }
};

export const authSetUsername = (username) => {
    return {
        type: actionTypes.AUTHENTICATION_SET_USERNAME,
        username
    }
};

export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
    localStorage.removeItem('userId');
    return {
        type: actionTypes.AUTHENTICATION_LOGOUT
    }
};

export const checkAuthTimeout = (expirationTime) => {
    return dispatch => {
        setTimeout(() => {
            const email = localStorage.getItem('email');
            const password = localStorage.getItem('password');
            if (email && password) {
                dispatch(logIn(email, password))
            }
            else {
                dispatch(logout())
            }
        }, expirationTime * 1000)
    }
};

export const logIn = (email, password) => {
    return dispatch => {
        dispatch(authStart());
        const authData = {
            email,
            password,
            returnSecureToken: true
        };
        localStorage.setItem('email', email);
        localStorage.setItem('password', password);
        const url = "https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=" + apiKey;
        axios.post(url, authData)
            .then(response => {
                const expirationDate = new Date(new Date().getTime() + response.data.expiresIn * 1000);
                localStorage.setItem('token', response.data.idToken);
                localStorage.setItem('expirationDate', expirationDate);
                localStorage.setItem('userId', response.data.localId);

                dispatch(authSucceed(response.data.idToken, response.data.localId));
                dispatch(checkAuthTimeout(response.data.expiresIn));
                const queryParams = '?auth=' + response.data.idToken + '&orderBy="userId"&equalTo="' + response.data.localId + '"';
                return axios.get("https://debug-viewer.firebaseio.com/users.json" + queryParams);
            })
            .then(response => {
                if (Object.values(response.data.length > 0)) {
                    const username = Object.values(response.data)[0].username;
                    localStorage.setItem('username', username);
                    dispatch(authSetUsername(Object.values(response.data)[0].username))
                }
            })
            .catch(error => {
                dispatch(authFailed(error.response.data.error))
            })
    }
};

export const signUp = (username, email, password) => {
    return dispatch => {
        dispatch(authStart());
        const authData = {
            email,
            password,
            returnSecureToken: true
        };
        const url = "https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=" + apiKey;
        axios.post(url, authData)
            .then(response => {
                const expirationDate = new Date(new Date().getTime() + response.data.expiresIn * 1000);
                localStorage.setItem('token', response.data.idToken);
                localStorage.setItem('expirationDate', expirationDate);
                localStorage.setItem('userId', response.data.localId);
                localStorage.setItem('username', username);

                dispatch(authSucceed(response.data.idToken, response.data.localId, username));
                dispatch(checkAuthTimeout(response.data.expiresIn));

                const user = {
                    userId: response.data.localId,
                    username: username
                };
                return axios.post("https://debug-viewer.firebaseio.com/users.json", user);
            })
            .then(response => {
                // do nothing
            })
            .catch(error => {
                console.log(error.response.data.error);
                dispatch(authFailed(error.response.data.error))
            })
    }
};

export const authCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem('token');
        if (!token) {
            dispatch(logout());
        }
        else {
            const userId = localStorage.getItem('userId');
            const username = localStorage.getItem('username');
            const expirationDate = new Date(localStorage.getItem('expirationDate'));
            if (expirationDate > new Date()) {
                const timeLeft = expirationDate.getTime() - new Date().getTime()
                dispatch(authSucceed(token, userId, username));
                dispatch(checkAuthTimeout(timeLeft / 1000));
            }
            else {
                dispatch(logout());
            }
        }
    }
};

