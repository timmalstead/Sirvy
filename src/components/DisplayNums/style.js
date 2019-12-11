import styled from 'styled-components'

const UlStyle = styled.ul`
    list-style-type : none;
    width : 49vw;
    background-color : #2d2d2d;
    color : #6c6c6c;
    padding-inline-start : 0;
    padding : .5em 0;

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

    @media (max-width: 950px) {

        width : 96vw;

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

export {UlStyle}