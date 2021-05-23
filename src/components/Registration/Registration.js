import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';
import { Redirect } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { register } from '../../redux/auth-reducer';
import { addUser } from '../../redux/users-reducer'
import { required } from '../../utils/validators';
import { Input } from '../common/FormControl';
import { getRandomDefaultPhoto } from '../../utils/helpers';

const RegistrationForm = ( {handleSubmit, error} ) => {
    return(
        <form onSubmit={handleSubmit}>
            <div>
                <Field placeholder='Емейл' component={Input} type='email' name='email' validate={[required]}/>
            </div>
            <div>
                <Field placeholder="Ім`я користувача" component={Input} name='userName' validate={[required]}/>
            </div>
            <div>
                <Field placeholder='Пароль' component={Input} type='password' name='password' validate={[required]}/>
            </div>
            <div>
                <Field placeholder='Повторіть пароль' component={Input} type='password' name='confirmPassword' validate={[required]}/>
            </div>
            <div>
                <Field placeholder='Статус' component={Input} name='status' validate={[required]}/>
            </div>
            <div>
                <Field placeholder='Країна' component={Input} name='country' validate={[required]}/>
                <Field placeholder='Місто' component={Input} name='city' validate={[required]}/>
            </div>
            { error && <div className='error-border'>
                { error }
            </div> }
            <button>Зареєструватись</button>
            <p className='or'>чи</p>
            <div className='redirect-to-registration'>
                <NavLink to='/login'> Увійти </NavLink>
            </div>
        </form>
    )
}

const RegistrationReduxForm = reduxForm({form: 'registration'})(RegistrationForm);

const Registration = ({isAuth, register, addUser}) => {
    let errorMessage = '';
    const sendRegistrationData = (formData) => {
        let user = {
            id: uuidv4(),
            email: formData.email,
            defaultPhoto: getRandomDefaultPhoto(),
            photo: '',
            password: formData.password,
            userName: formData.userName,
            status: formData.status,
            location: {country: formData.country, city: formData.city},
            networks: [],
            following: [],
            posts: [],
            messages: []
        }
        if(formData.email && formData.password && formData.userName && formData.status && formData.country && formData.city && formData.password===formData.confirmPassword) {
            addUser(user);
            register(user);
        } else if(formData.password!==formData.confirmPassword) {
            errorMessage = 'Паролі не співпадають'
        } else {
            errorMessage = 'Заповніть всі поля'
        }
    }
    if(isAuth) {
        return <Redirect to='/profile' />
    }
    return(
        <div className='login'>
            <h1 className='login-logo'>Реєстрація</h1>
            <RegistrationReduxForm onSubmit={sendRegistrationData}/>
            {errorMessage && <div className='error-message'>{errorMessage}</div>}
        </div>
    )
}

const mapStateToProps = (state) => ({
    isAuth: state.authReducer.isAuth
})

export default connect( mapStateToProps, {register, addUser})(Registration);