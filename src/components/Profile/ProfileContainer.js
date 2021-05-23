import React, {Component} from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import {compose} from 'redux';

import Profile from './Profile';
import { setUserProfile } from '../../redux/profile-reducer';
import { setUserPhotoThunk, deletePostThunk } from '../../redux/users-reducer';
import { changeFollowThunk } from '../../redux/users-reducer';
import withAuthRedirect from '../../hoc/withRedirect';


class ProfileContainer extends Component {

    refreshUser = () => {
        let userId = this.props.match.params.userId;
        if(!userId) {
            if(this.props.isAuth) {
                userId = this.props.myProfile.id
            } else {
                this.props.history.push('/login');
            }
        } 
        this.props.setUserProfile(userId, this.props.users);
    }
    componentDidMount() {
        this.refreshUser();
    }
    componentDidUpdate(prevProps) {
        if(this.props.match.params.userId!==prevProps.match.params.userId) {
            this.refreshUser();
        }
    }

    render () {
        return <Profile { ...this.props } 
                    isOwn={!this.props.match.params.userId} 
                    isAuth={this.props.isAuth}
                    profile={this.props.profile} 
                    myProfile={this.props.myProfile}
                    status={this.props.status} 
                    users={this.props.users}
                    setUserStatus={this.props.setUserStatus} 
                    setUserPhotoThunk={this.props.setUserPhotoThunk}
                    changeFollowThunk={this.props.changeFollowThunk}
                />
    }
}

let mapStateToProps = (state) => {
    return {
        profile: state.profilePageReducer.profile,
        status: state.profilePageReducer.status,
        isAuth: state.authReducer.isAuth,
        myProfile: state.authReducer.user,
        users: state.usersPageReducer.users
    }
}

export default compose(
    connect( mapStateToProps, { setUserProfile, changeFollowThunk, setUserPhotoThunk, deletePostThunk }),
    withRouter,
)(ProfileContainer);