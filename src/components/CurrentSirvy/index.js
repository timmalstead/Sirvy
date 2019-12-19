import React from "react"
import { HolderStyle } from "../DisplayNums/style"
import { SavedSirvyStyle } from "../SavedSirvys/style"

const CurrentSirvy = props => {
  const sendUpSirvy = e => {
    e.preventDefault()
    props.sendSirvy()
  }

  const displayCurrentSirvy = props.currentSirvy.map((sirvy, i) => {
    return (
      <form name="sendSaved" onSubmit={e => sendUpSirvy(e)} key={sirvy.key}>
        <span className="holder">
          {sirvy.sirvy
            .replace(/\n*/g, "")
            .replace(/.*:/, "")
            .replace(/Pl.*/, "")
            .replace(/ +(?= )/g, "")
            .trim()}
        </span>
        <span>
          <button type="button" onClick={() => props.removeCurrentSirvy()}>
            Remove Sirvy
          </button>
          <button type="submit">Send Saved Sirvy</button>
        </span>
      </form>
    )
  })

  return (
    <HolderStyle>
      <h3>Current Sirvy</h3>
      <SavedSirvyStyle>{displayCurrentSirvy}</SavedSirvyStyle>
    </HolderStyle>
  )
}

export default CurrentSirvy
