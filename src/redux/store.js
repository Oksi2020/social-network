import { createStore , combineReducers, applyMiddleware, compose } from 'redux';
import dialogsPageReducer from './dialogs-reducer';
import profilePageReducer from './profile-reducer';
import usersPageReducer from './users-reducer';
import authReducer from './auth-reducer';
import thunkMiddleware from 'redux-thunk';
import appReducer  from './app-reducer';
import { reducer as fromReducer } from 'redux-form';

let reducers = combineReducers({
    dialogsPageReducer,
    profilePageReducer,
    usersPageReducer,
    authReducer,
    form: fromReducer,
    appReducer
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
let store = createStore(reducers, composeEnhancers(applyMiddleware(thunkMiddleware)) );

export default store;