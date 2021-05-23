import { ADD_POST, SET_PROFILE, GET_STATUS, SET_STATUS, SET_PROFILE_DATA } from '../constants/index';

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
        case SET_PROFILE_DATA:
            return {
                ...action.profileData
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

const setProfilesData = (profileData) => ({type: SET_PROFILE_DATA, profileData})


export const setProfile = (profile) => {
    return ({ type: SET_PROFILE, profile });
}

export const setStatus = (status) => {
    return ({ type: SET_STATUS, status });
}

export const setProfileDataThunk = profileData => dispatch => {
    dispatch(setProfilesData(profileData));
}

export const setUserProfile = (userId, users) => dispatch => {
    let userProfile = users.find(user=>user.id==userId);
    if(userProfile) {
        dispatch(setProfile(userProfile))
    }
}

export default profilePageReducer;