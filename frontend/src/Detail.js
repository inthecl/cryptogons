import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './App.css'
import Layout from './Layout'
import Popup from './Popup'

export default class Detail extends Component {
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
        <div class="detail-img">
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
            <div class="s12 left">
              <font size="7">{this.state.nickname}</font>&nbsp;&nbsp;&nbsp;&nbsp;<font size="6">{this.state.serialnumber}</font>
            </div>
            <div class="s12 right">
              <a class="waves-effect waves-light btn-large modal-trigger" href="#modal1">무기</a>&nbsp;&nbsp;
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
              <a class="waves-effect waves-light btn-large modal-trigger" href="#modal1">방패</a>&nbsp;&nbsp;
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
          <Link to={'/Breed'}><a class="waves-effect waves-light btn-large"><i class="material-icons left">cloud</i>Breed</a>&nbsp;&nbsp;</Link>
          <Link to={'/Sell'}><a class="waves-effect waves-light btn-large"><i class="material-icons left">cloud</i>Sell</a>&nbsp;&nbsp;</Link>
          <Link to={'/Gift'}><a class="waves-effect waves-light btn-large"><i class="material-icons left">cloud</i>Gift</a>&nbsp;&nbsp;</Link>
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
