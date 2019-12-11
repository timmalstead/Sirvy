import React from 'react'

import {SavedSirvyStyle} from './style'

const SavedSirvys = props => {
    
    const sendUpSirvy = (e,i) => {
        e.preventDefault()
        props.sendSirvy(e,i)
    }

    const displaySavedSirvys = props.savedSirvys.map( (sirvy, i) => {
        return <form name='sendSaved' onSubmit={e => sendUpSirvy(e, i)} key={sirvy.key}>
                  <span className='holder'>{sirvy.sirvy.replace(/\n*/g,'').replace(/.*:/,'').replace(/Pl.*/,'').replace(/ +(?= )/g,'').trim()}</span>
                  <span>
                    <button type='button' onClick={() => props.deleteSirvy(sirvy.key)}>Delete Sirvy</button>
                    <button type='submit'>Send Saved Sirvy</button>
                  </span>
               </form>
      })
    return(
        <div>
            <h3>Saved Sirvys</h3>
            <SavedSirvyStyle>
                {displaySavedSirvys}
            </SavedSirvyStyle>
        </div>
    )
}

export default SavedSirvys