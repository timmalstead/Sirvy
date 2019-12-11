import React, {Component} from 'react';
import SocketIOClient from 'socket.io-client'
import {database} from '../../firebase/firebase'

import DisplayNums from '../DisplayNums'
import GraphDisplay from '../GraphDisplay'

import {SirvyStyle} from './style'

class Sirvys extends Component {

  state = {
    error : '',
    textBody : '',
    currentNumToText : '',
    nameToText : '',
    numbersToText : [],
    returnedTexts : [],
    optionA : '',
    optionB : '',
    savedSirvys : [],
    sirvyToRender : undefined
  }

  populateBodyOfText = () => this.setState({
    textBody : 
    `Hello MESSAGE RECIPIENT
    ${this.props.currentUser.username} would like to ask you a question:

    Do you prefer

    a) ${this.state.optionA}

    or

    b) ${this.state.optionB}?

    Please reply ONLY with a lowercase a or b.
    Sent from Sirvy-Beautiful SMS Surveys`
  })
  
  onChange = e => {
    e.persist()
    this.setState({[e.target.name]: e.target.value}, () => {
      if (e.target.name === 'optionA' || e.target.name === 'optionB') {
        this.populateBodyOfText()
      }
    })
  }
  
  sendSirvy = async (e, i) => {
    e.preventDefault()

    const numbers = this.state.numbersToText.map(recipientNum => `1${recipientNum.number}`)
    const names = this.state.numbersToText.map(names => names.name)
    
    const message = {
      names : names,
      body : e.target.name ? this.state.savedSirvys[i].sirvy : this.state.textBody,
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
    this.setState({
      returnedTexts : [],
      sirvyToRender : message.body.replace(/\n*/g,'').replace(/.*:/,'').replace(/Pl.*/,'').replace(/ +(?= )/g,'').trim(),
      optionA : '',
      optionB : '',
    })
  } 

  saveSirvy = () => {
    database.ref(`sirvys/${this.props.currentUser.uid}`).push(this.state.textBody)
      .catch(error => this.setState({error}))
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

  deleteSirvy = (key) => {
    database.ref(`sirvys/${this.props.currentUser.uid}/${key}`).remove()
  }

  componentDidMount() {
    const {numbersToText, savedSirvys} = this.state

    const socket =SocketIOClient(process.env.REACT_APP_URL)

    socket.on('sms', data => {
      this.setState({
        returnedTexts : data.data
      })
    })

    database.ref(`numbers/${this.props.currentUser.uid}`).on('value', snapshot => {
        const data = snapshot.val()
        if (data.initialize) {
          delete data.initialize
        }
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
    
    database.ref(`sirvys/${this.props.currentUser.uid}`).on('value', snapshot => {
      const data = snapshot.val()
      if (data.initialize) {
        delete data.initialize
      }
      const helperArray = []
      for (const sirvy in data) {
        helperArray.push({sirvy : data[sirvy]})
      }
      Object.keys(data).forEach( (key, i) => helperArray[i].key = key)
      this.setState({
        savedSirvys : [...savedSirvys, ...helperArray]
      })
    })

  }

  render () {
    const {currentNumToText, returnedTexts, numbersToText, nameToText, error, optionA, optionB, savedSirvys, sirvyToRender} = this.state
    const {currentUser} = this.props
    return (
      <SirvyStyle>
        <form onSubmit={this.sendSirvy}>
          <p>Your Sirvy will look like this:</p>
          <p>Hello MESSAGE RECIPIENT</p>
          <p>{currentUser.username} would like to ask you a question: do you prefer</p>
          <span> a)</span>
          <input type='text' name='optionA' value={optionA} placeholder="First Option Here" onChange={this.onChange}/>
          <span> or b)</span>
          <input type='text' name='optionB' value={optionB} placeholder="Second Option Here" onChange={this.onChange}/>
          <span>?</span>
          <p>Please reply ONLY with a lowercase a or b.</p>
          <p>Sent from Sirvy-Beautiful SMS Surveys</p>
          <button type='submit'>Send Sirvy</button>
          <button type='button' onClick={this.saveSirvy}>Save Sirvy</button>
        </form>
        <form onSubmit={this.addSirvyRecipient}>
          <input type='text' name='nameToText' value={nameToText} placeholder="Add Sirvy Recipient" onChange={this.onChange} />
          <input type='text' name='currentNumToText' value={currentNumToText} placeholder="Enter 10 Digit Phone Number" onChange={this.onChange}/>
          <button type='submit'>Add Sirvy Recipient</button>
        </form>
        {/* {returnedTexts ? 
          returnedTexts.map( text => <p>{text.returningText}</p> )
        : 
          null} */}
        {error ? <p>{error}</p> : null}
        <DisplayNums numbersToText={numbersToText} deleteNumber={this.deleteNumber}/>
        {savedSirvys ?
          savedSirvys.map( (sirvy, i) => {
            return <form name='sendSaved' onSubmit={e => this.sendSirvy(e, i)} key={sirvy.key}>
                      <span>{sirvy.sirvy.replace(/\n*/g,'').replace(/.*:/,'').replace(/Pl.*/,'').replace(/ +(?= )/g,'').trim()}</span>
                      <button type='button' onClick={() => this.deleteSirvy(sirvy.key)}>Delete Sirvy</button>
                      <button type='submit'>Send Saved Sirvy</button>
                   </form>
          })
        :
          null
        }
        {returnedTexts.length >= numbersToText.length && returnedTexts.length ? 
          <GraphDisplay sirvyToRender={sirvyToRender} returnedTexts={returnedTexts}/>
        : 
          null
        }
      </SirvyStyle>
    )
  }
}

export default Sirvys