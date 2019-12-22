import React from "react"
import { UlStyle, HolderStyle } from "./style"

const DisplayNums = props => {
  const nums = props.numbersToText.map((num, i) => (
    <li key={i}>
      <span className="holder">
        <span className="name-and-number">{num.name}</span>
        <span className="name-and-number"> - </span>
        <span className="name-and-number">{num.number}</span>
      </span>
      <span>
        <button type="button" onClick={() => props.deleteNumber(num.key)}>
          Delete
        </button>
        <button type="button" onClick={() => props.addCurrentNum(i)}>
          Add to Current Sirvy
        </button>
      </span>
    </li>
  ))

  return (
    <HolderStyle>
      <h3>Saved Recipients</h3>
      <UlStyle>{nums}</UlStyle>
    </HolderStyle>
  )
}

export default DisplayNums
