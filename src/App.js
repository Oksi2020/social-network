import React, { Component } from 'react';
import { Route, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';

import withSuspesce from './hoc/withSuspence';
import { initializeAppThunk } from './redux/app-reducer';

import HeaderContainer from './components/Header/HeaderContainer';
import Navbar from './components/Navbar/Navbar';
import ProfileContainer from './components/Profile/ProfileContainer';
import MessagesContainer from './components/Messages/MessagesContainer';
import News from './components/News/News';
import Music from './components/Music/Music';
import Settings from './components/Settings/Settings';
import UsersContainer from './components/Users/UsersContainer';
import Loader from './components/common/Loader';
import Login from './components/Login/Login';
import './App.css';
import withSuspense from './hoc/withSuspence';
// const Login = React.lazy(() =>import('./components/Login/Login'));

class App extends Component {

  componentDidMount() {
    this.props.initializeAppThunk();
  }

  render() {
    if(!this.props.initialized) {
      return <Loader />
    }
    return (
      <div className="app-wrapper">
        <HeaderContainer store={this.props.store} />
        <Navbar />
        <div className='app-content'>
          <Route path='/profile/:userId?' render={() => <ProfileContainer
            store={this.props.store}
          />} />
          <Route path='/messages' render={() => <MessagesContainer
            store={this.props.store}
          />
          } />
          <Route path='/news' component={News} />
          <Route path='/music' component={Music} />
          <Route path='/settings' component={Settings} />
          <Route path='/login' render={() => <Login
            store={this.props.store}
          />} />
          <Route path='/users' render={() => <UsersContainer
            store={this.props.store}
          />
          } />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
    initialized: state.appReducer.initialized
})

export default compose(
  withRouter,
  connect(mapStateToProps, { initializeAppThunk }))(App);