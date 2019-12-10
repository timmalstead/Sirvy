import React, { Component } from 'react'

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
            <p>howdy</p>
        )
    }
}

export default GraphDisplay