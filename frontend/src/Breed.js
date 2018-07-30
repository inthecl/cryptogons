import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import './App.css'
import Layout from './Layout'
import btnPlus from './image/plus.png'
import btnMinus from './image/minus.png'
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

class Breed extends Component {
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
    this.btnPlus = this.btnPlus.bind(this)
    this.btnMinus = this.btnMinus.bind(this)
    this.onlyNumber = this.onlyNumber.bind(this)
    this.btnSelectGon = this.btnSelectGon.bind(this)
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

const queryOptions = {
  options: props => ({
    variables: {
      serial: props.match.params.serialnumber
    }
  })
}

export default graphql(finddragon, queryOptions)(Breed)
