import React from 'react';

import { NavLink } from 'react-router-dom';

import './Navbar.scss'

const Navbar = () => {
    return <nav className='navbar'>
        <div>
            <NavLink to='/profile'>Profile</NavLink>
        </div>
        <div>
            <NavLink to='/messages'>Messages</NavLink>
        </div>
        <div>
            <NavLink to='/news'>News</NavLink>
        </div>
        <div>
            <NavLink to='/music'>Music</NavLink>
        </div>
        <div>
            <NavLink to='/settings'>Settings</NavLink>
        </div>
        <div style={{paddingTop: '40px'}}>
            <NavLink to='/users'>All users</NavLink>
        </div>
    </nav>
}

export default Navbar;