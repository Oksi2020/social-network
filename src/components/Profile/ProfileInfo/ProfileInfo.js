import React from 'react';
import {encodeBase64, decodeBase64} from '../../../utils/base64';
import Loader from '../../common/Loader';

import classes from './ProfileInfo.module.scss';

const ProfileInfo = ({profile, isAuth, myProfile, isOwn, users, changeFollowThunk}) => {
    let followingUsers = [];
    if(isAuth) {
        followingUsers = users.find(filteredUser=>filteredUser.id===myProfile.id).following
    }
    if(!profile) {
        return <Loader />
    }
    return (
        <div className={classes.profile_info}>
            <div className={classes.main_info}>
                <div className={classes.main_info__photo}>
                    { profile.photo 
                        ? <img src={decodeBase64(profile.photo)}></img>
                        : <img src={profile.defaultPhoto} />
                    }
                </div>   
                <div className={classes.info}>
                    <div className={classes.info_blocks}>
                        <span><b>Ім'я користувача</b> {profile.userName}</span>
                        <span><b>Опис:</b> {profile.status}</span>
                    </div>
                    <div className={classes.info_blocks}>
                        <span><b>Країна:</b> {profile.location.country}</span>
                        <span><b>Місто:</b> {profile.location.city}</span>
                    </div>
                </div>
                <div className={classes.user_actions}>
                { isOwn || isAuth && <button onClick={()=>{
                    changeFollowThunk( profile.id, myProfile.id, users );
                    }}>{ followingUsers.indexOf(profile.id)>=0?'Відписатись':'Підписатись'}
                </button>
                }</div>
            </div>
        </div>
    )
}

export default ProfileInfo;