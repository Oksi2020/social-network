import { SET_INITIALIZED } from '../constants/index';
import { setUserInfoThunk } from './auth-reducer';

let initialState = {
    initialized: false,
    url: ''
}

let appReducer = (state=initialState, action) => {
    switch(action.type) {
        case SET_INITIALIZED: 
            return {
                ...state,
                initialized: true
            }
        default:
            return state;
    }
}

export const initializedSuccess = () => ({type: SET_INITIALIZED});

export const initializeAppThunk = () => (dispatch) => {
    dispatch(initializedSuccess());
}

export default appReducer;