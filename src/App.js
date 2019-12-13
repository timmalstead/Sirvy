import React, {Component} from 'react';
import {Route, Switch, withRouter} from 'react-router-dom'

import './App.css';
import {AppStyle} from './style'

import Navbar from './components/Navbar'
import SplashPage from './components/SplashPage'
import Profile from './components/Profile'
import Sirvys from './components/Sirvys'
import Footer from './components/Footer'

import {database, signOut, auth} from './firebase/firebase'

class App extends Component {
  
  state = {
    isLoggedIn : false,
    currentUser : null,
  }

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
    await database.ref(`numbers/${currentUser.uid}`).set({initialize : currentUser.uid})
    await database.ref(`sirvys/${currentUser.uid}`).set({initialize : currentUser.uid})
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
    const userNumbersToDelete = database.ref(`numbers/${this.state.currentUser.uid}`)
    const userSirvysToDelete = database.ref(`sirvys/${this.state.currentUser.uid}`)
    userToDelete.remove().catch( err => console.log(err))
    userNumbersToDelete.remove().catch( err => console.log(err))
    userSirvysToDelete.remove().catch( err => console.log(err))
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
    console.log(process.env)
    const {isLoggedIn, currentUser} = this.state
    return (
      <AppStyle>
        <Navbar 
          isLoggedIn={isLoggedIn} 
          currentUser={currentUser} 
          logInUser={this.logInUser}
          signUpUser={this.signUpUser} 
          logOutUser={this.logOutUser}
        />
        <Switch>
          <Route 
            exact path ='/'
            render={() =>
            <SplashPage 
            />}
          />
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
          : <SplashPage />}
          {isLoggedIn ? 
          <Route 
            exact path = '/sirvys' 
            render={() => 
            <Sirvys 
              isLoggedIn={isLoggedIn} 
              currentUser={currentUser}
            />}
          /> 
          : <SplashPage/>}
        </Switch>
        <Footer />
      </AppStyle>
    )
  }
}

export default withRouter(App)