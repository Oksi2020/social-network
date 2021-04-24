import React from 'react';
import './Post.scss';

const Post = ({title, description, image, likes}) => {
    return <div className='post__item'>
        <h3 className='post__title'>{title}</h3>
        <img className='post__picture' src={image} />
        <div className='post__description'>{description}</div>
        <span className='lices-count'>Likes: {likes}</span>
    </div>
}

export default Post;