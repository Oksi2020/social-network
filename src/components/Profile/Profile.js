import React from 'react';
import PostsContainer from './Posts/PostsContainer';
import ProfileInfo from './ProfileInfo/ProfileInfo';

import './Profile.scss';

const Profile = (props) => {
    
    return <div className='profile'>
        <ProfileInfo profile={ props.profile } status={props.status} setUserStatus={props.setUserStatus}/>
        <PostsContainer 
            store={props.store}
        />
    </div>
}

export default Profile;