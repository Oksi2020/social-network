import React from 'react';
import {connect} from 'react-redux';
import Posts from './Posts';
import { addNewPostThunk, deletePostThunk, addCommentThunk } from '../../../redux/users-reducer';

let mapStateToProps = (state) => {
    return {
        posts: state.profilePageReducer.profile&&state.profilePageReducer.profile.posts,
    }
}

const PostsContainer = connect( mapStateToProps, {addNewPostThunk, deletePostThunk, addCommentThunk} )( Posts );

export default PostsContainer;