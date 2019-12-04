import React, {Component} from 'react';

class Profile extends Component {

  getUser = async () => {
    const test = await (await fetch(`/test`)).json()
    console.log(test)
  }

  componentDidMount () {
    this.getUser()
  }

  render () {
    return (
      <div>
        <p>i'm a user profile</p>
      </div>
    )
  }
}

export default Profile;