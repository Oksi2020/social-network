import React, { Component } from 'react';
import './Users.scss';
import { connect } from 'react-redux';
import Users from './Users';
import { changeFollow, setUsers, setUsersTotalCount, setActivePage, toggleLoader, toggleFollowing, getUsersThunk, setActivePageThunk, changeFollowThunk } from '../../redux/users-reducer';
import { getFollowingProgress, getIsLoading, getTotalUsersCount, getUserPage, getUsers, getUsersCount } from '../../redux/user-sellectors';

class UsersContainer extends Component {

    componentDidMount() {
        this.props.getUsersThunk();
    }

    onClickSetActivePage = ( page ) => {
        this.props.setActivePageThunk(page, this.props.usersCount);
    }

    render () {
        return <Users 
            users={this.props.users}
            userPage = {this.props.userPage}
            changeFollow={this.props.changeFollow}
            totalUsersCount={this.props.totalUsersCount}
            usersCount={this.props.usersCount}
            isLoading={this.props.isLoading}
            followingProgress={this.props.followingProgress}
            toggleFollowing={this.props.toggleFollowing}
            onClickSetActivePage = {this.onClickSetActivePage}
            changeFollowThunk = {this.props.changeFollowThunk}
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
        followingProgress: getFollowingProgress(state)
    }
} 

export default connect( mapStateToProps, { changeFollow, setUsers, setUsersTotalCount, setActivePage, toggleLoader, toggleFollowing, getUsersThunk, setActivePageThunk, changeFollowThunk })(UsersContainer);