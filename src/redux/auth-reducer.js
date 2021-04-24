import { SET_USER_INFO } from '../constants/index';
import { loginIp } from '../api/api';
import { stopSubmit } from 'redux-form';

let initialState = {
    userId: null,
    email: null,
    password: null,
    isAuth: false
}

let authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER_INFO:
            return {
                ...state,
                ...action.payload
            }
        default:
            return state;
    }
}

export const setUserInfo = (userId, email, password, isAuth) => ({ type: SET_USER_INFO, payload: { userId, email, password, isAuth } });

export const setUserInfoThunk = () => async dispatch => {
    let response = await loginIp.setUserInfo()
    if (response.data.resultCode === 0) {
        dispatch(setUserInfo(response.data.data.id, response.data.data.email, response.data.data.password, true));
    }
}

export const login = (email, password, rememberMe) => async dispatch => {
    let response = await loginIp.login(email, password, rememberMe,)
    if (response.data.resultCode === 0) {
        dispatch(setUserInfo(response.data.data.userId, email, password, true))
    } else {
        let errorMessage = response.data.messages.length > 0 ? response.data.messages[0] : 'Some error'
        dispatch(stopSubmit('login', { _error: errorMessage }));
    }
}

export const logout = () => async dispatch => {
    let response = await loginIp.logout()
    if (response.data.resultCode === 0) {
        dispatch(setUserInfo(null, null, null, false));
    }
}

export default authReducer;