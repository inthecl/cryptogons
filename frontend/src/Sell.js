import React, { Component } from 'react'
import M from 'materialize-css'
import { graphql, compose } from 'react-apollo'
import { Redirect } from 'react-router-dom'
import { finduser, dragons, editUserDragonState, dragonSell } from './queries'
import './App.css'
import Layout from './Layout'
import btnPlus from './image/plus.png'
import btnMinus from './image/minus.png'
import MyGonHeader from './MyGonHeader'

class sell extends Component {
  constructor(props) {
    super(props)
    this.state = {
      redirect: false,
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
      email: null,
      name: null,
      birthday: null,
      price: null,
      period: null,
      average_sell_price: 100,
      sell_price: 10,
      sell_period: 1,
      serial: null,
      change_state: null,
      choice_cbg: 'null',
      username: 'JaeDragon',
      generation: 'generation',
      cooldown: 'cooldown',
      parents: 'parents,parents',
      children: 'children,children'
    }
    this.btnPricePlus = this.btnPricePlus.bind(this)
    this.btnPriceMinus = this.btnPriceMinus.bind(this)
    this.btnPeriodPlus = this.btnPeriodPlus.bind(this)
    this.btnPeriodMinus = this.btnPeriodMinus.bind(this)
    this.onlyPriceNumber = this.onlyPriceNumber.bind(this)
    this.onlyPeriodNumber = this.onlyPeriodNumber.bind(this)
    this.btnSellbtn = this.btnSellbtn.bind(this)
  }
  togglePopup() {
    this.setState({
      showPopup: !this.state.showPopup
    })
  }
  btnPricePlus() {
    if (this.state.sell_price < 1000000) {
      this.setState({
        sell_price: this.state.sell_price + 1
      })
    }
  }
  btnPriceMinus() {
    if (this.state.sell_price > 10) {
      this.setState({
        sell_price: this.state.sell_price - 1
      })
      console.log('minus')
    }
  }
  btnPeriodPlus() {
    if (this.state.sell_period < 3) {
      this.setState({
        sell_period: this.state.sell_period + 1
      })
    }
  }
  btnPeriodMinus() {
    if (this.state.sell_period > 1) {
      this.setState({
        sell_period: this.state.sell_period - 1
      })
      console.log('minus')
    }
  }
  onlyPriceNumber(event) {
    if (isNaN(Number(event.target.value))) {
      return;
    } else {
      this.setState({ sell_price: Number(event.target.value) })
    }
  }
  onlyPeriodNumber(event) {
    if (isNaN(Number(event.target.value))) {
      return;
    } else {
      this.setState({ sell_period: Number(event.target.value) })
    }
  }
  btnSellbtn() {
    console.log('this.props.match.params.serialnumber: ', this.props.match.params.serialnumber)
    console.log('this.state.sell_price : ', this.state.sell_price)
    console.log('this.state.sell_period : ', this.state.sell_period)
    this.props.dragonSell({ variables: { serial: this.props.match.params.serialnumber, diamond: this.state.sell_price, period: this.state.sell_period } })
      .then((res) => {
        console.log(res)
        M.toast({ html: '판매등록 완료' })
        this.setState({ redirect: true })
      })
      .catch((errors) => {
        console.log('errors: ', errors)
      })
  }
  render() {
    if (this.state.redirect) {
      return <Redirect to='/Activity'/>
    }
    if (!this.props.data.loading) {
      console.log('this.props', this.props)
      for (let dl = 0; dl < this.props.data.dragons.length; dl += 1) {
        if (this.props.data.dragons[dl].serial === this.props.match.params.serialnumber) {
          // 소유한 모든 용 스테이트, 쿨타임 확인, 수정
          if (this.props.data.dragons[dl].state === 'Resting' || this.props.data.dragons[dl].state === 'brooding' || this.props.data.dragons[dl].state === 'Egg' || this.props.data.dragons[dl].state === 'during battle') {
            if (Date.now() >= this.props.data.dragons[dl].cooldown[1]) {
              this.state.change_state = 'Normal'
              this.props.editUserDragonState({ variables: { email: localStorage.getItem('email'), serial: this.props.data.dragons[dl].serial, change_state: 'Normal' } })
                .then((res) => {
                  console.log(res)
                })
                .catch((errors) => {
                  console.log('errors: ', errors)
                })
            } else {
              this.state.change_state = this.props.data.dragons[dl].state
            }
          } else {
            this.state.change_state = this.props.data.dragons[dl].state
          }
          this.state.email = this.props.data.dragons[dl].email
          this.state.name = this.props.data.dragons[dl].name
          this.state.birthday = this.props.data.dragons[dl].birthday
          this.state.price = this.props.data.dragons[dl].price
          this.state.period = this.props.data.dragons[dl].period
          this.state.serial = this.props.data.dragons[dl].serial
          this.state.state = this.state.change_state
          this.state.choice_cbg = this.props.data.dragons[dl].choice_cbg
          this.state.comb = this.props.data.dragons[dl].combination
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
        }
      }

      if (this.state.email !== localStorage.getItem('email')) {
        return <Redirect to='/'/>
      }
    }
    return (
      <Layout>
        <MyGonHeader/>
        <div className="container margin-top-50">
          <div className="col s12 right">
            <i class="Small material-icons">share</i>
          </div>
          <div class="detail-img">
            <div className="row">
              <div class="s12 m4 l8">
                <div className="card z-depth-1">
                  <div className="card-image">
                    {this.state.choice_cbg === 'null' &&
                      <img src={`${process.env.PUBLIC_URL}/images/gonImages/1_property/property_${this.state.property}.png`}/>
                    }
                    {this.state.choice_cbg !== 'null' &&
                      <img src={`${process.env.PUBLIC_URL}/images/item/custom_bg/cbg_${this.state.choice_cbg}.png`}/>
                    }
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
                  <span class="textbox"><input type="text" class="browser-default" id="ex_input" value={this.state.average_sell_price}/></span>
                </div>
              </div>

              <div className="row">
                <div class="col s12 m6 l6 left">
                  <p>Enter selling price</p>
                </div>
                <div class="col s12 m6 l6 right right-align">
                  <img src={btnMinus} onClick={this.btnPriceMinus} align="center" hspace="10"/>
                  <span class="textbox"><input type="text" class="browser-default" id="ex_input" value={this.state.sell_price} onChange={this.onlyPriceNumber} maxlength="7"/></span>
                  <img src={btnPlus} onClick={this.btnPricePlus} align="center" hspace="10"/>
                </div>
              </div>

              <div className="row">
                <div class="col s12 m6 l6 left">
                  <p>Enter sales period</p>
                </div>
                <div class="col s12 m6 l6 right right-align">
                  <img src={btnMinus} onClick={this.btnPeriodMinus} align="center" hspace="10"/>
                  <span class="textbox"><input type="text" class="browser-default" id="ex_input" value={this.state.sell_period} onChange={this.onlyPeriodNumber} maxlength="1"/></span>
                  <img src={btnPlus} onClick={this.btnPeriodPlus} align="center" hspace="10"/>
                </div>
              </div>

              <br/>
              <div class="center-align">
                <a class="waves-effect waves-light btn-large col s12" onClick={this.btnSellbtn}>Sell</a>
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

export default compose(
  graphql(finduser, {
    name: 'finduser',
    options: props => ({
      variables: {
        email: localStorage.getItem('email')
      }
    })
  }),
  graphql(dragons),
  graphql(editUserDragonState, { name: 'editUserDragonState' }),
  graphql(dragonSell, { name: 'dragonSell' })
)(sell)
