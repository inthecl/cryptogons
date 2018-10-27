import React, { Component } from 'react'
import { graphql, compose } from 'react-apollo'
import { finduser, dragons, battleUpdate, editUserDragonState } from './queries'
import './App.css'
import Layout from './Layout'
import BattleHeader from './BattleHeader'

class record extends Component {
  constructor(props) {
    super(props)
    this.state = {
      record: [],
      reverse: [],
      situation: null
    }
  }
  render() {
    if (!this.props.finduser.loading && !this.props.data.loading) {
      this.state.record = this.props.finduser.finduser.battle_history
      for (let dl = 0; dl < this.props.data.dragons.length; dl += 1) {
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
          // 배틀중일 경우 마지막 전적은 제거
          if (this.state.situation !== 'update') {
            if (this.props.data.dragons[dl].state === 'during battle') {
              this.state.record = this.props.finduser.finduser.battle_history.slice(0, -1)
            }
          }
        }
      }
      for (let r = 0; r < this.state.record.length; r += 1) {
        this.state.reverse[r] = this.state.record[r]
      }
      this.state.reverse.reverse()
    }
    return (
      <Layout>
        <BattleHeader/>
        <div class="detail-Explanation margin-top-50">
          <div class="row">

            {this.state.reverse.map(item =>
              <div key={item.id}>
                <ul class="collection valign-wrapper">
                  <div class="col s12 m2 l2">
                    <div className="card z-depth-0">
                      <div className="card-image">
                        <img src={`${process.env.PUBLIC_URL}/images/brief_info/${item.result}.png`}/>
                      </div>
                    </div>
                  </div>
                  <div class="col s12 m3 l3">
                    <div className="card z-depth-0">
                      <div className="card-image">

                        <img src={`${process.env.PUBLIC_URL}/images/gonImages/1_property/property_${item.mycomb.substring(2, 4)}.png`}/>
                        {item.mycomb.substring(0, 2) !== '03' &&
                          <div>
                            <div class="absolute">
                              <img src={`${process.env.PUBLIC_URL}/images/gonImages/2_wing/wing_${item.mycomb.substring(0, 2)}${item.mycomb.substring(4, 6)}${item.mycomb.substring(6, 8)}.png`}/>
                            </div>
                            <div class="absolute">
                              <img src={`${process.env.PUBLIC_URL}/images/gonImages/3_horn/horn_${item.mycomb.substring(0, 2)}${item.mycomb.substring(8, 10)}${item.mycomb.substring(10, 12)}.png`}/>
                            </div>
                            <div class="absolute">
                              <img src={`${process.env.PUBLIC_URL}/images/gonImages/4_tail/tail_${item.mycomb.substring(0, 2)}${item.mycomb.substring(12, 14)}${item.mycomb.substring(16, 18)}.png`}/>
                            </div>
                            <div class="absolute">
                              <img src={`${process.env.PUBLIC_URL}/images/gonImages/5_body/body_${item.mycomb.substring(0, 2)}${item.mycomb.substring(14, 16)}${item.mycomb.substring(16, 18)}.png`}/>
                            </div>
                            <div class="absolute">
                              <img src={`${process.env.PUBLIC_URL}/images/gonImages/6_eye/eye_${item.mycomb.substring(0, 2)}${item.mycomb.substring(18, 20)}${item.mycomb.substring(20, 22)}.png`}/>
                            </div>
                            <div class="absolute">
                              <img src={`${process.env.PUBLIC_URL}/images/gonImages/7_mouth/mouth_${item.mycomb.substring(0, 2)}${item.mycomb.substring(22, 24)}.png`}/>
                            </div>
                            <div class="absolute">
                              <a href={`/gons/${item.mydragon}`}><img src={`${process.env.PUBLIC_URL}/images/gonImages/8_nose/nose_${item.mycomb.substring(0, 2)}${item.mycomb.substring(24, 26)}.png`}/></a>
                            </div>
                          </div>
                        }
                        {item.mycomb.substring(0, 2) === '03' &&
                          <div class="absolute">
                            <img src={`${process.env.PUBLIC_URL}/images/gonImages/step3/step3_03${item.mycomb.substring(4, 6)}${item.mycomb.substring(6, 8)}.png`}/>
                          </div>
                        }
                      </div>
                    </div>
                  </div>
                  <div class="col s12 m2 l2">
                    <div className="card z-depth-0">
                      <div className="card-image">
                        <img src={`${process.env.PUBLIC_URL}/images/brief_info/versus.png`}/>
                      </div>
                    </div>
                  </div>
                  <div class="col s12 m3 l3">
                    <div className="card z-depth-0">
                      <div className="card-image">

                        <img src={`${process.env.PUBLIC_URL}/images/gonImages/1_property/property_${item.enemycomb.substring(2, 4)}.png`}/>
                        {item.mycomb.substring(0, 2) !== '03' &&
                          <div>
                            <div class="absolute">
                              <img src={`${process.env.PUBLIC_URL}/images/gonImages/2_wing/wing_${item.enemycomb.substring(0, 2)}${item.enemycomb.substring(4, 6)}${item.enemycomb.substring(6, 8)}.png`}/>
                            </div>
                            <div class="absolute">
                              <img src={`${process.env.PUBLIC_URL}/images/gonImages/3_horn/horn_${item.enemycomb.substring(0, 2)}${item.enemycomb.substring(8, 10)}${item.enemycomb.substring(10, 12)}.png`}/>
                            </div>
                            <div class="absolute">
                              <img src={`${process.env.PUBLIC_URL}/images/gonImages/4_tail/tail_${item.enemycomb.substring(0, 2)}${item.enemycomb.substring(12, 14)}${item.enemycomb.substring(16, 18)}.png`}/>
                            </div>
                            <div class="absolute">
                              <img src={`${process.env.PUBLIC_URL}/images/gonImages/5_body/body_${item.enemycomb.substring(0, 2)}${item.enemycomb.substring(14, 16)}${item.enemycomb.substring(16, 18)}.png`}/>
                            </div>
                            <div class="absolute">
                              <img src={`${process.env.PUBLIC_URL}/images/gonImages/6_eye/eye_${item.enemycomb.substring(0, 2)}${item.enemycomb.substring(18, 20)}${item.enemycomb.substring(20, 22)}.png`}/>
                            </div>
                            <div class="absolute">
                              <img src={`${process.env.PUBLIC_URL}/images/gonImages/7_mouth/mouth_${item.enemycomb.substring(0, 2)}${item.enemycomb.substring(22, 24)}.png`}/>
                            </div>
                            <div class="absolute">
                              <a href={`/gons/${item.enemydragon}`}><img src={`${process.env.PUBLIC_URL}/images/gonImages/8_nose/nose_${item.enemycomb.substring(0, 2)}${item.enemycomb.substring(24, 26)}.png`}/></a>
                            </div>
                          </div>
                        }
                        {item.enemycomb.substring(0, 2) === '03' &&
                          <div class="absolute">
                            <img src={`${process.env.PUBLIC_URL}/images/gonImages/step3/step3_03${item.enemycomb.substring(4, 6)}${item.enemycomb.substring(6, 8)}.png`}/>
                          </div>
                        }

                      </div>
                    </div>
                  </div>
                  <div class="col s12 m2 l2">
                    <div className="card z-depth-0">
                      <div className="card-image">
                        {item.result === 'win' &&
                        <img src={`${process.env.PUBLIC_URL}/images/brief_info/lose.png`}/>
                        }
                        {item.result === 'lose' &&
                        <img src={`${process.env.PUBLIC_URL}/images/brief_info/win.png`}/>
                        }
                      </div>
                    </div>
                  </div>
                </ul>
              </div>)}

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
)(record)
