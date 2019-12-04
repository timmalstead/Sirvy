import React, {Component} from 'react';
import {Route, Switch} from 'react-router-dom'

import './App.css';

import Navbar from './components/Navbar'
import Profile from './components/Profile'
import Sirvys from './components/Sirvys'
import Footer from './components/Footer'

class App extends Component {

  state = {
    isLoggedIn : false
  }

  logInUser = () => {
    this.setState({
      isLoggedIn : true
    })
  }

  componentDidMount () {
    // console.log(process.env)
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