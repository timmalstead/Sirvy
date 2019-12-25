import styled from "styled-components"

const NavStyle = styled.header`
  nav {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
  }

  a {
    margin: 0 0.5em 0 0;
  }
  img {
    display: inline;
  }

  .logOut {
    background-color: #151515;
    color: #ff9505;
    font-size: 0.9em;
    font-weight: 100;
    line-height: 0.2em;
    margin: 0;
    font-family: Georgia, "Times New Roman", Times, serif;
  }

  .bar {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
  }

  .active {
    color: #ec4e20;
    border-bottom: 0.2em solid #ec4e20;
  }

  @media (max-width: 1100px) {
    nav,
    .bar {
      display: flex;
      flex-direction: column;
    }
  }
`

export { NavStyle }
