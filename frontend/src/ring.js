import React, { Component } from 'react'
import { graphql, compose } from 'react-apollo'
import './App.css'
import { finduser, dragons, editUserDragonState, battleUpdate } from './queries'
import Layout from './Layout'
import BattleHeader from './BattleHeader'

class ring extends Component {
  constructor(props) {
    super(props)
    this.state = {
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
      choice_nose: null,
      enemy_serial: null,
      enemy_comb: null,
      enemy_cbg: 'null',
      enemy_evolution: null,
      enemy_property: null,
      enemy_wing: null,
      enemy_wingColor: null,
      enemy_horn: null,
      enemy_hornColor: null,
      enemy_tail: null,
      enemy_body: null,
      enemy_bodyColor: null,
      enemy_eye: null,
      enemy_eyeColor: null,
      enemy_mouth: null,
      enemy_nose: null
    }
  }

  render() {
    if (!this.props.data.loading && !this.props.finduser.loading) {
      console.log('this.props', this.props)
      const bh = this.props.finduser.finduser.battle_history.length - 1
      for (let dl = 0; dl < this.props.data.dragons.length; dl += 1) {
        if (this.props.finduser.finduser.battle_history.length !== 0) { // 상대방의 정보를 미리 받아둔다.
          if (this.props.data.dragons[dl].serial === this.props.finduser.finduser.battle_history[bh].enemydragon) {
            this.state.enemy_comb = this.props.data.dragons[dl].combination
            this.state.enemy_serial = this.props.data.dragons[dl].serial
            this.state.enemy_cbg = this.props.data.dragons[dl].choice_cbg
            this.state.enemy_evolution = this.props.data.dragons[dl].combination.substring(0, 2)
            this.state.enemy_property = this.props.data.dragons[dl].combination.substring(2, 4)
            this.state.enemy_wing = this.props.data.dragons[dl].combination.substring(4, 6)
            this.state.enemy_wingColor = this.props.data.dragons[dl].combination.substring(6, 8)
            this.state.enemy_horn = this.props.data.dragons[dl].combination.substring(8, 10)
            this.state.enemy_hornColor = this.props.data.dragons[dl].combination.substring(10, 12)
            this.state.enemy_tail = this.props.data.dragons[dl].combination.substring(12, 14)
            this.state.enemy_body = this.props.data.dragons[dl].combination.substring(14, 16)
            this.state.enemy_bodyColor = this.props.data.dragons[dl].combination.substring(16, 18)
            this.state.enemy_eye = this.props.data.dragons[dl].combination.substring(18, 20)
            this.state.enemy_eyeColor = this.props.data.dragons[dl].combination.substring(20, 22)
            this.state.enemy_mouth = this.props.data.dragons[dl].combination.substring(22, 24)
            this.state.enemy_nose = this.props.data.dragons[dl].combination.substring(24, 26)
          }
        }
        if (this.props.data.dragons[dl].email === localStorage.getItem('email')) {
          // 소유한 모든 용 스테이트, 쿨타임 확인, 수정
          if (this.props.data.dragons[dl].state === 'Resting' || this.props.data.dragons[dl].state === 'brooding' || this.props.data.dragons[dl].state === 'Egg' || this.props.data.dragons[dl].state === 'Sell' || this.props.data.dragons[dl].state === 'Siring' || this.props.data.dragons[dl].state === 'during battle') {
            if (Date.now() > this.props.data.dragons[dl].cooldown[1]) {
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
        <div class="container" >
          <div class="row">

            <div class="detail-Explanation margin-top-50" >
              <div class="row valign-wrapper">
                <div class="col s12 m5 l5">
                  <div className="card z-depth-0">
                    {this.state.choiceGon ? (
                      <div className="card-image">
                        {this.state.choice_cbg === 'null' &&
                          <img src={`${process.env.PUBLIC_URL}/images/gonImages/1_property/property_${this.state.choice_property}.png`}/>
                        }
                        {this.state.choice_cbg !== 'null' &&
                          <img src={`${process.env.PUBLIC_URL}/images/item/custom_bg/cbg_${this.state.choice_cbg}.png`}/>
                        }
                        {this.state.choice_evolution !== '03' && this.state.choice_evolution !== '04' && this.state.choice_evolution !== '05' &&
                          <div>
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
                        }
                        {this.state.choice_evolution === '03' &&
                          <div class="absolute">
                            <img src={`${process.env.PUBLIC_URL}/images/gonImages/step3/step3_03${this.state.choice_comb.substring(4, 6)}${this.state.choice_comb.substring(6, 8)}.png`}/>
                          </div>
                        }
                        {this.state.choice_evolution === '04' &&
                          <div class="absolute">
                            <img src={`${process.env.PUBLIC_URL}/images/gonImages/step4/step4_04${this.state.choice_comb.substring(4, 6)}${this.state.choice_comb.substring(6, 8)}.png`}/>
                          </div>
                        }
                        {this.state.choice_evolution === '05' &&
                          <div class="absolute">
                            <img src={`${process.env.PUBLIC_URL}/images/gonImages/step5/step5_05${this.state.choice_comb.substring(4, 6)}${this.state.choice_comb.substring(6, 8)}.png`}/>
                          </div>
                        }
                      </div>
                    ) : (
                      <div className="card-image">
                        <img src={`${process.env.PUBLIC_URL}/images/Transparency.png`}/>
                        <div class="absolute">
                          <img src={`${process.env.PUBLIC_URL}/images/brief_info/silhouette.png`}/>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div class="col s12 m2 l2">
                  <div className="card z-depth-0">
                    <div className="card-image">
                      <img src={`${process.env.PUBLIC_URL}/images/brief_info/versus.png`}/>
                    </div>
                  </div>
                </div>

                <div class="col s12 m5 l5">
                  <div className="card z-depth-0">
                    <div className="card-image">
                      {this.state.situation === null &&
                        <img src={`${process.env.PUBLIC_URL}/images/brief_info/silhouette.png`}/>
                      }
                      {this.state.situation === 'update' &&
                        <img src={`${process.env.PUBLIC_URL}/images/brief_info/silhouette.png`}/>
                      }
                      {this.state.situation === 'Matching' &&
                        <img src={`${process.env.PUBLIC_URL}/images/brief_info/matching.png`}/>
                      }
                      {this.state.situation === 'during battle' &&
                        <div>
                          {this.state.enemy_cbg === 'null' &&
                          <img src={`${process.env.PUBLIC_URL}/images/gonImages/1_property/property_${this.state.enemy_property}.png`}/>
                          }
                          {this.state.enemy_cbg !== 'null' &&
                            <img src={`${process.env.PUBLIC_URL}/images/item/custom_bg/cbg_${this.state.enemy_cbg}.png`}/>
                          }
                          {this.state.enemy_evolution !== '03' && this.state.enemy_evolution !== '04' && this.state.enemy_evolution !== '05' &&
                            <div>
                              <div class="absolute">
                                <img src={`${process.env.PUBLIC_URL}/images/gonImages/2_wing/wing_${this.state.enemy_evolution}${this.state.enemy_wing}${this.state.enemy_wingColor}.png`}/>
                              </div>
                              <div class="absolute">
                                <img src={`${process.env.PUBLIC_URL}/images/gonImages/3_horn/horn_${this.state.enemy_evolution}${this.state.enemy_horn}${this.state.enemy_hornColor}.png`}/>
                              </div>
                              <div class="absolute">
                                <img src={`${process.env.PUBLIC_URL}/images/gonImages/4_tail/tail_${this.state.enemy_evolution}${this.state.enemy_tail}${this.state.enemy_bodyColor}.png`}/>
                              </div>
                              <div class="absolute">
                                <img src={`${process.env.PUBLIC_URL}/images/gonImages/5_body/body_${this.state.enemy_evolution}${this.state.enemy_body}${this.state.enemy_bodyColor}.png`}/>
                              </div>
                              <div class="absolute">
                                <img src={`${process.env.PUBLIC_URL}/images/gonImages/6_eye/eye_${this.state.enemy_evolution}${this.state.enemy_eye}${this.state.enemy_eyeColor}.png`}/>
                              </div>
                              <div class="absolute">
                                <img src={`${process.env.PUBLIC_URL}/images/gonImages/7_mouth/mouth_${this.state.enemy_evolution}${this.state.enemy_mouth}.png`}/>
                              </div>
                              <div class="absolute">
                                <img src={`${process.env.PUBLIC_URL}/images/gonImages/8_nose/nose_${this.state.enemy_evolution}${this.state.enemy_nose}.png`}/>
                              </div>
                            </div>
                          }
                          {this.state.enemy_evolution === '03' &&
                            <div class="absolute">
                              <img src={`${process.env.PUBLIC_URL}/images/gonImages/step3/step3_03${this.state.enemy_comb.substring(4, 6)}${this.state.enemy_comb.substring(6, 8)}.png`}/>
                            </div>
                          }
                          {this.state.enemy_evolution === '04' &&
                            <div class="absolute">
                              <img src={`${process.env.PUBLIC_URL}/images/gonImages/step4/step4_04${this.state.enemy_comb.substring(4, 6)}${this.state.enemy_comb.substring(6, 8)}.png`}/>
                            </div>
                          }
                          {this.state.enemy_evolution === '05' &&
                            <div class="absolute">
                              <img src={`${process.env.PUBLIC_URL}/images/gonImages/step5/step5_05${this.state.enemy_comb.substring(4, 6)}${this.state.enemy_comb.substring(6, 8)}.png`}/>
                            </div>
                          }
                        </div>
                      }
                    </div>
                  </div>
                </div>
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
  graphql(battleUpdate, { name: 'battleUpdate' })
)(ring)
