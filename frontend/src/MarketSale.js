import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import './App.css'
import Layout from './Layout'

const finddragon = gql`
query finddragon($serial: String!){
  finddragon(serial:$serial) {
  name
  combination
  birthday
  price
  serial
  } 
}
`

class MarketSale extends Component {
  constructor(props) {
    super(props)
    this.state = {
      comb: null,
      evolution: null,
      property: null,
      wing: null,
      wingColor: null,
      horn: null,
      hornColor: null,
      tail: null,
      body: null,
      bodyColor: null,
      eye: null,
      eyeColor: null,
      mouth: null,
      nose: null,
      name: null,
      birthday: null,
      price: null,
      serial: null,
      generation: 'generation',
      cooldown: 'cooldown',
      parents: 'parents,parents',
      children: 'children,children'
    }
  }
  render() {
    if (!this.props.data.loading) {
      this.state.name = this.props.data.finddragon.name
      this.state.birthday = this.props.data.finddragon.birthday
      this.state.price = this.props.data.finddragon.price
      this.state.serial = this.props.data.finddragon.serial
      this.state.comb = this.props.data.finddragon.combination
      this.state.evolution = this.state.comb.substring(0, 2)
      this.state.property = this.state.comb.substring(2, 4)
      this.state.wing = this.state.comb.substring(4, 6)
      this.state.wingColor = this.state.comb.substring(6, 8)
      this.state.horn = this.state.comb.substring(8, 10)
      this.state.hornColor = this.state.comb.substring(10, 12)
      this.state.tail = this.state.comb.substring(12, 14)
      this.state.body = this.state.comb.substring(14, 16)
      this.state.bodyColor = this.state.comb.substring(16, 18)
      this.state.eye = this.state.comb.substring(18, 20)
      this.state.eyeColor = this.state.comb.substring(20, 22)
      this.state.mouth = this.state.comb.substring(22, 24)
      this.state.nose = this.state.comb.substring(24, 26)
      console.log(this.state.serialNumber)
    }
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
                    <h5>Seller</h5>
                    <p>Zookeeper</p>
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
            <div className="col l12 margin-bottom-15">
              <div class="s12 left">
                <font size="7">{this.state.name}</font>&nbsp;&nbsp;&nbsp;&nbsp;<font size="6">{this.state.serial}</font>
              </div>
              <div class="s12 right margin-top-15">
                <span><a class="waves-effect waves-light btn-large modal-trigger" href="#modal1">Buy</a></span>
              </div>
            </div>
            <div className="margin-bottom-15">
              - win 70%&nbsp;&nbsp;&nbsp;- gen {this.state.generation}&nbsp;&nbsp;&nbsp;- cooldown {this.state.cooldown}
              &nbsp;&nbsp;&nbsp;- price {this.state.price}&nbsp;&nbsp;&nbsp;- birthday {this.state.birthday}
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
            <div class="divider"></div>
            <div class="section">
              <h5>자식</h5>
              <p>Stuff</p>
            </div>
          </div>
        </div>
      </Layout>
    )
  }
}

const queryOptions = {
  options: props => ({
    variables: {
      serial: props.match.params.serialnumber
    }
  })
}

export default graphql(finddragon, queryOptions)(MarketSale)
