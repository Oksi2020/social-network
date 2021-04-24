import { CHANGE_FOLLOWING, SET_USERS, SET_USERS_TOTAL_COUNT, SET_ACTIVE_PAGE, TOGGLE_LOADER, TOGGLE_FOLLOWING } from './../constants/index';
import { userApi } from '../api/api';

let initialState = {
    users: [],
    usersCount: 50,
    userPage: 1,
    totalUsersCount: 0,
    isLoading: false,
    followingProgress: []
}

const usersPageReducer = (state = initialState, action) => {
    switch (action.type) {
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
        default:
            return state;
    }
}

export const changeFollow = (userId) => ({ type: CHANGE_FOLLOWING, userId: userId })

export const setUsers = (users) => ({ type: SET_USERS, users })

export const setUsersTotalCount = (totalUsersCount) => ({ type: SET_USERS_TOTAL_COUNT, totalUsersCount })

export const setActivePage = (page) => ({ type: SET_ACTIVE_PAGE, page })

export const toggleLoader = (isLoading) => ({ type: TOGGLE_LOADER, isLoading });

export const toggleFollowing = (isFillowing, userId) => ({ type: TOGGLE_FOLLOWING, isFillowing, userId });

export const getUsersThunk = (userPage, usersCount) => async dispatch => {
    dispatch(toggleLoader(true));
    let data = await userApi.getUsers(userPage, usersCount)
    dispatch(setUsers(data.items));
    dispatch(toggleLoader(false));
    dispatch(setUsersTotalCount(data.totalCount));
}

export const setActivePageThunk = (page, usersCount) => async dispatch => {
    dispatch(setActivePage(page));
    dispatch(toggleLoader(true));
    let data = await userApi.getUsers(page, usersCount)
    dispatch(setUsers(data.items));
    dispatch(setUsersTotalCount(data.totalCount));
    dispatch(toggleLoader(false));
}

export const changeFollowThunk = (user) => async dispatch => {
    dispatch(toggleFollowing(true, user.id));
    if (!user.followed) {
        let response = await userApi.follow(user.id)
        if (response.data.resultCode === 0) {
            dispatch(changeFollow(user.id));
        }
        dispatch(toggleFollowing(false, user.id));
    } else if (user.followed) {
        let response = await userApi.unfollow(user.id)
        if (response.data.resultCode === 0) {
            dispatch(changeFollow(user.id))
        }
        dispatch(toggleFollowing(false, user.id));
    }
}
export default usersPageReducer;