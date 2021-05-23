import React, { memo, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import moment from 'moment';
import localization from 'moment/locale/uk';
import { encodeBase64 } from '../../../utils/base64';
import Post from './Post/Post';

import classes from './Posts.module.scss';

const Posts = memo((props) => {
    const [appointment, setAppointment] = useState('допомога');
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [place, setPlace] = useState(props.location);
    const [images, setImages] = useState([]);


    const addNewPost = (e) => {
        const newPost = {
            id: uuidv4(),
            title,
            appointment,
            description,
            date: new moment().locale('uk', localization),
            userId: props.userId,
            place,
            images,
            comments: []
        }
        setAppointment('help');
        setTitle('');
        setDescription('');
        setPlace('');
        e.preventDefault();
        setImages([]);
        props.addNewPostThunk(newPost, props.userId, props.users);
    }

    const addPostsPhotos = (e) => {
        let imagesArray = [];
        for(let i = 0; i<e.target.files.length;i++) {
            encodeBase64(e.target.files[i]).then(image=> {
                imagesArray.push(image);
            })
        }
        setImages(imagesArray);
    }

    return <div  className={classes.posts__container}>
        {
            props.isOwn && <div className={classes.add_post}>
            <h3 className={classes.add_post__title}>Додати новий пост</h3>
            <form onSubmit={addNewPost}>
            <select value={appointment} onChange={(e)=>{setAppointment(e.target.value);}}>
                <option value="допомога">Допомога</option>
                <option value="прилаштування">Прилаштування</option>
                <option value="опіка">Опіка</option>
                <option value="пошук">Пошук</option>
            </select>
            <div>
                <input placeholder='Локація' value={place} onChange={(e)=>{setPlace(e.target.value)}}/>
            </div>
            <div>
                <input placeholder='Заголовок' value={title} onChange={(e)=>{setTitle(e.target.value)}}/>
            </div>
            <div>
                <textarea placeholder='Опис' value={description} onChange={(e)=>{setDescription(e.target.value)}}></textarea>
            </div>
            <div> 
            <div className={classes.file_input}>
                <input type="file" id="file" className={classes.file} multiple onChange={addPostsPhotos}/>
                <label for="file">Обрати файл(и)</label>
            </div>
            </div>
            <button>Додати пост</button>
        </form>
        </div>
        }
        { props.posts && props.posts.length > 0
            ? props.posts.map(post => {
                return (<Post
                    key={post.id}
                    activeUserId={props.activeUserId}
                    post={post}
                    isOwn={props.isOwn}
                    isAuth={props.isAuth}
                    users={props.users}
                    deletePostThunk={props.deletePostThunk}
                    addCommentThunk={props.addCommentThunk}
                    isLink={false}
                />)
            })
            : <h3>Користувач не має постів</h3>
        }
    </div>
});

export default Posts;