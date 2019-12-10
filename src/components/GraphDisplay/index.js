import React, { Component } from 'react'
import {PieChart, Pie, Cell} from 'recharts'

// const data = [{name: 'Group A', value: 400}, {name: 'Group B', value: 300},
//                   {name: 'Group C', value: 300}, {name: 'Group D', value: 200}]
// const colors = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042']

// let aCounter = 0
// let bCounter = 0


// this.props.returnedTexts.forEach( count => 
//     count.returningText === 'a' ? aCounter++ : bCounter++
// )

// console.log(aCounter,'-',bCounter)

// const data = [{value: 100}, {value: 100}]
// const colors = ['#0088fe', '#dbcc66']

// const radian = Math.PI / 180

// const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
//  	const radius = innerRadius + (outerRadius - innerRadius) * 0.5
//   const x  = cx + radius * Math.cos(-midAngle * radian)
//   const y = cy  + radius * Math.sin(-midAngle * radian)
 
//   return (
//     <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} 	dominantBaseline="central">
//     	{`${(percent * 100).toFixed(0)}%`}
//     </text>
//   )
// }

class GraphDisplay extends Component {
    state = {
        optionA : '',
        optionB : '',
        data : [],
        colors : [],
        renderCustomizedLabel : undefined
    }

    componentDidMount() {

        let aCounter = 0
        let bCounter = 0

        this.props.returnedTexts.forEach( count => 
            count.returningText === 'a' ? aCounter++ : bCounter++
        ) 

        const {sirvyToRender} = this.props

        if (sirvyToRender) {
            const optionA = sirvyToRender.replace(/.*a\)/,'').replace(/or.*/,'').trim()
            const optionB = sirvyToRender.replace(/.*b\)/,'').replace(/\?.*/,'').trim()
            this.setState({
                optionA : optionA,
                optionB : optionB
            })
        }

        const data = [{value: 100 * aCounter}, {value: 100 * bCounter}]
        const colors = ['#0088fe', '#dbcc66']

        const radian = Math.PI / 180

        const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
            const radius = innerRadius + (outerRadius - innerRadius) * 0.5
        const x  = cx + radius * Math.cos(-midAngle * radian)
        const y = cy  + radius * Math.sin(-midAngle * radian)
        
            return (
                <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} 	dominantBaseline="central">
                    {`${(percent * 100).toFixed(0)}%`}
                </text>
            )
        }

        this.setState({
            data,
            colors,
            renderCustomizedLabel
        })

    }

    render () {
    const {data, colors, renderCustomizedLabel} = this.state
        return(
        <PieChart width={1440} height={700} onMouseEnter={this.onPieEnter}>
            <Pie
            data={data}
            cx={720} 
            cy={350} 
            labelLine={false}
            label={renderCustomizedLabel}
            outerRadius={300} 
            fill="#8884d8">
            {
                data.map((entry, index) => <Cell fill={colors[index % colors.length]}/>)
            }
            </Pie>
        </PieChart>
        )
    }
}

export default GraphDisplay