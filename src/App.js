import React, {Component} from 'react';
import {Route, Switch} from 'react-router-dom'

import './App.css';

import Navbar from './components/Navbar'
import Profile from './components/Profile'
import Sirvys from './components/Sirvys'
import Footer from './components/Footer'

class App extends Component {

  state = {
    isLoggedIn : false,
    currentUser : null
  }

  logInUser = currentUser => {
    this.setState({
      isLoggedIn : true,
      currentUser
    })
  }

  render () {
    return (
      <main>
        <Navbar isLoggedIn={this.state.isLoggedIn} logInUser={this.logInUser}/>
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