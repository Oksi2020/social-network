import React, {Component} from 'react';
import { connect } from 'react-redux';

import Header from './Header';
import { logout } from '../../redux/auth-reducer';

class HeaderContainer extends Component {
    render() {
        return (
            <Header {...this.props}/>
        )
    }
}

let mapStateToProps = (state) => {
    return{
        isAuth: state.authReducer.isAuth,
        user: state.authReducer.user,
        url: state.appReducer.url
    }
}

export default connect(mapStateToProps, { logout })(HeaderContainer);