import React, { useState } from 'react';
import {Link} from 'react-router-dom';
import moment from 'moment';
import { decodeBase64 } from '../../../../utils/base64';
import Timer from '../../../common/Timer/Timer';
import './Post.scss';

const Post = ({post, activeUserId, isOwn, isAuth, users, isLink, deletePostThunk, addCommentThunk}) => {
    const [comment, setComment] = useState('')
    const deletePost = () => {
        deletePostThunk(post.id, post.userId, users)
    }
    const sendComment = (e) => {
        e.preventDefault();
        setComment('');
        addCommentThunk(post.id, activeUserId.id, users, comment);
    }
    return <div className='post__item'>
        <div className='post__date'><Timer date={post.date}/></div>
        { isOwn && <input type='button' value='X' className='delete-post' onClick={deletePost}></input> }
        { isLink? <Link to={`/profile/${post.userId}`}><h3 className='post__title'>{post.title}</h3></Link> :<h3 className='post__title'>{post.title}</h3>}
        <div><b>Локація: </b>{ post.place }</div>
        <div><b>Призначення: </b>{ post.appointment }</div>
        {
            post.images.length>0 && post.images.map(image=> {
                return(<img key={image} src={decodeBase64(image)} className='post__picture'/>)
            })
        }
        <div className='post__description'>{ post.description }</div>
        <div className='post-comments__container'>
            {isAuth && <form className='comment-form' onSubmit={sendComment}>
                <input className='add-comment__input' type='textarea' placeholder='Додати коментар' value={comment} onChange={(e)=> setComment(e.target.value)}></input>
                <button className='add-comment__button'>Надіслати</button>
            </form>}
            <div className='post-comments'>
                {
                    post.comments && post.comments.length > 0
                    ? post.comments.map(commentItem => {
                        const avatar = users.find(user=>user.id===commentItem.userId);
                        const userName = users.find(user=>user.id===commentItem.userId).userName;
                        return (
                        <div className='post-comments__comment'>{
                            avatar && <div className='comment-user__logo'><Link to={`/profile/${commentItem.userId}`}><img src={avatar.photo?decodeBase64(avatar.photo):avatar.defaultPhoto}/></Link></div>
                        }
                            <div className='comment-info'>
                                <div className='comment-user__name'>{userName}</div>
                                <div>{commentItem.text}</div>
                            </div>
                        </div>
                        )
                    })
                    : 'Нема коментарів'
                }
            </div>
        </div>
    </div>
}

export default Post;