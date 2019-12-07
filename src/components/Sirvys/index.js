import React, {Component} from 'react';
// import {database} from '../../firebase/firebase'
import SocketIOClient from 'socket.io-client'

class Sirvys extends Component {

  state = {
    textBody : '',
    numberToText : '',
    numberOfTextsToReturn : 0,
    returnedTexts : []
  }

  onChange = e => this.setState({[e.target.name]: e.target.value})

  sendSmsMessage = async (e) => {
    e.preventDefault()
    this.setState({
      numberOfTextsToReturn : this.state.numberOfTextsToReturn+1
    })
    const message = {
      body : this.state.textBody,
      to : `+1${this.state.numberToText}`
    }
    await fetch(`/send`, {
      method : 'POST',
      body : JSON.stringify(message),
      headers: {
        'Content-Type' : 'application/json',
      }
    })
    console.log(message)
  }

  componentDidMount() {
    // database.ref().set('hi tim')
    const socket =SocketIOClient(process.env.REACT_APP_URL)
    socket.on('sms', data =>  this.setState({
      returnedTexts : data.data
    }))
  }

  render () {
    const {textBody, numberToText, returnedTexts} = this.state
    return (
      <div>
        <form onSubmit={this.sendSmsMessage}>
          <input type='text' name='textBody' value={textBody} placeholder="Text body here" onChange={this.onChange}/>
          <input type='text' name='numberToText' value={numberToText} placeholder="Enter 10 Digit Phone Number" onChange={this.onChange}/>
          <button type='submit'>Send Text</button>
        </form>
        {returnedTexts.length ? <h3>{returnedTexts[returnedTexts.length - 1].returningText}</h3> : null}
      </div>
    )
  }
}

export default Sirvys;