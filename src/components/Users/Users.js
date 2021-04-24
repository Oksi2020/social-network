import React from 'react';

import Loader from '../common/Loader';
import Paginator from '../common/Paginator/Paginator';
import User from './User';

import './Users.scss';

const Users = ( {isLoading, users, changeFollowThunk, followingProgress, ...props} ) => {

        return (<div className='users-page'>
            <h2>Users</h2>
            { isLoading? <Loader />:null }
            <Paginator 
                totalItemsCount={props.totalUsersCount}
                usersCount={props.usersCount}
                userPage={props.userPage}
                onClickSetActivePage={props.onClickSetActivePage}
            />
            {
                users.map(user => (
                    <User 
                        user={user} 
                        followingProgress={followingProgress}
                        changeFollowThunk={changeFollowThunk}
                    />
                ))
            }
        </div>)
}

export default Users;