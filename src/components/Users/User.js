import { NavLink, useHistory } from 'react-router-dom';
import {decodeBase64} from '../../utils/base64';

const User = ({ user, changeFollowThunk, addDialogThunk, users, activeUserId, followingUsers }) => {
    const history = useHistory();
    return(
        <div className='user' key={user.id}>
            <div className='main-info'>
                <NavLink to={`/profile/${user.id}`}>
                    {
                        user.photo
                        ? <img src={ decodeBase64(user.photo) } />
                        : <img src={ user.defaultPhoto} />
                    }
                </NavLink>
                { activeUserId && <div className='user_actions'>
                    <button onClick={()=>{ changeFollowThunk( user.id, activeUserId.id, users );}}>
                        {followingUsers.indexOf(user.id)>=0?'Unfollow':'Follow'}
                    </button>
                    <button onClick={()=>{ 
                        addDialogThunk(user.id, activeUserId.id, users); 
                        history.push(`/messages/${user.id}`)
                        }}>
                        Write message
                    </button>
                    </div>
                }
            </div>
            <div className='description'>
                <h3 className='user-name'>{user.userName}</h3>
                <p className='user-status'>{user.status}</p>
                <p className='user-country'><b>Country:</b> {user.location.country}</p>
                <p className='user-country'><b>City:</b> {user.location.city}</p>
            </div>
        </div>
    )
}

export default User;