import React, { Component } from "react"
import { PieChart, Pie, Cell } from "recharts"
import html2canvas from "html2canvas"
import { saveAs } from "file-saver"

import { GraphStyle, TitleStyle } from "./style"
import randomColor from "./randomColor"

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

  displaySvg = () => {
    const { optionA, optionB } = this.state
    html2canvas(document.querySelector("#pie-chart-wrapper"), {
      backgroundColor: "#151515"
    }).then(pic =>
      pic.toBlob(blob => saveAs(blob, `${optionA}-${optionB} Sirvy.png`))
    )
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

    const data = [{ value: 100 * aCounter }, { value: 100 * bCounter }]
    const colors = randomColor()

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

    const color1 = colors[0]
    const color2 = colors[1]
    console.log(color1, color2)

    const mappedA = aArray.map(vote => (
      <p style={{ color: color1 } && { color: color1 }}>{vote}</p>
    ))
    const mappedB = bArray.map(vote => (
      <p style={{ color: color2 } && { color: color2 }}>{vote}</p>
    ))

    return (
      <GraphStyle id="pie-chart-wrapper">
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
            <summary
              style={{ color: color1 } && { color: color1 }}
              className={"first-text"}
            >
              {optionA}
            </summary>
            {mappedA}
          </details>
          <details>
            <summary
              style={{ color: color2 } && { color: color2 }}
              className={"second-text"}
            >
              {optionB}
            </summary>
            {mappedB}
          </details>
          <button onClick={this.displaySvg} data-html2canvas-ignore>
            Save Sirvy
          </button>
        </TitleStyle>
      </GraphStyle>
    )
  }
}

export default GraphDisplay
