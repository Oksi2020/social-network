import React from 'react'; 
import { connect } from 'react-redux';
import { Redirect } from 'react-router';

let mapStateToPropsForRedirect = (state) => ({
    isAuth: state.authReducer.isAuth
})

let withAuthRedirect = ( Component ) => {
    class RedirectComponent extends React.Component {
        render() {
            if(!this.props.isAuth) {
                return <Redirect to='/login'/>
            } 
            return <Component {...this.props} />
        }
    }
    let ConnectedRedirectComponent = connect(mapStateToPropsForRedirect)(RedirectComponent);
    return ConnectedRedirectComponent;
}

export default withAuthRedirect;