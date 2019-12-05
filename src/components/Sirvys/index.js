import React, {Component} from 'react';
import {database} from '../../firebase/firebase'

class Sirvys extends Component {

  state = {
    
  }

  sendSmsMessage = async () => {
    const testMessage = {
      body : 'what is to be done',
      to : 'number'
    }
    const test = await fetch(`/send`, {
      method : 'POST',
      body : JSON.stringify(testMessage),
      headers: {
        'Content-Type' : 'application/json'
      }
    })
  }

  componentDidMount() {
    database.ref().set('hi tim')
    this.sendSmsMessage()
  }

  render () {
    return (
      <div>
        <p>this is where all the sirvys appear</p>
      </div>
    )
  }
}

export default Sirvys;