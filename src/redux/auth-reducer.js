import { SET_USER_INFO, SET_AUTH_DATA, SET_AUTH_PHOTO, CHANGE_AUTH_DEFAULT_PHOTO } from '../constants/index';
import { loginIp } from '../api/api';
import { stopSubmit } from 'redux-form';

let initialState = {
    user: null,
    isAuth: false
}

let authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_AUTH_DATA: 
            return {
                ...action.authData
            }
        case SET_USER_INFO:
            return {
                ...state,
                ...action.payload
            }
        case SET_AUTH_PHOTO: 
            return {
                ...state,
                ...action.photo
            }
        case CHANGE_AUTH_DEFAULT_PHOTO:
            return {
                ...state, 
                user: {
                    ...state.user,
                    defaultPhoto: action.defaultPhoto
                }
            }
        default:
            return state;
    }
}

export const setUserInfo = (user, isAuth) => ({ type: SET_USER_INFO, payload: { user, isAuth } });
export const setAuthData = (authData) => ({type: SET_AUTH_DATA, authData});
export const changeAuthPhoto = photo => ({type: SET_AUTH_PHOTO, photo});
export const changeAuthDefaultPhoto = defaultPhoto => ({type: CHANGE_AUTH_DEFAULT_PHOTO, defaultPhoto});

export const login = (email, password, rememberMe, users) => dispatch => {
    let activeUser = users.find(user=>user.email===email&&user.password===password);
    if(activeUser) {
        dispatch(setUserInfo(activeUser, true))
    }
    if(rememberMe) {
        localStorage.setItem('authReducer', JSON.stringify({user:activeUser, isAuth: true}));
    }
}

export const setAuthDataThunk = (authData) => dispatch => {
    dispatch(setAuthData(authData));
}

export const logout = () => dispatch => {
    dispatch(setUserInfo(null, null, null, false));
    localStorage.removeItem('authReducer');
}

export const register = (user) => dispatch => {
    dispatch(setUserInfo(user, true))
}

export const changeAuthPhotoThunk = (photo, profileInfo) => dispatch => {
    const newUser = profileInfo;
    newUser.photo = photo;
    dispatch(changeAuthPhoto(newUser));
}

export default authReducer;