import React, {Component} from 'react';
import database from '../../firebase/firebase'

class Sirvys extends Component {

  state = {
    
  }

  componentDidMount() {
    database.ref().set('this will work')
  }

  render () {
    return (
      <div>
        <p>this is where all the sirvys appear</p>
      </div>
    )
  }
}

export default Sirvys;