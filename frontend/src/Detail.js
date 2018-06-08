import React, { Component } from 'react'
import './App.css'
import Layout from './Layout'

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
                    ZANGON
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
              <div className="card">
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
              <br/>
              <a class="waves-effect waves-light btn-large">무기</a>&nbsp;&nbsp;
              <a class="waves-effect waves-light btn-large">방패</a>
            </div>
          </div>
          - win 70%&nbsp;&nbsp;&nbsp;- gen {this.state.generation}&nbsp;&nbsp;&nbsp;- cooldown {this.state.cooldown}
          <br/><br/><br/>
          <a class="waves-effect waves-light btn-large"><i class="material-icons left">cloud</i>button</a>&nbsp;&nbsp;
          <a class="waves-effect waves-light btn-large"><i class="material-icons left">cloud</i>button</a>&nbsp;&nbsp;
          <a class="waves-effect waves-light btn-large"><i class="material-icons left">cloud</i>button</a>
          <br/><br/><br/>
          <h5>lineament</h5>
          {this.state.combination}
          <br/><br/><br/>
          <h5>parents</h5>
          {this.state.parents}
          <br/><br/><br/>
          <h5>children</h5>
          {this.state.children}
          <br/><br/><br/>
        </div>
      </Layout>
    )
  }
}
