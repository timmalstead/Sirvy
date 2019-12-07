import React, {Component} from 'react'
import { NavLink, withRouter } from 'react-router-dom'

import {
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword, 
    signInWithGoogle, 
    signInWithFacebook, 
    signOut} 
from '../../firebase/firebase'

import { NavStyle } from './style'

import SignIn from '../SignIn'
import SignUp from '../SignUp'

class Navbar extends Component {

    state = {
        error : null,
        signInMethod : null,
        signingUp : false,
        email : '',
        password : '',
        confirmPassword : ''
    }

    onChange = e => 
        this.setState({
            [e.target.name] : e.target.value
        })
    
    setSignInOrSignUp = e => 
        this.setState({
            signInMethod : e.target.value
        })

    signInOrSignUp = e => {
        e.preventDefault()
        const {signInMethod, email, password} = this.state
        let signIn = undefined
        if (signInMethod === 'signUp') {
            signIn = createUserWithEmailAndPassword(email, password)
        } else if (signInMethod === 'signIn') {
            signIn = signInWithEmailAndPassword(email, password)
        }
        signIn.then(socialAuthUser => {
            const user = {username : socialAuthUser.user.email.substring(0, socialAuthUser.user.email.indexOf('@')) , email : socialAuthUser.user.email}
            console.log(user)
            this.props.logInUser(user)
        }).catch(error => this.setState({error}))
    }

    thirdPartySignIn = (e) => {
        e.preventDefault()
        const {signInMethod} = this.state
        let signIn = undefined
        if (signInMethod === 'google') {
            signIn = signInWithGoogle()
        } else if (signInMethod === 'facebook') {
            signIn = signInWithFacebook()
        }
        signIn.then(socialAuthUser => {
            const user = {username : socialAuthUser.user.displayName , email : socialAuthUser.user.email}
            this.props.logInUser(user)
        }).catch(error => this.setState({error}))
    }

    signOut = () => {
        signOut()
        this.props.logOutUser()
        this.props.history.push('/')
    }

    render () {
        const {error, email, password, confirmPassword, signingUp} = this.state
        const isInvalid = password !== confirmPassword || password === '' || confirmPassword === ''
        return (
            <NavStyle>
                {this.props.isLoggedIn ? 
                    <nav>
                        <NavLink exact to = '/'>Home</NavLink>
                        <NavLink exact to = '/profile'>Profile</NavLink>
                        <NavLink exact to = '/sirvys'>Sirvys</NavLink>
                    </nav>
                : null}
                {this.props.isLoggedIn ? 
                null : 
                <div>
                    <form onSubmit={this.thirdPartySignIn}>
                        <button type='submit' onMouseEnter={() => this.setState({signInMethod : 'google'})}>Login with Google</button>
                        <button type='submit' onMouseEnter={() => this.setState({signInMethod : 'facebook'})}>Login with Facebook</button>
                    </form>
                    {signingUp ?
                        <SignUp 
                            email={email} 
                            password={password} 
                            confirmPassword={confirmPassword} 
                            isInvalid={isInvalid}
                            onChange={this.onChange}
                            setSignInOrSignUp={this.setSignInOrSignUp}
                            signInOrSignUp={this.signInOrSignUp}
                            error={this.state.error}
                        />
                    :
                        <div>
                            <SignIn 
                                email={email} 
                                password={password} 
                                confirmPassword={confirmPassword} 
                                isInvalid={isInvalid}
                                onChange={this.onChange}
                                setSignInOrSignUp={this.setSignInOrSignUp}
                                signInOrSignUp={this.signInOrSignUp}
                                error={this.state.error}
                            />
                        </div>
                    }
                    <button 
                        onClick={() => this.setState({ 
                            signingUp : !signingUp,
                            email : '',
                            password : '',
                            confirmPassword : ''})}>
                         {signingUp ? 'Sign In' : 'Sign Up'}
                    </button>
                    {error && <span>{error.message}</span>}
                </div>
                }
                {this.props.isLoggedIn ? 
                    <button type='button' onClick={this.signOut}>Sign Out</button> 
                : 
                    null
                }
            </NavStyle>
        )
    }
}

export default withRouter(Navbar)