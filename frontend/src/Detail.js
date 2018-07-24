import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './App.css'
import Layout from './Layout'
import MyGonHeader from './MyGonHeader'

export default class Detail extends Component {
  constructor(props) {
    super(props)
    this.state = {
      combination: ['01', '01', '01', '01', '01', '02', '03', '01', '03', '01', '01', '03', '02'],
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
    const evolution = this.state.combination[0]
    const property = this.state.combination[1]
    const wing = this.state.combination[2]
    const wingColor = this.state.combination[3]
    const horn = this.state.combination[4]
    const hornColor = this.state.combination[5]
    const tail = this.state.combination[6]
    const body = this.state.combination[7]
    const bodyColor = this.state.combination[8]
    const eye = this.state.combination[9]
    const eyeColor = this.state.combination[10]
    const mouth = this.state.combination[11]
    const nose = this.state.combination[12]
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
                    <img src={`${process.env.PUBLIC_URL}/images/gonImages/1_property/property_${property}.png`}/>
                    <div class="absolute">
                      <img src={`${process.env.PUBLIC_URL}/images/gonImages/2_wing/wing_${evolution}${wing}${wingColor}.png`}/>
                    </div>
                    <div class="absolute">
                      <img src={`${process.env.PUBLIC_URL}/images/gonImages/3_horn/horn_${evolution}${horn}${hornColor}.png`}/>
                    </div>
                    <div class="absolute">
                      <img src={`${process.env.PUBLIC_URL}/images/gonImages/4_tail/tail_${evolution}${tail}${bodyColor}.png`}/>
                    </div>
                    <div class="absolute">
                      <img src={`${process.env.PUBLIC_URL}/images/gonImages/5_body/body_${evolution}${body}${bodyColor}.png`}/>
                    </div>
                    <div class="absolute">
                      <img src={`${process.env.PUBLIC_URL}/images/gonImages/6_eye/eye_${evolution}${eye}${eyeColor}.png`}/>
                    </div>
                    <div class="absolute">
                      <img src={`${process.env.PUBLIC_URL}/images/gonImages/7_mouth/mouth_${evolution}${mouth}.png`}/>
                    </div>
                    <div class="absolute">
                      <img src={`${process.env.PUBLIC_URL}/images/gonImages/8_nose/nose_${evolution}${nose}.png`}/>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="detail-Explanation" >
          <div className="row">
            <div class="s12 left">
              <font size="7">{this.state.nickname}</font>&nbsp;&nbsp;&nbsp;&nbsp;<font size="6">{this.state.serialnumber}</font>
            </div>
            <div class="s12 right">
              <span><a class="waves-effect waves-light btn-large modal-trigger margin-right-10" href="#modal1">무기</a></span>
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
              <span><a class="waves-effect waves-light btn-large modal-trigger" href="#modal1">방패</a></span>
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
          - win 70%&nbsp;&nbsp;&nbsp;- gen {this.state.generation}&nbsp;&nbsp;&nbsp;- cooldown {this.state.cooldown}
          <br/><br/><br/>
          <span><Link to={'/Breed'}><a class="waves-effect waves-light btn-large margin-right-10"><i class="material-icons left">cloud</i>Breed</a></Link></span>
          <span><Link to={'/Sell'}><a class="waves-effect waves-light btn-large margin-right-10"><i class="material-icons left">cloud</i>Sell</a></Link></span>
          <span><Link to={'/Gift'}><a class="waves-effect waves-light btn-large"><i class="material-icons left">cloud</i>Gift</a></Link></span>
          <br/><br/><br/>
          <h5>lineament</h5>
          {this.state.combination}
          <br/><br/><br/>
          <h5>parents</h5>
          {this.state.parents}
          <br/><br/><br/>
          <h5>children</h5>
          {this.state.children}
        </div>
      </Layout>
    )
  }
}
