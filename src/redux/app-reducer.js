import { SET_INITIALIZED } from '../constants/index';
import { setUserInfoThunk } from './auth-reducer';

let initialState = {
    initialized: false
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
    let promise = dispatch(setUserInfoThunk());
    console.log('promise', promise)
    Promise.all([promise]).then(() => {
        dispatch(initializedSuccess());
    })
}



export default appReducer;