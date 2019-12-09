import React from 'react'

const DisplayNums = props => {

    const nums = props.numbersToText.map( (num, i) =>
        <div key={i}>
            <span>{num.name}</span>
            <span>{num.number}</span>
            <button type='button' onClick={() => props.deleteNumber(num.key)}>Delete Number</button>
        </div>
    )

    return(
        <div>
            {nums}
        </div>
    )
}

export default DisplayNums