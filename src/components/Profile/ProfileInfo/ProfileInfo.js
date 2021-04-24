import React from 'react';
import Profile from '../Profile';
import ProfileStatus from './ProfileStatus';
import Loader from '../../common/Loader';


import classes from './ProfileInfo.module.scss';

let background = 'https://p.bigstockphoto.com/GeFvQkBbSLaMdpKXF1Zv_bigstock-Aerial-View-Of-Blue-Lakes-And--227291596.jpg';

const Wallpaper = () => {
    return (
        <div className='profile__wallpaper' 
            style={{ backgroundImage: `url(${background})` }}
        >
        </div>
    )
}

const ProfileInfo = (props) => {
    {
        if(!props.profile) {
        return <Loader />
    }}
    return (
        <div className={classes.profile_info}>
            <Wallpaper />
            <div className={classes.main_info}>
                <img src={props.profile.photos.large} />
                ava + description
            </div>
            <ProfileStatus status={props.status} setUserStatus={props.setUserStatus}/>
        </div>
    )
}

export default ProfileInfo;