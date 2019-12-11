import React from 'react'

import {FooterStyle} from './style'

const Footer = () => {
    
    const random = Math.floor(Math.random() * 5)
    const pickRandom = (random) => {
        switch (random) {
            case 0 : return 'Amuse your friends, terrify your enemies'
            case 1 : return 'Because people deserve to know'
            case 2 : return 'Send sirvys all day, party all night'
            case 3 : return 'Just call me the chief sirvyor'
            default : return 'The only data you can trust'
        }
    }

    const pickQuote = pickRandom(random)

    return (
        <FooterStyle>
            <aside>{pickQuote}</aside>
            <aside>&copy; 2019-2020 Timothy Malstead</aside>
        </FooterStyle>
    )
}

export default Footer