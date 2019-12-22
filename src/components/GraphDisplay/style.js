import styled from "styled-components"

const GraphStyle = styled.div`
  display: flex;
  justify-content: space-between;

  PieChart {
    width: 75%;
    height: auto;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  div {
    display: inherit;
    justify-content: inherit;
  }
`

const TitleStyle = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;

  .first-text,
  .second-text {
    font-size: 3em;
  }

  .second-text {
    margin: 0 0 0 1em;
  }
`

export { GraphStyle, TitleStyle }
