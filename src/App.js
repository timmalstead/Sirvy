import React, {Component} from 'react';
import {Route, Switch, withRouter} from 'react-router-dom'

import './App.css';

import Navbar from './components/Navbar'
import Profile from './components/Profile'
import Sirvys from './components/Sirvys'
import Footer from './components/Footer'

import {database, signOut, auth} from './firebase/firebase'

class App extends Component {
  
  state = {
    isLoggedIn : false,
    currentUser : null,
  }

  // logInUser = async (currentUser) => {
  //   await database.ref('/users/').once('value', snapshot => {
  //     const usersArray = []
  //     // snapshot.forEach(childShapShot => usersArray.push({dbId : childShapShot.key ,...childShapShot.val()}))
  //     snapshot.forEach(childShapShot => usersArray.push({...childShapShot.exportVal()}))
  //     console.log(usersArray)
  //   })
  // }
  //   // const findUser = usersArray.indexOf(Object.values().includes(currentUser.uid))
  //   // const findUser = usersArray.filter(userToFind => userToFind.uid === currentUser.uid)
  //   // usersArray.forEach(obj => console.log(obj))
  //   // console.log(findUser, usersArray)

  // signUpUser = async currentUser => {
  //   // const userToInsert = []
  //   // await database.ref('users').push(currentUser).then(pushedUser => userToInsert.push(pushedUser.key))
  //   let userToInsert = undefined
  //   await database.ref('users').push(currentUser).then(pushedUser => userToInsert= pushedUser.key)
  //   this.setState({
  //     isLoggedIn : true,
  //     currentUser : {dbId : userToInsert, ...currentUser}
  //   })
  // }

   logInUser = async (currentUser) => {
    await database.ref(`users/${currentUser.uid}`).once('value', snapshot => {
      const userToLogin = snapshot.val()
      this.setState({
        isLoggedIn : true,
        currentUser : {...userToLogin}
      })
    })
  }

  signUpUser = async currentUser => {
    await database.ref(`users/${currentUser.uid}`).set(currentUser)
    this.setState({
      isLoggedIn : true,
      currentUser : {...currentUser}
    })
  }

  changeUsername = username => {
    const {currentUser} = this.state
    this.setState({
      currentUser : {...currentUser, username}
    })
    const userReq = database.ref(`users/${currentUser.uid}`)
    userReq.update({
      username : username
    })
  }

  deleteUser = () => {
    const userToDelete = database.ref(`users/${this.state.currentUser.uid}`)
    userToDelete.remove().catch( err => console.log(err))
    this.setState({
      isLoggedIn : false,
      currentUser : null
    })
    const user = auth.currentUser
    user.delete().catch(err => console.log(err))
    signOut()
    this.props.history.push('/')
  }

  logOutUser = () => {
    this.setState({
      isLoggedIn : false,
      currentUser : null
    })
  }

  render () {
    const {isLoggedIn, currentUser} = this.state
    return (
      <main>
        <Navbar 
          isLoggedIn={isLoggedIn} 
          currentUser={currentUser} 
          logInUser={this.logInUser}
          signUpUser={this.signUpUser} 
          logOutUser={this.logOutUser}
        />
        <Switch>
          {isLoggedIn ? 
          <Route 
            exact path = '/profile' 
            render={() => 
            <Profile 
              isLoggedIn={isLoggedIn} 
              currentUser={currentUser}
              changeUsername={this.changeUsername}
              deleteUser={this.deleteUser}
              logOutUser={this.logOutUser}
            />}
          />
          : null}
          {isLoggedIn ? 
          <Route 
            exact path = '/sirvys' 
            render={() => 
            <Sirvys 
              isLoggedIn={isLoggedIn} 
              currentUser={currentUser}
            />}
          /> 
          : null}
        </Switch>
        <Footer />
      </main>
    )
  }
}

export default withRouter(App)