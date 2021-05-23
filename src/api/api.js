import * as axios from 'axios';

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    withCredentials: true,
    headers: {
        "API-KEY": "3c41ce0c-17c5-4c99-8246-06dad4ea5f68"
    }
})

export const userApi = {
    getUsers (userPage, usersCount) {
        return instance.get(`users?page=${userPage}&count=${usersCount}`)
            .then(response =>  (response.data))
    },
    follow (userId) {
        return instance.post(`follow/${userId}`)
    },
    unfollow (userId) {
        return instance.delete(`follow/${userId}`)
    }
}

export const profileApi = {
    setUserProfile (userId) {
        return instance.get(`profile/${userId}`)
    },
    getStatus( userId ) {
        return instance.get(`profile/status/${userId}`)
    },
    setStatus ( status ) {
        return instance.put('profile/status', {status})
    },
    setPhoto ( photo ) {
        let preparedFile = new FormData();
        preparedFile.append("image", photo);
        return instance.put('profile/photo', preparedFile,{
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
    }
}

export const loginIp = {
    setUserInfo ()  {
        return instance.get(`auth/me`);
    },
    login (email, password, rememberMe=false) {
        return instance.post('auth/login', {email, password, rememberMe});
    },
    logout () {
        return instance.delete('auth/login');
    }
}