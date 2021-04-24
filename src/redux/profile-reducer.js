import { ADD_POST, SET_PROFILE, GET_STATUS, SET_STATUS } from '../constants/index';
import { profileApi } from '../api/api';

let initialState = {
    posts: [
        { id: 1, title: 'My first post', description: 'Hello. This is my first post! Welcome to my page!', image: 'https://www.abc.net.au/cm/rimage/12465498-16x9-xlarge.jpg?v=2', likeCount: 12 },
        { id: 2, title: 'My second post', description: 'Hello. This is my second post! Welcome to my page!', image: 'https://thumbor.forbes.com/thumbor/960x0/https%3A%2F%2Fspecials-images.forbesimg.com%2Fdam%2Fimageserve%2F765877054%2F960x0.jpg%3Ffit%3Dscale', likeCount: 3 },
        { id: 3, title: 'How to cook the cakes', description: 'Hello. Today i`ll tell you about cooking cakes!', image: 'https://handletheheat.com/wp-content/uploads/2015/03/Best-Birthday-Cake-with-milk-chocolate-buttercream-SQUARE.jpg', likeCount: 21 }
    ],
    profile: null,
    status: ''
}

const profilePageReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_POST: {
            return {
                ...state,
                posts: [...state.posts, {
                    id: 5,
                    title: 'Your added post',
                    description: action.post,
                    image: 'https://handletheheat.com/wp-content/uploads/2015/03/Best-Birthday-Cake-with-milk-chocolate-buttercream-SQUARE.jpg'
                }]
            };
        }

        case SET_PROFILE: {
            return { ...state, profile: action.profile }
        }
        case GET_STATUS: {
            return { ...state, status: action.status }
        }
        case SET_STATUS: {
            return { ...state, status: action.status }
        }
        default:
            return state;
    }
}

export const addPostAction = (post) => {
    return ({ type: ADD_POST, post })
}

export const setProfile = (profile) => {
    return ({ type: SET_PROFILE, profile });
}

export const setStatus = (status) => {
    return ({ type: SET_STATUS, status });
}

export const setUserProfile = (userId) => async dispatch => {
    let response = await profileApi.setUserProfile(userId)
    dispatch(setProfile(response.data));
}

export const getUserStatus = userId => async dispatch => {
    let response = await profileApi.getStatus(userId)
    dispatch(setStatus(response.data));
}
export const setUserStatus = status => async dispatch => {
    let response = await profileApi.setStatus(status)
    if (response.data.resultCode === 0) {
        dispatch(setStatus(status));
    }
}
export default profilePageReducer;