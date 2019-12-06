import React, {Component} from 'react';
import {database} from '../../firebase/firebase'
import SocketIOClient from 'socket.io-client'

class Sirvys extends Component {

  state = {
    textBody : '',
    numberToText : '',
    numberOfTextsToReturn : 0,
    returnedTexts : []
  }

  onChange = e => this.setState({[e.target.name]: e.target.value})
  
  // getSirvyResponses = async () => {
  //   const textArray = await (await fetch(`/recieve`)).json()
  //   console.log(textArray)
  // }

  // otherGetSirvyResponses = async () => {
  //   if (this.state.numberOfTextsToReturn === this.state.returnedTexts.length) {
  //       console.log(this.state.returnedTexts)
  //       return
  //     } else {
  //     const textArray = await (await fetch(`/recieve`)).json()
  //     this.setState({
  //       returnedTexts : [...textArray]
  //     })
  //   }
  //    return setTimeout(() => this.otherGetSirvyResponses(), 5000)
  // }

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
        'Content-Type' : 'application/json'
      }
    })
    // this.otherGetSirvyResponses()
    console.log(message)
  }

  // textListener = new EventSource('/sms', {withCredentials: true}, {proxy: 'http://localhost:8049'})

  componentDidMount() {
    // database.ref().set('hi tim')
    // this.textListener.onmessage = e => console.log(e)
    const socket =SocketIOClient(process.env.REACT_APP_URL)
    socket.on('sms', data => console.log(data))
  }

  render () {
    const {textBody, numberToText} = this.state
    return (
      <div>
        <form onSubmit={this.sendSmsMessage}>
          <input type='text' name='textBody' value={textBody} placeholder="Text body here" onChange={this.onChange}/>
          <input type='text' name='numberToText' value={numberToText} placeholder="Enter 10 Digit Phone Number" onChange={this.onChange}/>
          <button type='submit'>Send Text</button>
        </form>
        {/* <p>this is where all the sirvys appear</p> */}
        <button type='button' onClick={this.getSirvyResponses}>Get Messages</button>
      </div>
    )
  }
}

export default Sirvys;