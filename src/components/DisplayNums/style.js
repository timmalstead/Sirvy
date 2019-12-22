import styled from "styled-components"

const HolderStyle = styled.div`
  width: 48vw;

  @media (max-width: 950px) {
    width: 96vw;
  }
`

const UlStyle = styled.ul`
    padding : .5em 0;
    list-style-type : none;
    width : 100%;
    background-color : #2d2d2d;
    color : #6c6c6c;
    min-height : 5em;

    :hover {
        animation : pulse2s 2s infinite;
    }

    li {
        display : flex;
        flex-wrap : wrap;
        justify-content : space-between;
        padding : 0 1em;
    }

    .holder:hover {
        color : #ec4e20;
    }

    @media (max-width: 750px) {
        
        li {
            flex-direction : column;
            align-items : center;
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

export { UlStyle, HolderStyle }
