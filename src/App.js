import React, {Component} from 'react';
import {Route, Switch} from 'react-router-dom'
// import SocketIOClient from 'socket.io-client'

import './App.css';

import Navbar from './components/Navbar'
import Profile from './components/Profile'
import Sirvys from './components/Sirvys'
import Footer from './components/Footer'

import {database} from './firebase/firebase'

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

  logOutUser = () => {
    this.setState({
      isLoggedIn : false,
      currentUser : null
    })
  }

  componentDidMount() {
    // const socket =SocketIOClient(process.env.REACT_APP_URL)
    // socket.on('sms', data => console.log(data))
  }
  render () {
    return (
      <main>
        <Navbar 
          isLoggedIn={this.state.isLoggedIn} 
          currentUser={this.state.currentUser} 
          logInUser={this.logInUser}
          signUpUser={this.signUpUser} 
          logOutUser={this.logOutUser}
        />
        <Switch>
          {this.state.isLoggedIn ? 
          <Route exact path = '/profile' render={() => <Profile isLoggedIn={this.state.isLoggedIn}/>} />
          : null}
          {this.state.isLoggedIn ? 
          <Route exact path = '/sirvys' render={() => <Sirvys isLoggedIn={this.state.isLoggedIn}/>} />
          : null}
        </Switch>
        <Footer />
      </main>
    )
  }
}

export default App;