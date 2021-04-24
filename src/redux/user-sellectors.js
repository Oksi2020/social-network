export const getUsers = (state) => {
    return state.usersPageReducer.users;
}

export const getUsersCount = (state) => {
    return state.usersPageReducer.usersCount;
}

export const getTotalUsersCount = (state) => {
    return state.usersPageReducer.totalUsersCount;
}

export const getUserPage = (state) => {
    return state.usersPageReducer.userPage;
}

export const getIsLoading = (state) => {
    return state.usersPageReducer.isLoading;
}

export const getFollowingProgress = (state) => {
    return state.usersPageReducer.followingProgress;
}