import React from 'react';
import {connect} from 'react-redux';
import Posts from './Posts';
import { addPostAction } from '../../../redux/profile-reducer';

let mapStateToProps = (state) => {
    return {
        posts: state.profilePageReducer.posts,
    }
}
let mapDispatchToProps = (dispatch) => {
    return {
        addNewPost: (value) => {
            dispatch(addPostAction(value));
        }
    }
}


const PostsContainer = connect( mapStateToProps, mapDispatchToProps )( Posts );

export default PostsContainer;