import React, {Component} from 'react'
import Moment from 'react-moment'

export default class FinalSlide extends Component {
  render() {
    const {daily, nextStep} = this.props
    return (
      <div onClick={nextStep} style={{backgroundColor: daily.team.color}} className="page-overlay">
        <div className="daily-text text-center">
          <div>Well Done!</div>
          <div>Let`s get back to work</div>
        </div>
      </div>
    )
  }
}
