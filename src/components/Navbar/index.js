import React from 'react'
import { NavLink } from 'react-router-dom'

import { NavStyle } from './style'

const Navbar = (props) => {
    return (
        <NavStyle>
            {props.isLoggedIn ? 
                <nav>
                    <NavLink exact to = '/'>Home</NavLink>
                    <NavLink exact to = '/profile'>Profile</NavLink>
                    <NavLink exact to = '/sirvys'>Sirvys</NavLink>
                </nav>
            : null}
            <button type='button' onClick={props.logInUser}>Login</button>
        </NavStyle>
    )
}

export default Navbar