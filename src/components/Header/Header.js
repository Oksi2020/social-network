import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { logout } from '../../redux/auth-reducer';
import './Header.scss'

const Header = (props) => {
    return <header className='header'>
        <img className='header__logo' src='https://cdn.worldvectorlogo.com/logos/tiktok-logo-2--1.svg' />
        <div className='login'>
            {
                props.isAuth 
                ? <div>{props.email} - <button onClick={props.logout}>Log out</button> </div>
                : <NavLink to='/login'> Login </NavLink>
            }
        </div>
    </header>
}

export default Header;