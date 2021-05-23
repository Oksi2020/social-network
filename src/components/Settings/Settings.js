import React, { useState } from 'react';
import { connect } from 'react-redux';
import {compose} from 'redux';
import { setUserPhotoThunk, changeUserDataThunk, changeDefaultPhotoThunk } from '../../redux/users-reducer';
import {changeAuthPhotoThunk} from '../../redux/auth-reducer';
import {encodeBase64, decodeBase64} from '../../utils/base64';
import withAuthRedirect from '../../hoc/withRedirect';


import './Settings.scss';
import { getRandomDefaultPhoto } from '../../utils/helpers';
       
const Settings = ({profileInfo, users, setUserPhotoThunk, changeAuthPhotoThunk, changeUserDataThunk, changeDefaultPhotoThunk}) => {


    const [email, setEmail] = useState(profileInfo.email);
    const [userName, setUserName] = useState(profileInfo.userName);
    const [password, setPassword] = useState(profileInfo.password);
    const [confirmPassword, setConfirmPassword] = useState(profileInfo.password);
    const [status, setStatus] = useState(profileInfo.status);
    const [country, setCountry] = useState(profileInfo.location.country);
    const [city, setCity] = useState(profileInfo.location.city);
    const [correctPassword, setCorrectPassword] = useState(true);
    
    const onMainPhotoSelected = (e) => {
        if(e.target.files.length) {
            encodeBase64(e.target.files[0]).then(file=> {
                setUserPhotoThunk(file, profileInfo.id, users);
                changeAuthPhotoThunk(file, profileInfo);
            })
        }
    }
 
    const deleteMainPhoto = () => {
        setUserPhotoThunk('', profileInfo.id, users);
        changeAuthPhotoThunk('', profileInfo);
    }
    const changeProfileData = (e) => {
        e.preventDefault();
        if(password===confirmPassword) {
            changeUserDataThunk(profileInfo.id, users, email, userName, password, status, country, city);
        } else {
            setCorrectPassword(false);
        }
    }
    const changeDefaultPhoto = () => {
        changeDefaultPhotoThunk(getRandomDefaultPhoto(), profileInfo.id, users);
    }
    return(
        <div className='settings'>
            <h1 className='settings-logo'>Налаштування</h1>
            <div>
                { profileInfo.photo 
                    ? <div className='choose-avatar'>
                        <img className='settings-photo' src={decodeBase64(profileInfo.photo)}/>
                        <div className='settings-photo__buttons'>
                            <div class="file-input">
                                <input type="file" id="file" className="file" onChange={onMainPhotoSelected}/>
                                <label for="file">Обрати файл</label>
                            </div>
                            <button type='button' onClick={deleteMainPhoto}> Видалити зображення </button>
                        </div>
                    </div>
                    : <div className='choose-avatar'>
                        <img className='settings-photo' src={profileInfo.defaultPhoto} />
                        <div class="file-input">
                            <input type="file" id="file" className="file" onChange={onMainPhotoSelected}/>
                            <label for="file">Обрати файл</label>
                        </div>
                        <button type='button' onClick={changeDefaultPhoto}>Змінити фото за замовчуванням</button>
                    </div>
                }
            </div>
            <form onSubmit={changeProfileData}>
                <div className='email_settings'>
                    <input type='email' placeholder='Емейл' value={email} onChange={(e)=>{setEmail(e.target.value)}}/>
                </div>
                <div className='username_settings'>
                    <input placeholder="Ім'я коритсувача" value={userName} onChange={(e)=>{setUserName(e.target.value)}}/>
                </div>
                <div className='password_settings'>
                    <input placeholder='Пароль' value={password} onChange={(e)=>{setPassword(e.target.value)}}/>
                </div>
                <div className={`confirm-password_settings ${correctPassword||'incorrect'}`}>
                    <input placeholder='Повторіть пароль' value={confirmPassword} onChange={(e)=>{setConfirmPassword(e.target.value)}}/>
                </div>
                <div className='status_settings'>
                    <input placeholder='Статус' value={status} onChange={(e)=>{setStatus(e.target.value)}}/>
                </div>
                <div className='country_settings'>
                    <input placeholder='Країна' value={country} onChange={(e)=>{setCountry(e.target.value)}}/>
                </div>
                <div className='city_settings'>
                    <input placeholder='Місто' value={city} onChange={(e)=>{setCity(e.target.value)}}/>
                </div>
                <button>Зберегти</button>
            </form>
        </div>
    )
}
const mapStateToProps = (state) => ({
    profileInfo: state.authReducer.user,
    users: state.usersPageReducer.users,
})
export default compose(
    connect(mapStateToProps, {setUserPhotoThunk, changeAuthPhotoThunk, changeUserDataThunk, changeDefaultPhotoThunk}),
    withAuthRedirect)
    (Settings);