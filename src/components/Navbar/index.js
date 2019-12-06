import React, {Component} from 'react'
import { NavLink } from 'react-router-dom'
import {signInWithGoogle, signInWithFacebook} from '../../firebase/firebase'

import { NavStyle } from './style'

class Navbar extends Component {

    state = {
        signInMethod : null
    }
    
    signIn = (e) => {
        e.preventDefault()
        const signIn = this.state.signInMethod === 'google' ? signInWithGoogle() : signInWithFacebook()
        signIn.then( async socialAuthUser => {
            const user = {username : socialAuthUser.user.displayName , email : socialAuthUser.user.email}
            this.props.logInUser(user)
        })
    }

    render () {
        return (
            <NavStyle>
                {this.props.isLoggedIn ? 
                    <nav>
                        <NavLink exact to = '/'>Home</NavLink>
                        <NavLink exact to = '/profile'>Profile</NavLink>
                        <NavLink exact to = '/sirvys'>Sirvys</NavLink>
                    </nav>
                : null}
                <form onSubmit={this.signIn}>
                    <button type='submit' onMouseEnter={() => this.setState({signInMethod:'google'})}>Login with Google</button>
                    <button type='submit' onMouseEnter={() => this.setState({signInMethod:'facebook'})}>Login with Facebook</button>
                </form>
            </NavStyle>
        )
    }
}

export default Navbar