import React, { Component } from 'react';
import {compose} from 'redux';
import { connect } from 'react-redux';
import News from './News';
import { addCommentThunk } from '../../redux/users-reducer';

const NewsContainer = (props) => {
    return <News {...props} />
}

let mapStateToProps = (state) => {
    return {
        isAuth: state.authReducer.isAuth,
        user: state.authReducer.user,
        users: state.usersPageReducer.users,
        myProfile: state.authReducer.user,
        isAuth: state.authReducer.isAuth,
    }
} 
export default connect( mapStateToProps, {addCommentThunk} )(NewsContainer);