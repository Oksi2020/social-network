import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import { Field, reduxForm } from 'redux-form';
import { login } from '../../redux/auth-reducer';
import { required } from '../../utils/validators';
import { Input } from '../common/FormControl';
import './Login.scss';

const LoginForm = ( {handleSubmit, error} ) => {
    return(
        <form onSubmit={handleSubmit}>
            <div>
                <Field placeholder='Email' component={Input} name='email' validate={[required]}/>
            </div>
            <div>
                <Field placeholder='Password' component={Input} type='password' name='password' validate={[required]}/>
            </div>
            <div>
                <Field component='input' type='checkbox' name='rememberMe' />
            </div>
            { error && <div className='error-border'>
                { error }
            </div> }
            <button>Login</button>
        </form>
    )
}

const LoginReduxForm = reduxForm({form: 'login'})(LoginForm);

const Login = ({login, isAuth}) => {
    const sendLoginData = (formData) => {
        login(formData.email, formData.password, formData.rememberMe);
    }
    if(isAuth) {
        return <Redirect to='/profile' />
    }
    return (
        <div>
            <h1>Login</h1>
            <LoginReduxForm onSubmit={sendLoginData}/>
        </div>
    )
}

const mapStateToProps = (state) => ({
    isAuth: state.authReducer.isAuth
})
export default connect(mapStateToProps, {login})(Login);