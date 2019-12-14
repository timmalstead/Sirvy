import styled from 'styled-components'

const NavStyle = styled.header`
    
    nav {
        display : flex;
        flex-wrap : wrap;
        justify-content : space-between;
    }
    
    a {
        margin : 0 .5em 0 0;
    }
        
    .logOut {
        background-color : #151515;
        color : #FF9505;
        font-size : .9em;
        font-weight : 100;
        line-height : .2em;
        margin : 0;
        font-family : Georgia, 'Times New Roman', Times, serif;
    }
    
    .bar {
        display : flex;
        flex-wrap : wrap;
        justify-content : flex-end;
    }

    .active {
        color : #EC4E20;
        border-bottom : .2em solid #EC4E20;
    }
    
`

export {NavStyle}