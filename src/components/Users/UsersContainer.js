import React, { Component } from 'react';
import {compose} from 'redux';
import { connect } from 'react-redux';
import Users from './Users';
import { changeFollowThunk, setUsers, setUsersTotalCount, setActivePage, toggleLoader, toggleFollowing, addDialogThunk } from '../../redux/users-reducer';
import { getIsLoading, getTotalUsersCount, getUserPage, getUsers, getUsersCount } from '../../redux/user-sellectors';
import withAuthRedirect from '../../hoc/withRedirect';

import './Users.scss';

class UsersContainer extends Component {
    
    onClickSetActivePage = ( page ) => {
        this.props.setActivePageThunk(page, this.props.usersCount);
    }

    render () {
        return <Users 
            users={this.props.users}
            onlyFriends={this.props.onlyFriends}
            userPage = {this.props.userPage}
            changeFollowThunk={this.props.changeFollowThunk}
            addDialogThunk={this.props.addDialogThunk}
            totalUsersCount={this.props.totalUsersCount}
            usersCount={this.props.usersCount}
            isLoading={this.props.isLoading}
            isAuth={this.props.isAuth}
            activeUser={this.props.activeUser}
            toggleFollowing={this.props.toggleFollowing}
        />
    }
}


const mapStateToProps = (state) => {
    return {
        users: getUsers(state),
        usersCount: getUsersCount(state),
        totalUsersCount: getTotalUsersCount(state),
        userPage: getUserPage(state),
        isLoading: getIsLoading(state),
        isAuth: state.authReducer.isAuth,
        activeUser: state.authReducer.user,
    }
} 

export default compose(connect( mapStateToProps, { changeFollowThunk, setUsers, setUsersTotalCount, setActivePage, toggleLoader, toggleFollowing, addDialogThunk }),
    // withAuthRedirect
    )(UsersContainer);