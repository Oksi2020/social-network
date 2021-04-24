import catAvatar from '../../assets/img/catAvatar.png';
import { NavLink } from 'react-router-dom';

const User = ({user, followingProgress, changeFollowThunk}) => {
    return(
        <div className='user' key={user.id}>
            <div className='main-info'>
                <NavLink to={`/profile/${user.id}`}>
                    <img src={ user.photos.small==null?catAvatar:user.photos.small} />
                </NavLink>
                <button disabled={followingProgress.some(id=>id==user.id)} onClick={()=>{
                    changeFollowThunk( user );
                    }}>{user.followed? 'Unfollow':'Follow'}</button>
            </div>
            <div className='description'>
                <h3 className='user-name'>{user.name}</h3>
                <p className='user-status'>{user.status}</p>
                <p className='user-country'><b>Country:</b> {"user.location.country"}</p>
                <p className='user-country'><b>City:</b> {"user.location.city"}</p>
            </div>
        </div>
    )
}

export default User;