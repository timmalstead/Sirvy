import React, { Component } from 'react'
import {PieChart, Pie, Cell} from 'recharts'

// const data = [{name: 'Group A', value: 400}, {name: 'Group B', value: 300},
//                   {name: 'Group C', value: 300}, {name: 'Group D', value: 200}]
// const colors = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042']
const data = [{name: 'Group A', value: 400}, {name: 'Group B', value: 300}]
const colors = ['#0088fe', '#ff8859']

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

class GraphDisplay extends Component {
    state = {
        optionA : '',
        optionB : ''
    }

    componentDidMount() {
        const {sirvyToRender} = this.props
        if (sirvyToRender) {
            const optionA = sirvyToRender.replace(/.*a\)/,'').replace(/or.*/,'').trim()
            const optionB = sirvyToRender.replace(/.*b\)/,'').replace(/\?.*/,'').trim()
            this.setState({
                optionA : optionA,
                optionB : optionB
            })
        }
    }

    render () {
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