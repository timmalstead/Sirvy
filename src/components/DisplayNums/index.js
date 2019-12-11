import React from 'react'
import {UlStyle} from './style'

const DisplayNums = props => {

    const nums = props.numbersToText.map( (num, i) =>
        <li key={i}>
            <span className='holder'>
                <span className='name-and-number'>{num.name}</span>
                <span className='name-and-number'>-</span>
                <span className='name-and-number'>{num.number}</span>
            </span>
            <button type='button' onClick={() => props.deleteNumber(num.key)}>Delete Number</button>
        </li>
    )

    return(
        <UlStyle>
            {nums}
        </UlStyle>
    )
}

export default DisplayNums