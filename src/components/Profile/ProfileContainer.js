import React, {Component} from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import {compose} from 'redux';

import Profile from './Profile';
import { setUserProfile, getUserStatus, setUserStatus } from '../../redux/profile-reducer';
import withAuthRedirect from '../../hoc/withRedirect';


class ProfileContainer extends Component {

    componentDidMount() {
        let userId = this.props.match.params.userId;
        if(!userId) {
            if(this.props.isAuth) {
                userId = this.props.myId
            } else {
                this.props.history.push('/login');
            }
        }
        this.props.setUserProfile(userId);
        this.props.getUserStatus(userId);
    }
    render () {
        return <Profile { ...this.props } profile={this.props.profile} status={this.props.status} setUserStatus={this.props.setUserStatus} />
    }
}

let mapStateToProps = (state) => {
    return {
        profile: state.profilePageReducer.profile,
        status: state.profilePageReducer.status,
        isAuth: state.authReducer.isAuth,
        myId: state.authReducer.userId
    }
}

export default compose(
    connect( mapStateToProps, { setUserProfile, getUserStatus, setUserStatus }),
    withRouter,
    // withAuthRedirect
)(ProfileContainer);