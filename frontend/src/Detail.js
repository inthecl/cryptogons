import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import { Link } from 'react-router-dom'
import './App.css'
import Layout from './Layout'
import MyGonHeader from './MyGonHeader'

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

class Detail extends Component {
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
      username: 'JaeDragon',
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
      console.log(this.state.name)
    }
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

        <div class="detail-Explanation" >
          <div className="row">
            <div class="s12 left">
              <font size="7">{this.state.name}</font>&nbsp;&nbsp;&nbsp;&nbsp;<font size="6">{this.state.serial}</font>
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
              &nbsp;&nbsp;&nbsp;- price {this.state.price}&nbsp;&nbsp;&nbsp;- birthday {this.state.birthday}
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

const queryOptions = {
  options: props => ({
    variables: {
      serial: props.match.params.serialnumber.substring(2, 26)
    }
  })
}

export default graphql(finddragon, queryOptions)(Detail)

