import React, { memo }from 'react';
import { Field, reduxForm } from 'redux-form';
import { required, maxLength } from '../../../utils/validators';
import { Textarea, Input } from '../../common/FormControl';
import Post from './Post/Post';

import classes from './Posts.module.scss';

const validateMaxLength = maxLength(5);

const NewPostValue = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <Field component={Textarea} name='newPostText' placeholder='Write new post text' validate={[required, validateMaxLength]}/>
            <div>
                <button>Send post</button>
            </div>
        </form>
    )
}

const NewPostValueText = reduxForm({ form: 'newPostForm' })(NewPostValue);

const Posts = memo((props) => {

    const addNewPost = (value) => {
        alert('post added');
        props.addNewPost(value.newPostText);
    }

    return <div className={classes.posts__list}>
        <h3>My posts</h3>
        <NewPostValueText onSubmit={addNewPost} />
        {
            props.posts.map(post => {
                return (<Post
                    key={post.id}
                    title={post.title}
                    description={post.description}
                    image={post.image}
                    likes={post.likeCount}
                />)
            })
        }
    </div>
});

export default Posts;