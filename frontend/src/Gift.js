import React, { Component } from 'react'
import { graphql, compose } from 'react-apollo'
import { Redirect } from 'react-router-dom'
import M from 'materialize-css'
import { finduser, dragons, editUserDragonState, dragonGift } from './queries'
import './App.css'
import Layout from './Layout'
import MyGonHeader from './MyGonHeader'

class gift extends Component {
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
      serial: null,
      change_state: null,
      choice_cbg: 'null',
      username: 'JaeDragon',
      generation: 'generation',
      cooldown: 'cooldown',
      parents: 'parents,parents',
      children: 'children,children',
      recipient: null,
      recipientConfirm: null
    }
    this.btnPlus = this.btnPlus.bind(this)
    this.btnMinus = this.btnMinus.bind(this)
    this.onlyNumber = this.onlyNumber.bind(this)
    this.handleEmail = this.handleEmail.bind(this)
    this.handleEmailConfirm = this.handleEmailConfirm.bind(this)
    this.btnGiftGon = this.btnGiftGon.bind(this)
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
  handleEmail(event) {
    console.log('recipient : ', event.target.value)
    this.setState({ recipient: event.target.value })
  }
  handleEmailConfirm(event) {
    console.log('recipientConfirm : ', event.target.value)
    this.setState({ recipientConfirm: event.target.value })
  }
  btnGiftGon() {
    if (this.state.recipient === this.state.recipientConfirm) {
      this.props.dragonGift({ variables: { email: localStorage.getItem('email'), serial: this.props.match.params.serialnumber, recipient: this.state.recipient } })
        .then((res) => {
          console.log(res)
          this.setState({ redirect: true })
        })
        .catch((errors) => {
          console.log('errors: ', errors)
        })
    } else {
      M.toast({ html: '이메일 확인이 일치하지 않습니다' })
    }
  }
  render() {
    if (this.state.redirect) {
      window.location.replace('/Activity')
    }
    if (!this.props.data.loading) {
      console.log('this.props', this.props.data.dragons)
      for (let dl = 0; dl < this.props.data.dragons.length; dl += 1) {
        if (this.props.data.dragons[dl].serial === this.props.match.params.serialnumber) {
          // 소유한 모든 용 스테이트, 쿨타임 확인, 수정
          if (this.props.data.dragons[dl].state === 'Resting' || this.props.data.dragons[dl].state === 'brooding' || this.props.data.dragons[dl].state === 'Egg' || this.props.data.dragons[dl].state === 'Sell' || this.props.data.dragons[dl].state === 'Siring' || this.props.data.dragons[dl].state === 'during battle') {
            if (Date.now() > this.props.data.dragons[dl].cooldown[1]) {
              if (this.props.data.dragons[dl].state === 'during battle') {
                this.props.battleUpdate({ variables: { email: localStorage.getItem('email') } })
                  .then((res) => {
                    console.log(res)
                  })
                  .catch((errors) => {
                    console.log('errors: ', errors)
                  })
              } else {
                this.state.change_state = 'Normal'
                this.props.editUserDragonState({ variables: { serial: this.props.data.dragons[dl].serial, change_state: 'Normal' } })
                  .then((res) => {
                    console.log(res)
                  })
                  .catch((errors) => {
                    console.log('errors: ', errors)
                  })
              }
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
        // 소유한 모든 용 스테이트, 쿨타임 확인, 수정
        if (this.props.data.dragons[dl].state === 'Resting' || this.props.data.dragons[dl].state === 'brooding' || this.props.data.dragons[dl].state === 'Egg' || this.props.data.dragons[dl].state === 'Sell' || this.props.data.dragons[dl].state === 'Siring' || this.props.data.dragons[dl].state === 'during battle') {
          if (Date.now() > this.props.data.dragons[dl].cooldown[1]) {
            if (this.props.data.dragons[dl].state === 'during battle') {
              this.props.battleUpdate({ variables: { email: localStorage.getItem('email') } })
                .then((res) => {
                  console.log(res)
                })
                .catch((errors) => {
                  console.log('errors: ', errors)
                })
            } else {
              this.state.change_state = 'Normal'
              this.props.editUserDragonState({ variables: { serial: this.props.data.dragons[dl].serial, change_state: 'Normal' } })
                .then((res) => {
                  console.log(res)
                })
                .catch((errors) => {
                  console.log('errors: ', errors)
                })
            }
          } else {
            this.state.change_state = this.props.data.dragons[dl].state
          }
        } else {
          this.state.change_state = this.props.data.dragons[dl].state
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

        <div class="detail-Explanation">
          <div className="row">
            <h4 align='center'><p>Gift Gon</p></h4>
            <div class="col s12">
              <h6> - I present my dragon to a friend.</h6>
              <h6> - The minimum price starts at 10dia.</h6>
              <h6> - Please enter your friend's email to receive my dragon.</h6>
              <br/><br/>

              <div class="row">
                <form class="col s12">
                  <div class="row">
                    <div class="input-field col s12">
                      <input id="email" type="email" class="validate" onChange={this.handleEmail}/>
                      <label for="email">Email</label>
                      <span class="helper-text" data-error="wrong" data-success="right">Helper text</span>
                    </div>
                    <div class="input-field col s12">
                      <input id="email" type="email" class="validate" onChange={this.handleEmailConfirm}/>
                      <label for="email">Confirm Email</label>
                      <span class="helper-text" data-error="wrong" data-success="right">Helper text</span>
                    </div>
                  </div>
                </form>
              </div>

              <div class="center-align">
                <a class="waves-effect waves-light btn-large col s12" onClick={this.btnGiftGon}>Gift</a>
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
  graphql(dragonGift, { name: 'dragonGift' })
)(gift)

