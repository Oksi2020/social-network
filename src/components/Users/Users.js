import React, { useState } from 'react';

import Loader from '../common/Loader';
import Paginator from '../common/Paginator/Paginator';
import User from './User';

import './Users.scss';

const Users = ( {isLoading, users, isAuth, activeUser, changeFollowThunk, onlyFriends, addDialogThunk, ...props} ) => {
    const [searchProperties, setSearchProperties] = useState('')
    let filteredUsers = users;
    let followingUsers = [];
    if(isAuth) {
        followingUsers = users.find(filteredUser=>filteredUser.id===activeUser.id).following;
        if(onlyFriends) {
            filteredUsers = users.filter(user=>followingUsers.indexOf(user.id)>=0)
        } else {
            filteredUsers = users.filter(filteredUser=>filteredUser.id!==activeUser.id)
        }
    }
    if(searchProperties.length>0) {
        filteredUsers = filteredUsers.filter(user=>user.userName.toLowerCase().includes(searchProperties.toLowerCase()))
    }
    return (<div className='users-page'>
        <h2>{onlyFriends?'My friends':'All users'}</h2>
        <Paginator 
            totalItemsCount={props.totalUsersCount}
            usersCount={props.usersCount}
            userPage={props.userPage}
            onClickSetActivePage={props.onClickSetActivePage}
        />
        {filteredUsers.length>0
        ? <input placeholder='Write name or surname' value={searchProperties} onChange={(e)=> setSearchProperties(e.target.value)}/>
        : <h3>There are no users</h3>}
        {
            filteredUsers.map(user => (
                <User
                    key={user.id}
                    activeUserId={activeUser}
                    user={user} 
                    changeFollowThunk={changeFollowThunk}
                    addDialogThunk={addDialogThunk}
                    users={users}
                    followingUsers={followingUsers}
                    />
                ))
        }
    </div>)
}

export default Users;