import React from "react"
import { UlStyle, HolderStyle } from "../DisplayNums/style"

const CurrentNums = props => {
  const nums = props.activeNumbers.map((num, i) => (
    <li key={i}>
      <span className="holder">
        <span className="name-and-number">{num.name}</span>
      </span>
      <button type="button" onClick={() => props.removeFromCurrentNum(i)}>
        Remove
      </button>
    </li>
  ))

  return (
    <HolderStyle>
      <h3>Current Sirvy Recipients</h3>
      <UlStyle>{nums}</UlStyle>
    </HolderStyle>
  )
}

export default CurrentNums
