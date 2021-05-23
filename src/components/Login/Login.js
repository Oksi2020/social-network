import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import { NavLink } from 'react-router-dom';
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
                 <div className='remember-me'>Запам'ятати мене</div>
            </div>
            { error && <div className='error-border'>
                { error }
            </div> }
            <button>Вхід</button>
            <p className='or'>чи</p>
            <div className='redirect-to-registration'>
                <NavLink to='/registration'> Зареєструватись </NavLink>
            </div>
        </form>
    )
}

const LoginReduxForm = reduxForm({form: 'login'})(LoginForm);

const Login = ({login, users, isAuth }) => {
    const sendLoginData = (formData) => {
        login(formData.email, formData.password, formData.rememberMe, users);
    }
    if(isAuth) {
        return <Redirect to='/profile' />
    }
    return (
        <div className='login'>
            <h1 className='login-logo'>Вхід</h1>
            <LoginReduxForm onSubmit={sendLoginData}/>
        </div>
    )
}

const mapStateToProps = (state) => ({
    isAuth: state.authReducer.isAuth,
    users: state.usersPageReducer.users, 
})
export default connect(mapStateToProps, {login})(Login);