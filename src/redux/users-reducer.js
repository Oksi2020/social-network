import { 
    CHANGE_FOLLOWING, 
    SET_USERS, 
    SET_USERS_TOTAL_COUNT, 
    SET_ACTIVE_PAGE, 
    TOGGLE_LOADER, 
    TOGGLE_FOLLOWING, 
    ADD_USER, 
    SET_USERS_DATA, 
    CHANGE_USERS } from './../constants/index';
import { changeAuthDefaultPhoto } from './auth-reducer';

let myUser = {
    id: 1,
    email: 'rozbutska34@gmail.com',
    defaultPhoto: '/social-network/static/media/catAvatar.12fd2b01.png',
    photo: '',
    password: '1',
    userName: 'Oksi_2020',
    status: 'I am okay',
    location: {country:'Ukraine', city:'khoroshiv'},
    networks: [],
    following: [],
    posts: [],
    messages: []
}
let user2 = {
    id: 2,
    email: 'labradorite@gmail.com',
    defaultPhoto: '/social-network/static/media/penguinAvatar.d193e8c3.png',
    photo: '',
    password: '22222222',
    userName: 'Vania Gashchenko',
    status: 'I am not okay',
    location: {country:'Ukraine', city:'Zhytomyr'},
    networks: [],
    following: [],
    posts: [],
    messages: []
}
let user3 = {
    id: 3,
    email: 'serzh@gmail.com',
    defaultPhoto: '/social-network/static/media/pigAvatar.2f31e6e5.png',
    photo: '',
    password: 'serzh',
    userName: 'Basil Serzh',
    status: 'Life is beautiful',
    location: {country:'Ukraine', city:'Krasnohirka'},
    networks: [],
    following: [],
    posts: [],
    messages: []
}
let initialState = {
    users: [myUser, user2, user3],
    usersCount: 50,
    userPage: 1,
    totalUsersCount: 0,
    isLoading: false,
    followingProgress: []
}

const usersPageReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USERS_DATA: {
            return {
                ...action.usersReducerData
            }
        }
        case CHANGE_FOLLOWING:
            return {
                ...state,
                users: state.users.map(user => {
                    if (user.id === action.userId) {
                        user.followed = !user.followed;
                    }
                    return user;
                })
            }
        case SET_USERS:
            localStorage.setItem('users', action.users)
            return { ...state, users: [...action.users] };
        case SET_USERS_TOTAL_COUNT:
            return { ...state, totalUsersCount: action.totalUsersCount };
        case SET_ACTIVE_PAGE:
            return { ...state, userPage: action.page }
        case TOGGLE_LOADER:
            return { ...state, isLoading: action.isLoading }
        case TOGGLE_FOLLOWING:
            return {
                ...state, followingProgress: action.isFillowing
                    ? [...state.followingProgress, action.userId]
                    : state.followingProgress.filter(id => id != action.userId)
            }
        case ADD_USER: 
            return {
                ...state,
                users: [...state.users, action.user]
            }
        case CHANGE_USERS:
            return {
                ...state,
                users: action.newUsers
            }
        default:
            return state;
    }
}

export const changeUsers = (newUsers) => ({type: CHANGE_USERS, newUsers})
export const setUsersData = (usersReducerData) => ({type: SET_USERS_DATA, usersReducerData})

export const changeFollow = (userId) => ({ type: CHANGE_FOLLOWING, userId: userId })

export const setUsers = (users) => ({ type: SET_USERS, users })

export const setUsersTotalCount = (totalUsersCount) => ({ type: SET_USERS_TOTAL_COUNT, totalUsersCount })

export const setActivePage = (page) => ({ type: SET_ACTIVE_PAGE, page })

export const toggleLoader = (isLoading) => ({ type: TOGGLE_LOADER, isLoading });

export const toggleFollowing = (isFillowing, userId) => ({ type: TOGGLE_FOLLOWING, isFillowing, userId });

export const addUser = (user) => ({ type: ADD_USER, user });

export const setUsersDataThunk = (users) => dispatch => {
    dispatch(setUsersData(users));
}

export const setUserPhotoThunk = (userPhoto, userId, users) => dispatch => {
    let newUsers = users.map(user=>{
        if(user.id==userId) {
            user.photo = userPhoto
        }
        return user;
    })
    dispatch(changeUsers(newUsers));
}
export const changeFollowThunk = (followingUserId, userId, users) => dispatch => {
    let newUsers = users.map(user=>{
        if(user.id==userId) {
            console.log('found', userId)
            user.following.find(followed=>followed==followingUserId)
            ?user.following=user.following.filter(followed=>followed!=followingUserId)
            :user.following.push(followingUserId)
        }
        return user;
    })
    dispatch(changeFollow(newUsers));
}
export const changeUserDataThunk = (userID, users, email, userName, password, status, country, city) => dispatch => {
    let newUsers = users.map(user=> {
        if(user.id==userID) {
            user.email = email;
            user.userName = userName;
            user.password = password;
            user.status = status;
            user.location.country = country;
            user.location.city = city;
        }
        return user;
    })
    dispatch(changeUsers(newUsers));
};

export const changeDefaultPhotoThunk = (defaultPhoto, userId, users) => dispatch => {
    let newUsers = users.map(user=>{
        if(user.id==userId) {
            user.defaultPhoto = defaultPhoto
        }
        return user;
    })
    dispatch(changeUsers(newUsers));
    dispatch(changeAuthDefaultPhoto(defaultPhoto))
}

export const addNewPostThunk = (newPost, userId, users) => dispatch => {
    let newUsers = users.map(user=>{
        if(user.id==userId) {
            user.posts=[newPost, ...user.posts]
        }
        return user;
    })
    dispatch(changeUsers(newUsers));
}
export const deletePostThunk = (postId, userId, users) => dispatch => {
    const newUsers = users.map(user=>{
        if(user.id==userId) {
            user.posts = user.posts.filter(post=>post.id!==postId);
        }
        return user;
    })
    dispatch(changeUsers(newUsers));
}

export const addDialogThunk = ( userId, activeUserId, users ) => dispatch => {
    let newUsers = users.map(user=>{
        if(user.id==userId) {
            user.messages.push({userId: activeUserId, messages: []})
        }
        if(user.id==activeUserId) user.messages.push({userId: userId, messages: []})
        return user;
    });
    console.log('newUsers', newUsers)
    dispatch(changeUsers(newUsers));
}

export const addCommentThunk = (postId, activeUserId, users, comment) => dispatch => {
    let newUsers = users.map(user => {
        user.posts.map(post => {
            if(post.id===postId) {
                post.comments.push({userId: activeUserId, text: comment})
            }
            return post;
        })
        return user
    })
    console.log(newUsers)
    dispatch(changeUsers(newUsers));
}

export default usersPageReducer;