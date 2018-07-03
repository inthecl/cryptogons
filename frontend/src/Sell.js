import React, { Component } from 'react'
import './App.css'
import Layout from './Layout'
import btnPlus from './image/plus.png'
import btnMinus from './image/minus.png'
import MyGonHeader from './MyGonHeader'

export default class Sell extends Component {
  constructor(props) {
    super(props)
    this.state = {
      combination: '123',
      username: 'JaeDragon',
      nickname: 'Dooly',
      serialnumber: '#159456',
      generation: '3',
      cooldown: '60',
      parents: '111,222',
      children: '333,444',
      showPopup: false,
      price: 1
    }
    this.btnPlus = this.btnPlus.bind(this)
    this.btnMinus = this.btnMinus.bind(this)
    this.onlyNumber = this.onlyNumber.bind(this)
    this.btnSelectGon = this.btnSelectGon.bind(this)
  }
  togglePopup() {
    this.setState({
      showPopup: !this.state.showPopup
    })
  }
  btnPlus() {
    if (this.state.price < 9999) {
      this.setState({
        price: parseInt(this.state.price) + 1
      })
    }
  }
  btnMinus() {
    if (this.state.price > 0) {
      this.setState({
        price: this.state.price - 1
      })
    }
  }
  onlyNumber(event) {
    if (isNaN(Number(event.target.value))) {
      return;
    } else {
      this.setState({ price: event.target.value })
    }
  }
  btnSelectGon() {
    console.log('btnSelectGon')
  }
  btnSelectGon
  render() {
    const color = this.state.combination.charAt(0)
    const line = this.state.combination.charAt(1)
    const eye = this.state.combination.charAt(2)
    return (
      <Layout>
        <MyGonHeader/>
        <div className="container">
          <div className="col s12 right">
            <i class="Small material-icons">share</i>
          </div>
          <div class="detail-img">
            <div className="row">
              <div class="s12 m4 l8">
                <div className="card z-depth-1">
                  <div className="card-image">
                    <img src={`${process.env.PUBLIC_URL}/images/Transparency.png`}/>
                    <div class="absolute">
                      <img src={`${process.env.PUBLIC_URL}/images/color_${color}.png`}/>
                    </div>
                    <div class="absolute">
                      <img src={`${process.env.PUBLIC_URL}/images/dragon_line${line}.png`}/>
                    </div>
                    <div class="absolute">
                      <img src={`${process.env.PUBLIC_URL}/images/eye_${eye}.png`}/>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="detail-Explanation" >
          <div className="row">
            <h4 align='center'><p>Sell Gon</p></h4>
            <div class="col s12">
              <h6> - I bring my dragon to market.</h6>
              <h6> - The minimum price starts at 10dia.</h6>
              <br/><br/>

              <div className="row">
                <div class="col s12 m6 l6 left">
                  <p>Average price for the same gen</p>
                </div>
                <div class="col s12 m6 l6 right right-align">
                  <img src={btnMinus} onClick={this.btnMinus} align="center" hspace="10"/>
                  <span class="textbox"><input type="text" class="browser-default" id="ex_input" value={this.state.price} onChange={this.onlyNumber}maxlength="4"/></span>
                  <img src={btnPlus} onClick={this.btnPlus} align="center" hspace="10"/>
                </div>
              </div>

              <div className="row">
                <div class="col s12 m6 l6 left">
                  <p>Enter selling price</p>
                </div>
                <div class="col s12 m6 l6 right right-align">
                  <img src={btnMinus} onClick={this.btnMinus} align="center" hspace="10"/>
                  <span class="textbox"><input type="text" class="browser-default" id="ex_input" value={this.state.price} onChange={this.onlyNumber}maxlength="4"/></span>
                  <img src={btnPlus} onClick={this.btnPlus} align="center" hspace="10"/>
                </div>
              </div>

              <div className="row">
                <div class="col s12 m6 l6 left">
                  <p>Enter sales period</p>
                </div>
                <div class="col s12 m6 l6 right right-align">
                  <img src={btnMinus} onClick={this.btnMinus} align="center" hspace="10"/>
                  <span class="textbox"><input type="text" class="browser-default" id="ex_input" value={this.state.price} onChange={this.onlyNumber}maxlength="4"/></span>
                  <img src={btnPlus} onClick={this.btnPlus} align="center" hspace="10"/>
                </div>
              </div>

              <br/>
              <div class="center-align">
                <a class="waves-effect waves-light btn-large col s12">Done</a>
              </div>
              <br/><br/><br/><br/>
              <div class="card-panel">
                <span class="red-text text-lighten-1">This is a card panel with dark blue text</span>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    )
  }
}
