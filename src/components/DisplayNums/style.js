import styled from 'styled-components'

const UlStyle = styled.ul`
    list-style-type : none;
    width : 49vw;
    background-color : #101010;
    border-radius : 10%;
    padding-inline-start : 0;
    padding : .5em 0;

    :hover {
        animation : pulse2s 2s infinite;
    }

    li {
        display : flex;
        justify-content : space-between;
        padding : 0 1em;
    }

    .holder:hover {
        color : #ec4e20;
    }

    @media (max-width: 950px) {

        width : 98vw;

/* 
        li {
            flex-direction : column;
            justify-content : space-evenly;
            margin : .5em 0;
        }

        .holder {
            display : flex;
            flex-direction : column;
            margin : .5em 0;
        }

        .name-and-number {
            text-align : center;
        } */

    }

    @keyframes pulse2s {
  0% {
      transform : scale(0.95);
  }

  70% {
      transform : scale(1);
  }

  100% {
      transform : scale(0.95);
  }
}
`

export {UlStyle}