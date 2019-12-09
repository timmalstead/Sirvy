import React, {Component} from 'react';
import SocketIOClient from 'socket.io-client'
import {database} from '../../firebase/firebase'

import DisplayNums from '../DisplayNums'

class Sirvys extends Component {

  state = {
    error : '',
    textBody : '',
    currentNumToText : '',
    nameToText : '',
    numbersToText : [],
    returnedTexts : []
  }

  onChange = e => this.setState({[e.target.name]: e.target.value})

  sendSmsMessage = async (e) => {
    e.preventDefault()
    // const message = {
    //   body : this.state.textBody,
    //   to : `+1${this.state.numbersToText}`
    // }
    const message = {
      body : this.state.textBody,
      to : this.state.numbersToText
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

  addSirvyRecipient = (e) => {
    const {nameToText, currentNumToText} = this.state
    e.preventDefault()
    if (nameToText && currentNumToText) {
      const sirvyRecipient = {
        name : nameToText,
        number : currentNumToText
      }
      database.ref(`numbers/${this.props.currentUser.uid}`).push(sirvyRecipient)
        .catch(error => this.setState({error}))
      this.setState({
        currentNumToText : '',
        nameToText : '',
        error : ''
      })
    } else {
      this.setState({
        error : 'Sirvy Recipient and Phone # Must BOTH Be Entered'
      })
    }
  }
  
  deleteNumber = (key) => {
    database.ref(`numbers/${this.props.currentUser.uid}/${key}`).remove()
  }

  componentDidMount() {
    const {numbersToText} = this.state

    const socket =SocketIOClient(process.env.REACT_APP_URL)

    socket.on('sms', data =>  this.setState({
      returnedTexts : data.data
    }))

    database.ref(`numbers/${this.props.currentUser.uid}`).on('value', snapshot => {
        const data = snapshot.val()
        delete data.initialize
        const helperArray = []
        for (const num in data) {
          helperArray.push(data[num])
        }
        Object.keys(data).forEach( (key, i) => helperArray[i].key = key)
        this.setState({
          numbersToText : [...numbersToText, ...helperArray]
        })
      } 
    )

  }

  render () {
    const {textBody, currentNumToText, returnedTexts, numbersToText, nameToText, error} = this.state
    return (
      <div>
        <form onSubmit={this.sendSmsMessage}>
          <input type='text' name='textBody' value={textBody} placeholder="Text body here" onChange={this.onChange}/>
          <button type='submit'>Send Sirvy</button>
        </form>
        <form onSubmit={this.addSirvyRecipient}>
          <input type='text' name='nameToText' value={nameToText} placeholder="Sirvy Recipient" onChange={this.onChange} />
          <input type='text' name='currentNumToText' value={currentNumToText} placeholder="Enter 10 Digit Phone Number" onChange={this.onChange}/>
          <button type='submit'>Add Sirvy Recipient</button>
        </form>
        {returnedTexts.length ? <h3>{returnedTexts[returnedTexts.length - 1].returningText}</h3> : null}
        {error ? <p>{error}</p> : null}
        <DisplayNums numbersToText={numbersToText} deleteNumber={this.deleteNumber}/>
      </div>
    )
  }
}

export default Sirvys