import React from "react"

import { SavedSirvyStyle } from "./style"

const SavedSirvys = props => {
  const displaySavedSirvys = props.savedSirvys.map((sirvy, i) => {
    return (
      <form>
        <span className="holder">
          {sirvy.sirvy
            .replace(/\n*/g, "")
            .replace(/.*:/, "")
            .replace(/Pl.*/, "")
            .replace(/ +(?= )/g, "")
            .trim()}
        </span>
        <span>
          <button type="button" onClick={() => props.deleteSirvy(sirvy.key)}>
            Delete Sirvy
          </button>
          <button type="button" onClick={() => props.addToCurrentSirvy(i)}>
            Set as Current Sirvy
          </button>
        </span>
      </form>
    )
  })

  return (
    <div>
      <h3>Saved Sirvys</h3>
      <SavedSirvyStyle>{displaySavedSirvys}</SavedSirvyStyle>
    </div>
  )
}

export default SavedSirvys
