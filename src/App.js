import React, { Component } from 'react';
import { Route, withRouter, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';

import withSuspesce from './hoc/withSuspence';
import { initializeAppThunk } from './redux/app-reducer';
import { setUsersDataThunk } from './redux/users-reducer';
import { setAuthDataThunk } from './redux/auth-reducer';
import { setDialogsDataThunk } from './redux/dialogs-reducer';
import { setProfileDataThunk } from './redux/profile-reducer';

import HeaderContainer from './components/Header/HeaderContainer';
import ProfileContainer from './components/Profile/ProfileContainer';
import MessagesContainer from './components/Messages/MessagesContainer';
import News from './components/News/NewsContainer';
import Settings from './components/Settings/Settings';
import UsersContainer from './components/Users/UsersContainer';
import Loader from './components/common/Loader';
import Login from './components/Login/Login';
import Registration from './components/Registration/Registration';
import NotFoundPage from './components/common/NotFoundPage/NotFoundPage';
import './App.css';
import withSuspense from './hoc/withSuspence';
// const Login = React.lazy(() =>import('./components/Login/Login'));

class App extends Component {
  componentDidMount() {
    this.props.initializeAppThunk();
    this.props.setUsersDataThunk(JSON.parse(localStorage.getItem("usersReducer")));
    this.props.setDialogsDataThunk(JSON.parse(localStorage.getItem("dialogsPageReducer")));
    this.props.setProfileDataThunk(JSON.parse(localStorage.getItem("profilePageReducer")));
    let isActive = JSON.parse(localStorage.getItem('authReducer'));
    if(isActive) {
      this.props.setAuthDataThunk(isActive);
    }

  }
  componentDidUpdate(prevProps) {
    localStorage.setItem('usersReducer', JSON.stringify(this.props.state.usersPageReducer));
    localStorage.setItem('dialogsPageReducer', JSON.stringify(this.props.state.dialogsPageReducer));
    localStorage.setItem('profilePageReducer', JSON.stringify(this.props.state.profilePageReducer));
  }

  render() {
    if(!this.props.initialized) {
      return <Loader />
    }
    return (
      <div className="app-wrapper">
        <HeaderContainer store={this.props.store} />
        <div className='app-content'>
          <div className='app-bloor'>
            <Switch>
              <Redirect exact from = '/' to ='/news'></Redirect>
              <Redirect exact from = '/social-network' to ='/news'></Redirect>
              <Route path='/profile/:userId?' render={() => <ProfileContainer/>} />
              <Route path='/messages' render={() => <MessagesContainer/>} />
              <Route path='/news' component={News} />
              <Route path='/settings' component={Settings} />
              <Route path='/login' render={() => <Login/>} />
              <Route path='/registration' render={() => <Registration />} />
              <Route path='/users' render={() => <UsersContainer />
              } />
              <Route path='/friends' render={() => <UsersContainer
                onlyFriends={true}
              />
              } />
              <Route component={NotFoundPage}/>
            </Switch>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
    initialized: state.appReducer.initialized,
    state: state
})

export default compose(
  withRouter,
  connect(mapStateToProps, { initializeAppThunk, setUsersDataThunk, setAuthDataThunk, setDialogsDataThunk, setProfileDataThunk }))(App);