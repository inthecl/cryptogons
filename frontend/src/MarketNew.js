import React, { Component } from 'react'
import './App.css'
import Layout from './Layout'

export default class MarketNew extends Component {
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
        <div className="container margin-top-30">
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

        <div className="detail-Explanation">
          <div className="row">
            <div className="col l12 margin-bottom-15">
              <div class="s12 left">
                <font size="7">Gon 9546</font>
              </div>
              <div class="s12 right margin-top-15">
                <span><a class="waves-effect waves-light btn-large modal-trigger" href="#modal1">Buy</a></span>
              </div>
            </div>
            <div className="margin-bottom-15">
              - win 0%&nbsp;&nbsp;&nbsp;- gen 0&nbsp;&nbsp;&nbsp;- cooldown 0
            </div>
            <div class="divider"></div>
            <div class="section">
              <h5>구성</h5>
              <p>Stuff</p>
            </div>
            <div class="divider"></div>
            <div class="section">
              <h5>부모</h5>
              <p>Stuff</p>
            </div>
          </div>
        </div>
      </Layout>
    )
  }
}
