import React, { Component } from "react"
import { withRouter } from "react-router-dom"
import { passwordReset, signOut } from "../../firebase/firebase"
import { ProfileStyle } from "./style"

class Profile extends Component {
  state = {
    tempUserName: ""
  }

  onChange = e =>
    this.setState({
      [e.target.name]: e.target.value
    })

  handleChange = e => {
    e.preventDefault()
    this.props.changeUsername(this.state.tempUserName)
  }

  passwordResetEmail = () => {
    passwordReset(this.props.currentUser.email)
    signOut()
    this.props.logOutUser()
    this.props.history.push("/")
  }

  render() {
    const { username, email, signInMethod } = this.props.currentUser
    const { tempUserName } = this.state
    return (
      <ProfileStyle>
        <h3>User Profile</h3>
        <span>User Email : {email}</span>
        {signInMethod === "signUp" ? (
          <button type="button" onClick={this.passwordResetEmail}>
            Send Password Reset Email and Logout
          </button>
        ) : null}
        <form onSubmit={this.handleChange}>
          <span>Change Username : </span>
          <input
            type="text"
            name="tempUserName"
            value={tempUserName}
            placeholder={username}
            onChange={this.onChange}
          />
          <button type="submit">Change Username</button>
          <button type="button" onClick={this.props.deleteUser}>
            Delete User
          </button>
        </form>
      </ProfileStyle>
    )
  }
}

export default withRouter(Profile)
