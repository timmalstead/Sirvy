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
    returnedTexts : [],
    optionA : '',
    optionB : ''
  }

  populateBodyOfText = () => this.setState({
    textBody : 
    `Hello *MESSAGE RECIPIENT*,
    ${this.props.currentUser.username} would like to ask you a question:

    Do you prefer

    a) ${this.state.optionA}

    or

    b) ${this.state.optionB}?

    Please reply a or b.
    Sent from Sirvy: Beautiful SMS Surveys`
  })
  
  onChange = e => {
    e.persist()
    this.setState({[e.target.name]: e.target.value}, () => {
      if (e.target.name === 'optionA' || e.target.name === 'optionB') {
        this.populateBodyOfText()
      }
    })
  }

  sendSmsMessage = async (e) => {
    e.preventDefault()
    this.populateBodyOfText()
    const numbers = this.state.numbersToText.map(recipient => `1${recipient.number}`)

    const message = {
      body : this.state.textBody,
      to : numbers
    }
    const sending = await fetch(`/send`, {
      method : 'POST',
      body : JSON.stringify(message),
      headers: {
        'Content-Type' : 'application/json',
      }
    })
    
    const sent = await sending.json()
    console.log(sent)
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
    const {currentNumToText, returnedTexts, numbersToText, nameToText, error, optionA, optionB} = this.state
    const {currentUser} = this.props
    return (
      <div>
        <form onSubmit={this.sendSmsMessage}>
          <p>Your Sirvy will look like this:</p>
          <p>
            Hello *MESSAGE RECIPIENT*, {currentUser.username} would like to ask you a question: do you prefer
          </p>
          <span> a)</span>
          <input type='text' name='optionA' value={optionA} placeholder="First Option Here" onChange={this.onChange}/>
          <span> or b)</span>
          <input type='text' name='optionB' value={optionB} placeholder="Second Option Here" onChange={this.onChange}/>
          <span>?</span>
          <p>Please reply a or b.</p>
          <p>Sent from Sirvy: Beautiful SMS Surveys</p>
          <button type='submit'>Send Sirvy</button>
        </form>
        <form onSubmit={this.addSirvyRecipient}>
          <input type='text' name='nameToText' value={nameToText} placeholder="Add Sirvy Recipient" onChange={this.onChange} />
          <input type='text' name='currentNumToText' value={currentNumToText} placeholder="Enter 10 Digit Phone Number" onChange={this.onChange}/>
          <button type='submit'>Add Sirvy Recipient</button>
        </form>
        {/* {returnedTexts.length ? <h3>{returnedTexts[returnedTexts.length - 1].returningText}</h3> : null} */}
        {returnedTexts.length ? 
          returnedTexts.map( text => <p>{text.returningText}</p> )
        : 
          null}
        {error ? <p>{error}</p> : null}
        <DisplayNums numbersToText={numbersToText} deleteNumber={this.deleteNumber}/>
      </div>
    )
  }
}

export default Sirvys