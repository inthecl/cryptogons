import React, { Component } from 'react'
import './App.css'
import Layout from './Layout'
import btnPlus from './image/plus.png'
import btnMinus from './image/minus.png'

export default class Breed extends Component {
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
        <br/>
        <div class="container" >
          <div className="row">
            <div class="left">
              <div class="valign-wrapper">
                <div class="col s6 m6 l12">
                  <img src={`${process.env.PUBLIC_URL}/images/img_Rectangle.png`} alt="" class="circle responsive-img"/>
                </div>
                <div class="col">
                  <span class="black-text">
                    <h5>IntheCL</h5>
                    <p>zangon88@gmail.com</p>
                  </span>
                </div>
              </div>
            </div>
            <div class="right">
              <br/>
              <a class="waves-effect waves-light btn-small">공유</a>
            </div>
          </div>
        </div>
        <div class="detail-img" >
          <div className="row">
            <div class="s12 m4 l8">
              <div className="card z-depth-0">
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
        <div class="detail-Explanation" >
          <div className="row">
            <h4 align='center'><p>Breed Gon</p></h4>
            <div class="col s12">
              <ul class="tabs">
                <li class="tab col s6"><a class="active" href="#test1">대중과 교배</a></li>
                <li class="tab col s6"><a href="#test2">내꺼랑 교배</a></li>
              </ul>
            </div>
            <div id="test1" class="col s12">
              <br/>
              <h6> - Register my gon in the market. Another user can cross with my gon.</h6>
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

            <div id="test2" class="col s12">
              <br/>
              <h6> - Please select a breeder. Breeding increases cooldown.</h6>
              <h6> - The minimum price starts at 10dia.</h6>
              <br/><br/>

              <div className="row">
                <div class="col s12 m6 l6 left">
                  <div className="card z-depth-0">
                    <div className="card-image">
                      <img src={`${process.env.PUBLIC_URL}/images/Transparency.png`}/>
                      <div class="absolute">
                        <a class="modal-trigger" href="#modal1"><img src={`${process.env.PUBLIC_URL}/images/btn_select_gon.png`}/></a>

                        <div id="modal1" class="modal">
                          <div class="modal-content">
                            <h4>Modal Header</h4>
                            <p>List</p><p>List</p><p>List</p><p>List</p><p>List</p><p>List</p><p>List</p><p>List</p><p>List</p><p>List</p><p>List</p><p>List</p>
                            <p>List</p><p>List</p><p>List</p><p>List</p><p>List</p><p>List</p><p>List</p><p>List</p><p>List</p><p>List</p><p>List</p><p>List</p>
                          </div>
                          <div class="modal-footer">
                            <a href="#!" class="modal-close waves-effect waves-green btn-flat">Agree</a>
                          </div>
                        </div>

                      </div>
                    </div>
                  </div>
                </div>

                <div class="col s12 m6 l6 right">
                  <div className="card z-depth-0">
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
                      <div class="absolute">
                        <img src={`${process.env.PUBLIC_URL}/images/edge_1.png`}/>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <br/>
              <h6 align="center"> Click the button below to create a new dragon. </h6>
              <br/>

              <div class="center-align">
                <a class="waves-effect waves-light btn-large col s12">OK, give them some privacy</a>
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
