import React, { Component } from 'react'
import btnx from './image/btn_x.png'

export default class Alert extends Component {
  render() {
    return (
      <div className='popup'>
        <div className='popup_inner'>
          <div class="right">
            <img src={btnx} alt="my image" onClick={this.props.closePopup} />
          </div>
          <div class="left">
            <h5>{this.props.text}</h5>
          </div>
          <div class="popup_div">
            pagination<br/>
            pagination<br/>
            pagination<br/>
            pagination<br/>
            pagination<br/>
            pagination<br/>
            pagination<br/>
            pagination<br/>
            pagination<br/>
            pagination<br/>
            pagination<br/>
            pagination<br/>
            pagination<br/>
            pagination<br/>
            pagination<br/>
            pagination<br/>
            pagination<br/>
            pagination<br/>
            pagination<br/>
            pagination<br/>
            pagination<br/>
            pagination<br/>
            pagination<br/>
            pagination<br/>
            pagination<br/>
            pagination<br/>
            pagination<br/>
          </div>
        </div>
      </div>
    )
  }
}
