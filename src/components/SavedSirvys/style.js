import styled from 'styled-components'

const SavedSirvyStyle = styled.div`
    width : 48vw;
    background-color : #2d2d2d;
    color : #6c6c6c;
    padding : .5em 0;
    min-height : 5em;

    :hover {
        animation : pulse2s 2s infinite;
    }

    form {
        display : flex;
        flex-wrap : wrap;
        justify-content : space-between;
        padding : 0 1em;
    }

    .holder:hover {
        color : #ec4e20;
    }

    @media (max-width: 950px) {
        
        width : 96vw;
    
    }

    @media (max-width: 750px) {
        
        form {
            flex-direction : column;
            align-items : center;
        }
    
    }
    
    @keyframes pulse2s {
  0% {
      transform : scale(0.98);
  }

  70% {
      transform : scale(1);
  }

  100% {
      transform : scale(0.98);
  }
}
`

export {SavedSirvyStyle}