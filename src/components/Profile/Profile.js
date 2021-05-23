import React from 'react';
import PostsContainer from './Posts/PostsContainer';
import ProfileInfo from './ProfileInfo/ProfileInfo';

import './Profile.scss';

const Profile = (props) => {
    return <div className='profile'>
        <ProfileInfo 
            isOwn={props.isOwn} 
            isAuth={props.isAuth}
            myProfile={props.myProfile}
            profile={ props.profile } 
            users={props.users}
            changeFollowThunk={props.changeFollowThunk}
        />
        <PostsContainer 
            store={props.store}
            avatar={props.myProfile}
            isOwn={props.isOwn} 
            isAuth={props.isAuth}
            userId={props.profile&&props.profile.id}
            activeUserId={props.myProfile}
            users={props.users}
            location={props.profile&&props.profile.location.city}
        />
    </div>
}

export default Profile;