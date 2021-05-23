import React, { useState } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { logout } from '../../redux/auth-reducer';
import catLogo from '../../assets/img/helpers/catLogo.png'
import './Header.scss'

const Header = (props) => {
    return <header className='header'>
        <div className='cap'>
            <div className='logo'><h1>Волонтер.ua</h1></div>
            <div className='login'>
                {
                    props.isAuth 
                    ? <div className='user-email'>{props.user.email} <a onClick={props.logout} className='auth-button'>Вийти</a> </div>
                    : <div><NavLink to='/login' className='auth-button'> Ввійти </NavLink> <NavLink to='/registration' className='auth-button'> Зареєструватись </NavLink></div>
                }
            </div>
        </div>
        <nav className='navbar'>
            <div>
                <NavLink to='/profile'>Профіль</NavLink>
            </div>
            <div>
                <NavLink to='/news'>Новини</NavLink>
            </div>
            <div>
                <NavLink to='/users'>Всі користувачі</NavLink>
            </div>
            <div className='space'><img src={catLogo} /></div>
            <div>
                <NavLink to='/friends'>Друзі</NavLink>
            </div>
            <div>
                <NavLink to='/messages'>Повідомлення</NavLink>
            </div>
            <div>
                <NavLink to='/settings'>Налаштування</NavLink>
            </div>
        </nav>
    </header>
}

export default Header;