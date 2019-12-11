import styled from 'styled-components'

const GraphStyle = styled.div`

    display : flex;
    justify-content : space-between;

    PieChart {
        width : 75%;
        height : auto;
        display : flex;
        justify-content : center;
        align-items : center;
    }

    div {
        display : inherit;
        justify-content : inherit;
    }
`

const TitleStyle = styled.div`
    display : flex;
    justify-content : flex-start;
    align-items : center;

    .blue-text, .yellow-text {
        font-size : 5em;
    }

    .blue-text {
        color : #0088fe;
    }

    .yellow-text {
        color : #dbcc66;
        margin : 0 0 0 1em;
    }
`

export {GraphStyle, TitleStyle}