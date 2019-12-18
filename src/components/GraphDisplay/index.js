import React, { Component } from "react"
import { PieChart, Pie, Cell } from "recharts"

import { GraphStyle, TitleStyle } from "./style"

class GraphDisplay extends Component {
  state = {
    optionA: "",
    optionB: "",
    data: [],
    colors: [],
    renderCustomizedLabel: undefined,
    aArray: [],
    bArray: []
  }

  componentDidMount() {
    const { sirvyToRender } = this.props

    if (sirvyToRender) {
      const optionA = sirvyToRender
        .replace(/.*a\)/, "")
        .replace(/or.*/, "")
        .trim()
      const optionB = sirvyToRender
        .replace(/.*b\)/, "")
        .replace(/\?.*/, "")
        .trim()
      this.setState({
        optionA,
        optionB
      })
    }

    let aCounter = 0
    let bCounter = 0
    const aArray = []
    const bArray = []

    this.props.returnedTexts.forEach(count => {
      count.returningText === "a" ? aCounter++ : bCounter++
      count.returningText === "a"
        ? aArray.push(count.name)
        : bArray.push(count.name)
    })

    console.log(aArray, bArray)

    const data = [{ value: 100 * aCounter }, { value: 100 * bCounter }]
    const colors = ["#0088fe", "#dbcc66"]

    const radian = Math.PI / 180

    const renderCustomizedLabel = ({
      cx,
      cy,
      midAngle,
      innerRadius,
      outerRadius,
      percent,
      index
    }) => {
      const radius = innerRadius + (outerRadius - innerRadius) * 0.5
      const x = cx + radius * Math.cos(-midAngle * radian)
      const y = cy + radius * Math.sin(-midAngle * radian)

      return (
        <text
          x={x}
          y={y}
          fill="white"
          textAnchor={x > cx ? "start" : "end"}
          dominantBaseline="central"
        >
          {`${(percent * 100).toFixed(0)}%`}
        </text>
      )
    }

    this.setState({
      data,
      colors,
      renderCustomizedLabel,
      aArray,
      bArray
    })
  }

  render() {
    const {
      optionA,
      optionB,
      data,
      colors,
      renderCustomizedLabel,
      aArray,
      bArray
    } = this.state

    const mappedA = aArray.map(vote => <p>{vote}</p>)
    const mappedB = bArray.map(vote => <p>{vote}</p>)

    return (
      <GraphStyle>
        <PieChart width={700} height={700} onMouseEnter={this.onPieEnter}>
          <Pie
            data={data}
            cx={350}
            cy={350}
            labelLine={false}
            label={renderCustomizedLabel}
            outerRadius={300}
            fill="#8884d8"
          >
            {data.map((entry, index) => (
              <Cell fill={colors[index % colors.length]} />
            ))}
          </Pie>
        </PieChart>
        <TitleStyle>
          <details>
            <summary className={"blue-text"}>{optionA}</summary>
            {mappedA}
          </details>
          <details>
            <summary className={"yellow-text"}>{optionB}</summary>
            {mappedB}
          </details>
        </TitleStyle>
      </GraphStyle>
    )
  }
}

export default GraphDisplay
