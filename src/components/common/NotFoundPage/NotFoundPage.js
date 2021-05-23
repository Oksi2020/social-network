import React from 'react';
import './NotFoundPage.scss';
import notFoundIGif from '../../../assets/img/helpers/404.gif';

const NotFoundPage = () => {
    return (
        <div className='not-found__page'>
            <img src={notFoundIGif}  className='not-found__gif'/>
        </div>
    )
}

export default NotFoundPage;