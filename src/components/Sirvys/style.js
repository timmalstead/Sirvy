import styled from 'styled-components'

const SirvyStyle = styled.div`
    width : 100%;
    display : flex;
    flex-direction : column;
    align-items : center;
`

// remember to add column media query and 950px

const SavingStyles = styled.div`
    display : flex;
    justify-content : space-between;

    @media (max-width: 950px) {
        
        flex-direction : column;
    
    }
`
export {SirvyStyle, SavingStyles}