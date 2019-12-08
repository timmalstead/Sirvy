import React, {Component} from 'react';

class Profile extends Component {

  state = {
    tempUserName : ''
  }

  // componentDidMount() {
  //   this.setState({
  //     tempUserName : this.props.currentUser.username
  //   })
  // }

  onChange = e => 
    this.setState({
      [e.target.name] : e.target.value
    })

  handleChange = e => {
    e.preventDefault()
    this.props.changeUsername(this.state.tempUserName)
  }

  render () {
    const {username, email, signInMethod} = this.props.currentUser
    const {tempUserName} = this.state
    return (
      <div>
        <p>{signInMethod}</p>
        <p>{email}</p>
        <form onSubmit={this.handleChange}>
          <span>Change Username</span>
          <input type='text' name='tempUserName' value={tempUserName} placeholder={username} onChange={this.onChange}/>
          <button type='submit'>Change Username</button>
        </form>
      </div>
    )
  }
}

export default Profile;