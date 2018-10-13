import React, { Component } from 'react'
import { graphql, compose } from 'react-apollo'
import M from 'materialize-css'
import { finduser, dragons, editUserDragonState, battleStart, battleCancle, battleUpdate } from './queries'
import './App.css'
import Layout from './Layout'
import BattleHeader from './BattleHeader'

class battles extends Component {
  constructor(props) {
    super(props)
    this.state = {
      redirect: null,
      bdragons: [],
      situation: null,
      choiceGon: false,
      choice_serial: null,
      choice_comb: null,
      choice_cbg: 'null',
      choice_evolution: null,
      choice_property: null,
      choice_wing: null,
      choice_wingColor: null,
      choice_horn: null,
      choice_hornColor: null,
      choice_tail: null,
      choice_body: null,
      choice_bodyColor: null,
      choice_eye: null,
      choice_eyeColor: null,
      choice_mouth: null,
      choice_nose: null
    }
    this.btnSelectGon = this.btnSelectGon.bind(this) // 배틀할 용 선택
    this.btnBattleStart = this.btnBattleStart.bind(this) // 배틀 시작
    this.btnBattleCancle = this.btnBattleCancle.bind(this) // 배틀 취소
  }
  btnSelectGon(e) {
    console.log('btnSelectGon', e.target.id)
    for (let dl = 0; dl < this.props.data.dragons.length; dl += 1) {
      if (this.props.data.dragons[dl].serial === e.target.id) {
        this.setState({
          choiceGon: true,
          choice_comb: this.props.data.dragons[dl].combination,
          choice_serial: this.props.data.dragons[dl].serial,
          choice_cbg: this.props.data.dragons[dl].choice_cbg,
          choice_evolution: this.props.data.dragons[dl].combination.substring(0, 2),
          choice_property: this.props.data.dragons[dl].combination.substring(2, 4),
          choice_wing: this.props.data.dragons[dl].combination.substring(4, 6),
          choice_wingColor: this.props.data.dragons[dl].combination.substring(6, 8),
          choice_horn: this.props.data.dragons[dl].combination.substring(8, 10),
          choice_hornColor: this.props.data.dragons[dl].combination.substring(10, 12),
          choice_tail: this.props.data.dragons[dl].combination.substring(12, 14),
          choice_body: this.props.data.dragons[dl].combination.substring(14, 16),
          choice_bodyColor: this.props.data.dragons[dl].combination.substring(16, 18),
          choice_eye: this.props.data.dragons[dl].combination.substring(18, 20),
          choice_eyeColor: this.props.data.dragons[dl].combination.substring(20, 22),
          choice_mouth: this.props.data.dragons[dl].combination.substring(22, 24),
          choice_nose: this.props.data.dragons[dl].combination.substring(24, 26)
        })
      }
    }
    console.log('this.state.choice_comb : ', this.state.choice_comb)
  }
  btnBattleStart() {
    this.props.battleStart({ variables: { email: localStorage.getItem('email'), serial: this.state.choice_serial } })
      .then((res) => {
        console.log('btnBattleStart : ', res)
        if (res.data.battleStart.state === 'Matching') {
          window.location.href = '/ring'
        }
        if (res.data.battleStart.state === 'during battle') {
          window.location.href = '/ring'
        }
      })
      .catch((errors) => {
        console.log('errors: ', errors)
      })
  }
  btnBattleCancle() {
    this.props.battleCancle({ variables: { email: localStorage.getItem('email'), serial: this.state.choice_serial } })
      .then((res) => {
        console.log('btnBattleCancle : ', res)
        if (res.data.battleCancle.state === 'during battle') {
          M.toast({ html: '이미 배틀이 시작되었습니다' })
          this.setState({ redirect: 'during battle' })
        }
        if (res.data.battleCancle.state === 'Normal') {
          this.setState({ redirect: 'cancle' })
        }
      })
      .catch((errors) => {
        console.log('errors: ', errors)
      })
  }
  render() {
    if (this.state.redirect === 'cancle') {
      window.location.reload()
    }
    if (!this.props.data.loading) {
      console.log('this.props', this.props.data)
      let dcx = 0
      for (let dl = 0; dl < this.props.data.dragons.length; dl += 1) {
        if (this.props.data.dragons[dl].email === localStorage.getItem('email')) {
          // 소유한 모든 용 스테이트, 쿨타임 확인, 수정
          if (this.props.data.dragons[dl].state === 'Resting' || this.props.data.dragons[dl].state === 'brooding' || this.props.data.dragons[dl].state === 'Egg' || this.props.data.dragons[dl].state === 'Sell' || this.props.data.dragons[dl].state === 'Siring' || this.props.data.dragons[dl].state === 'during battle') {
            if (Date.now() >= this.props.data.dragons[dl].cooldown[1]) {
              if (this.props.data.dragons[dl].state === 'during battle') {
                this.state.situation = 'update'
                this.props.battleUpdate({ variables: { email: localStorage.getItem('email') } })
                  .then((res) => {
                    console.log(res)
                  })
                  .catch((errors) => {
                    console.log('errors: ', errors)
                  })
              } else {
                this.props.editUserDragonState({ variables: { serial: this.props.data.dragons[dl].serial, change_state: 'Normal' } })
                  .then((res) => {
                    console.log(res)
                  })
                  .catch((errors) => {
                    console.log('errors: ', errors)
                  })
              }
            }
          }
          if (Date.now() >= this.props.data.dragons[dl].cooldown[1]) {
            this.state.bdragons[dcx] = {
              name: this.props.data.dragons[dl].name,
              serial: this.props.data.dragons[dl].serial,
              choice_cbg: this.props.data.dragons[dl].choice_cbg,
              evolution: this.props.data.dragons[dl].combination.substring(0, 2),
              property: this.props.data.dragons[dl].combination.substring(2, 4),
              wing: this.props.data.dragons[dl].combination.substring(4, 6),
              wingColor: this.props.data.dragons[dl].combination.substring(6, 8),
              horn: this.props.data.dragons[dl].combination.substring(8, 10),
              hornColor: this.props.data.dragons[dl].combination.substring(10, 12),
              tail: this.props.data.dragons[dl].combination.substring(12, 14),
              body: this.props.data.dragons[dl].combination.substring(14, 16),
              bodyColor: this.props.data.dragons[dl].combination.substring(16, 18),
              eye: this.props.data.dragons[dl].combination.substring(18, 20),
              eyeColor: this.props.data.dragons[dl].combination.substring(20, 22),
              mouth: this.props.data.dragons[dl].combination.substring(22, 24),
              nose: this.props.data.dragons[dl].combination.substring(24, 26)
            }
            dcx += 1
          }
          if (this.state.situation !== 'update') {
            if (this.props.data.dragons[dl].state === 'Matching') { // 이미 매칭중일 때
              console.log('-----------------Matching')
              this.state.choiceGon = true
              this.state.situation = 'Matching'
              this.state.choice_comb = this.props.data.dragons[dl].combination
              this.state.choice_serial = this.props.data.dragons[dl].serial
              this.state.choice_cbg = this.props.data.dragons[dl].choice_cbg
              this.state.choice_evolution = this.props.data.dragons[dl].combination.substring(0, 2)
              this.state.choice_property = this.props.data.dragons[dl].combination.substring(2, 4)
              this.state.choice_wing = this.props.data.dragons[dl].combination.substring(4, 6)
              this.state.choice_wingColor = this.props.data.dragons[dl].combination.substring(6, 8)
              this.state.choice_horn = this.props.data.dragons[dl].combination.substring(8, 10)
              this.state.choice_hornColor = this.props.data.dragons[dl].combination.substring(10, 12)
              this.state.choice_tail = this.props.data.dragons[dl].combination.substring(12, 14)
              this.state.choice_body = this.props.data.dragons[dl].combination.substring(14, 16)
              this.state.choice_bodyColor = this.props.data.dragons[dl].combination.substring(16, 18)
              this.state.choice_eye = this.props.data.dragons[dl].combination.substring(18, 20)
              this.state.choice_eyeColor = this.props.data.dragons[dl].combination.substring(20, 22)
              this.state.choice_mouth = this.props.data.dragons[dl].combination.substring(22, 24)
              this.state.choice_nose = this.props.data.dragons[dl].combination.substring(24, 26)
            }
            if (this.props.data.dragons[dl].state === 'during battle') { // 이미 전투중일 때
              console.log('-----------------during battle')
              this.state.choiceGon = true
              this.state.situation = 'during battle'
              this.state.choice_comb = this.props.data.dragons[dl].combination
              this.state.choice_serial = this.props.data.dragons[dl].serial
              this.state.choice_cbg = this.props.data.dragons[dl].choice_cbg
              this.state.choice_evolution = this.props.data.dragons[dl].combination.substring(0, 2)
              this.state.choice_property = this.props.data.dragons[dl].combination.substring(2, 4)
              this.state.choice_wing = this.props.data.dragons[dl].combination.substring(4, 6)
              this.state.choice_wingColor = this.props.data.dragons[dl].combination.substring(6, 8)
              this.state.choice_horn = this.props.data.dragons[dl].combination.substring(8, 10)
              this.state.choice_hornColor = this.props.data.dragons[dl].combination.substring(10, 12)
              this.state.choice_tail = this.props.data.dragons[dl].combination.substring(12, 14)
              this.state.choice_body = this.props.data.dragons[dl].combination.substring(14, 16)
              this.state.choice_bodyColor = this.props.data.dragons[dl].combination.substring(16, 18)
              this.state.choice_eye = this.props.data.dragons[dl].combination.substring(18, 20)
              this.state.choice_eyeColor = this.props.data.dragons[dl].combination.substring(20, 22)
              this.state.choice_mouth = this.props.data.dragons[dl].combination.substring(22, 24)
              this.state.choice_nose = this.props.data.dragons[dl].combination.substring(24, 26)
            }
          }
        }
      }
    }
    return (
      <Layout>
        <BattleHeader/>
        <div id="modal1" class="modal">
          <div class="modal-content">
            <h4>Modal Header</h4>
            <div className='center margin-top-50'>
              <div className="row">
                {this.state.bdragons.map(item =>
                  <div key={item.id}>
                    <div className="col s12 m6 l3">
                      <div className="card">
                        <div className="card-image">
                          {item.choice_cbg === 'null' &&
                            <img src={`${process.env.PUBLIC_URL}/images/gonImages/1_property/property_${item.property}.png`}/>
                          }
                          {item.choice_cbg !== 'null' &&
                            <img src={`${process.env.PUBLIC_URL}/images/item/custom_bg/cbg_${item.choice_cbg}.png`}/>
                          }
                          <div class="absolute">
                            <img src={`${process.env.PUBLIC_URL}/images/gonImages/2_wing/wing_${item.evolution}${item.wing}${item.wingColor}.png`}/>
                          </div>
                          <div class="absolute">
                            <img src={`${process.env.PUBLIC_URL}/images/gonImages/3_horn/horn_${item.evolution}${item.horn}${item.hornColor}.png`}/>
                          </div>
                          <div class="absolute">
                            <img src={`${process.env.PUBLIC_URL}/images/gonImages/4_tail/tail_${item.evolution}${item.tail}${item.bodyColor}.png`}/>
                          </div>
                          <div class="absolute">
                            <img src={`${process.env.PUBLIC_URL}/images/gonImages/5_body/body_${item.evolution}${item.body}${item.bodyColor}.png`}/>
                          </div>
                          <div class="absolute">
                            <img src={`${process.env.PUBLIC_URL}/images/gonImages/6_eye/eye_${item.evolution}${item.eye}${item.eyeColor}.png`}/>
                          </div>
                          <div class="absolute">
                            <img src={`${process.env.PUBLIC_URL}/images/gonImages/7_mouth/mouth_${item.evolution}${item.mouth}.png`}/>
                          </div>
                          <div class="absolute">
                            <img src={`${process.env.PUBLIC_URL}/images/gonImages/8_nose/nose_${item.evolution}${item.nose}.png`}/>
                          </div>
                        </div>
                        <div className="card-action">
                          <div className="modal-close" id={item.serial} onClick={this.btnSelectGon}>{item.serial}</div>
                        </div>
                      </div>
                    </div>
                  </div>)}
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <a href="#!" class="modal-close waves-effect waves-green btn-flat">Agree</a>
          </div>
        </div>

        <div class="detail-Explanation margin-top-50" >
          <div class="row valign-wrapper">
            <div class="col s12 m6 l6">
              <div className="card z-depth-0">
                {this.state.choiceGon ? (
                  <div className="card-image">
                    {this.state.choice_cbg === 'null' &&
                      <img src={`${process.env.PUBLIC_URL}/images/gonImages/1_property/property_${this.state.choice_property}.png`}/>
                    }
                    {this.state.choice_cbg !== 'null' &&
                      <img src={`${process.env.PUBLIC_URL}/images/item/custom_bg/cbg_${this.state.choice_cbg}.png`}/>
                    }
                    <div class="absolute">
                      <img src={`${process.env.PUBLIC_URL}/images/gonImages/2_wing/wing_${this.state.choice_evolution}${this.state.choice_wing}${this.state.choice_wingColor}.png`}/>
                    </div>
                    <div class="absolute">
                      <img src={`${process.env.PUBLIC_URL}/images/gonImages/3_horn/horn_${this.state.choice_evolution}${this.state.choice_horn}${this.state.choice_hornColor}.png`}/>
                    </div>
                    <div class="absolute">
                      <img src={`${process.env.PUBLIC_URL}/images/gonImages/4_tail/tail_${this.state.choice_evolution}${this.state.choice_tail}${this.state.choice_bodyColor}.png`}/>
                    </div>
                    <div class="absolute">
                      <img src={`${process.env.PUBLIC_URL}/images/gonImages/5_body/body_${this.state.choice_evolution}${this.state.choice_body}${this.state.choice_bodyColor}.png`}/>
                    </div>
                    <div class="absolute">
                      <img src={`${process.env.PUBLIC_URL}/images/gonImages/6_eye/eye_${this.state.choice_evolution}${this.state.choice_eye}${this.state.choice_eyeColor}.png`}/>
                    </div>
                    <div class="absolute">
                      <img src={`${process.env.PUBLIC_URL}/images/gonImages/7_mouth/mouth_${this.state.choice_evolution}${this.state.choice_mouth}.png`}/>
                    </div>
                    <div class="absolute">
                      <img src={`${process.env.PUBLIC_URL}/images/gonImages/8_nose/nose_${this.state.choice_evolution}${this.state.choice_nose}.png`}/>
                    </div>
                  </div>
                ) : (
                  <div className="card-image">
                    <img src={`${process.env.PUBLIC_URL}/images/Transparency.png`}/>
                    <div class="absolute">
                      <a class="modal-trigger" href="#modal1"><img src={`${process.env.PUBLIC_URL}/images/btn_select_gon.png`}/></a>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div class="col s12 m6 l6">
              {this.state.situation === null &&
                <a class="waves-effect waves-light btn-large col s12" onClick={this.btnBattleStart}>OK, 배틀 시작</a>
              }
              {this.state.situation === 'update' &&
                <a class="waves-effect waves-light btn-large col s12" onClick={this.btnBattleStart}>OK, 배틀 시작</a>
              }
              {this.state.situation === 'Matching' &&
                <a class="waves-effect waves-light btn-large col s12" onClick={this.btnBattleCancle}>OK, 배틀 취소</a>
              }
              {this.state.situation === 'during battle' &&
                <a class="waves-effect waves-light btn-large col s12">전투중</a>
              }
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
  graphql(battleStart, { name: 'battleStart' }),
  graphql(battleCancle, { name: 'battleCancle' }),
  graphql(battleUpdate, { name: 'battleUpdate' })
)(battles)
