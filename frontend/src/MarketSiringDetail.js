import React, { Component } from 'react'
import './App.css'
import Layout from './Layout'

export default class MarketSiringDetail extends Component {
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
      children: '333,444'
    }
  }
  render() {
    const color = this.state.combination.charAt(0)
    const line = this.state.combination.charAt(1)
    const eye = this.state.combination.charAt(2)
    return (
      <Layout>
        <div class="container margin-top-15">
          <div className="row">
            <div class="left">
              <div class="valign-wrapper">
                <div class="col s6 m6 l12">
                  <img src={`${process.env.PUBLIC_URL}/images/img_Rectangle.png`} alt="" class="circle responsive-img"/>
                </div>
                <div class="col">
                  <span class="black-text">
                    <h5>seller</h5>
                    <p>seller@gmail.com</p>
                  </span>
                </div>
              </div>
            </div>
            <div class="right margin-top-15">
              <a class="waves-effect waves-light btn-small">See more gons</a>
            </div>
          </div>
        </div>

        <div className="container">
          <div className="col s12 right">
            <i class="Small material-icons">share</i>
          </div>
          <div class="detail-img">
            <div className="row">
              <div class="s12 m4 l8">
                <div className="card z-depth-1">
                  <div className="card-image">
                    <img src={`${process.env.PUBLIC_URL}/images/gonImages/1_property/property_${this.state.property}.png`}/>
                    <div class="absolute">
                      <img src={`${process.env.PUBLIC_URL}/images/gonImages/2_wing/wing_${this.state.evolution}${this.state.wing}${this.state.wingColor}.png`}/>
                    </div>
                    <div class="absolute">
                      <img src={`${process.env.PUBLIC_URL}/images/gonImages/3_horn/horn_${this.state.evolution}${this.state.horn}${this.state.hornColor}.png`}/>
                    </div>
                    <div class="absolute">
                      <img src={`${process.env.PUBLIC_URL}/images/gonImages/4_tail/tail_${this.state.evolution}${this.state.tail}${this.state.bodyColor}.png`}/>
                    </div>
                    <div class="absolute">
                      <img src={`${process.env.PUBLIC_URL}/images/gonImages/5_body/body_${this.state.evolution}${this.state.body}${this.state.bodyColor}.png`}/>
                    </div>
                    <div class="absolute">
                      <img src={`${process.env.PUBLIC_URL}/images/gonImages/6_eye/eye_${this.state.evolution}${this.state.eye}${this.state.eyeColor}.png`}/>
                    </div>
                    <div class="absolute">
                      <img src={`${process.env.PUBLIC_URL}/images/gonImages/7_mouth/mouth_${this.state.evolution}${this.state.mouth}.png`}/>
                    </div>
                    <div class="absolute">
                      <img src={`${process.env.PUBLIC_URL}/images/gonImages/8_nose/nose_${this.state.evolution}${this.state.nose}.png`}/>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="detail-Explanation">
          <div className="row">

            <h3 className="margin-bottom-50" align="center">Breed now </h3>
            <h6> - Register my gon in the market. Another user can cross with my gon.</h6>
            <h6> - The minimum price starts at 10dia.</h6>

            <div class="col s12 m6 l6 left margin-top-30">
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

            <div class="col s12 m6 l6 right margin-top-30">
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

          <h6 align="center"> Click the button below to create a new dragon. </h6>

          <div class="center-align margin-top-30 margin-bottom-30">
            <a class="waves-effect waves-light btn-large col s12">OK, give them some privacy</a>
          </div>

          <div class="card-panel">
            <span class="red-text text-lighten-1">This is a card panel with dark blue text</span>
          </div>
        </div>
      </Layout>
    )
  }
}
