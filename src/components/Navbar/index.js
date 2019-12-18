import React, { Component } from "react"
import { NavLink, withRouter } from "react-router-dom"

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithGoogle,
  signInWithFacebook,
  signOut
} from "../../firebase/firebase"

import { NavStyle } from "./style"

import SignIn from "../SignIn"
import SignUp from "../SignUp"

class Navbar extends Component {
  state = {
    error: null,
    signInMethod: null,
    signingUp: false,
    email: "",
    password: "",
    confirmPassword: ""
  }

  onChange = e =>
    this.setState({
      [e.target.name]: e.target.value
    })

  setSignInOrSignUp = e =>
    this.setState({
      signInMethod: e.target.value
    })

  signInOrSignUp = e => {
    e.preventDefault()
    const { signInMethod, email, password } = this.state
    let signIn = undefined
    if (signInMethod === "signUp") {
      signIn = createUserWithEmailAndPassword(email, password)
    } else if (signInMethod === "signIn") {
      signIn = signInWithEmailAndPassword(email, password)
    }
    signIn
      .then(socialAuthUser => {
        const usernameCropped = socialAuthUser.user.email.substring(
          0,
          socialAuthUser.user.email.indexOf("@")
        )
        const user = {
          username:
            usernameCropped.charAt(0).toUpperCase() +
            usernameCropped.substring(1),
          email: socialAuthUser.user.email,
          signInMethod: this.state.signInMethod,
          uid: socialAuthUser.user.uid
        }
        socialAuthUser.additionalUserInfo.isNewUser
          ? this.props.signUpUser(user)
          : this.props.logInUser(user)
      })
      .catch(error => this.setState({ error }))
  }

  thirdPartySignIn = e => {
    e.preventDefault()
    const { signInMethod } = this.state
    let signIn = undefined
    if (signInMethod === "google") {
      signIn = signInWithGoogle()
    } else if (signInMethod === "facebook") {
      signIn = signInWithFacebook()
    }
    signIn
      .then(socialAuthUser => {
        const user = {
          username: socialAuthUser.user.displayName,
          email: socialAuthUser.user.email,
          signInMethod: this.state.signInMethod,
          uid: socialAuthUser.user.uid
        }
        socialAuthUser.additionalUserInfo.isNewUser
          ? this.props.signUpUser(user)
          : this.props.logInUser(user)
      })
      .catch(error => this.setState({ error }))
  }

  signOut = () => {
    signOut()
    this.props.logOutUser()
    this.props.history.push("/")
  }

  changeSignInAndSignup = () => {
    this.setState({
      signingUp: !this.state.signingUp,
      email: "",
      password: "",
      confirmPassword: ""
    })
  }

  render() {
    const { error, email, password, confirmPassword, signingUp } = this.state
    const { currentUser } = this.props
    const isInvalid =
      password !== confirmPassword || password === "" || confirmPassword === ""
    return (
      <NavStyle>
        {this.props.isLoggedIn ? (
          <nav>
            <div>
              <NavLink exact to="/">
                Home
              </NavLink>
              <NavLink exact to="/profile">
                Profile
              </NavLink>
              <NavLink exact to="/sirvys">
                Sirvys
              </NavLink>
              {this.props.isLoggedIn ? (
                <button className="logOut" type="button" onClick={this.signOut}>
                  Sign Out
                </button>
              ) : null}
            </div>
            {currentUser ? (
              <span className="user">Hello {currentUser.username}</span>
            ) : null}
          </nav>
        ) : null}
        {this.props.isLoggedIn ? null : (
          <div className="bar">
            {/* <form onSubmit={this.thirdPartySignIn}>
                        <button type='submit' onMouseEnter={() => this.setState({signInMethod : 'google'})}>Login with Google</button>
                        <button type='submit' onMouseEnter={() => this.setState({signInMethod : 'facebook'})}>Login with Facebook</button>
                    </form> */}
            {signingUp ? (
              <SignUp
                email={email}
                password={password}
                confirmPassword={confirmPassword}
                isInvalid={isInvalid}
                onChange={this.onChange}
                setSignInOrSignUp={this.setSignInOrSignUp}
                signInOrSignUp={this.signInOrSignUp}
                error={this.state.error}
                changeSignInAndSignup={this.changeSignInAndSignup}
                signingUp={signingUp}
              />
            ) : (
              <SignIn
                email={email}
                password={password}
                confirmPassword={confirmPassword}
                isInvalid={isInvalid}
                onChange={this.onChange}
                setSignInOrSignUp={this.setSignInOrSignUp}
                signInOrSignUp={this.signInOrSignUp}
                error={this.state.error}
                changeSignInAndSignup={this.changeSignInAndSignup}
                signingUp={signingUp}
              />
            )}
            {error && <span>{error.message}</span>}
          </div>
        )}
      </NavStyle>
    )
  }
}

export default withRouter(Navbar)
