import React, { Component } from 'react'
import { graphql, compose } from 'react-apollo'
import { Link, Redirect } from 'react-router-dom'
import { finduser, dragons, editUserDragonState } from './queries'
import './App.css'
import Layout from './Layout'
import MyGonHeader from './MyGonHeader'
import MaterialPagination from './MaterialPagination'

class MyGons extends Component {
  constructor(props) {
    super(props)
    this.state = {
      dragonsComb: [],
      change_state: null
    }
  }
  render() {
    if (!this.props.data.loading) {
      console.log('this.props', this.props.data)
      let dcx = 0
      for (let dl = 0; dl < this.props.data.dragons.length; dl += 1) {
        if (this.props.data.dragons[dl].email === localStorage.getItem('email')) {
          // 소유한 모든 용 스테이트, 쿨타임 확인, 수정
          if (this.props.data.dragons[dl].state === 'Resting' || this.props.data.dragons[dl].state === 'brooding' || this.props.data.dragons[dl].state === 'Egg' || this.props.data.dragons[dl].state === 'during battle') {
            if (Date.now() >= this.props.data.dragons[dl].cooldown[1]) {
              this.state.change_state = 'Normal'
              this.props.mutate({ variables: { email: localStorage.getItem('email'), serial: this.props.data.dragons[dl].serial, change_state: 'Normal' } })
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
          this.state.dragonsComb[dcx] = {
            name: this.props.data.dragons[dl].name,
            serial: this.props.data.dragons[dl].serial,
            state: this.state.change_state,
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
      }
      console.log('this.state.dragonsComb : ', this.state.dragonsComb)
    }
    const { pagenum } = this.props.match.params
    console.log('this.props.match.params:', this.props.match.params)
    const lastItem = this.state.dragonsComb.length
    console.log('this.state.dragonsComb.length', this.state.dragonsComb.length)
    const lastPage = lastItem / 12
    const startItem = (pagenum - 1) * 12
    let endItem = pagenum * 12
    if (pagenum < 1) return <Redirect to="/Mygon/1"/>
    if (pagenum > lastPage + 1) return <Redirect to="/Mygon/1"/>
    if (endItem > lastItem) endItem = lastItem
    const pages = this.state.dragonsComb.slice(startItem, endItem)
    return (
      <Layout>
        <MyGonHeader/>
        <div class="row container">

          <div class="col s6">
            <br/>
            <form action="#">
              <span className="margin-right-10">
                <label>
                  <input name="group1" type="radio" checked/>
                  <span>all</span>
                </label>
              </span>
              <span className="margin-right-10">
                <label>
                  <input name="group1" type="radio"/>
                  <span>for sale</span>
                </label>
              </span>
              <span>
                <label>
                  <input name="group1" type="radio"/>
                  <span>siring</span>
                </label>
              </span>
            </form>
          </div>
          <div class="col s6">
            <br/>
            <div class="input-field col l6 s12 right">
              <select>
                <option value="" disabled selected>Choose your option</option>
                <option value="1">Option 1</option>
                <option value="2">Option 2</option>
                <option value="3">Option 3</option>
              </select>
              <label>Materialize Select</label>
              <br/>
            </div>
          </div>

          <div class="col s12">
            <div className='center'>
              <div className="row">
                {pages.map(item =>
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
                          {item.state === 'Egg' &&
                            <div class="absolute">
                              <img src={`${process.env.PUBLIC_URL}/images/gonImages/egg/egg.png`}/>
                            </div>
                          }
                          {item.state !== 'Egg' &&
                            <div>
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
                          }
                        </div>
                        <div className='item'>
                          <div className='l12'>
                            <img src={`${process.env.PUBLIC_URL}/images/brief_Info/level_1.png`}/>
                            <img src={`${process.env.PUBLIC_URL}/images/brief_Info/level_2.png`}/>
                            <img src={`${process.env.PUBLIC_URL}/images/brief_Info/level_3.png`}/>
                            <img src={`${process.env.PUBLIC_URL}/images/brief_Info/mutation.png`}/>
                            <img src={`${process.env.PUBLIC_URL}/images/brief_Info/new_icon.png`}/>
                            <img src={`${process.env.PUBLIC_URL}/images/brief_Info/trophy.png`}/>
                            state : {item.state}
                          </div>
                        </div>
                        <div className="card-action">
                          {item.state !== 'Egg' &&
                            <a href={`/gons/${item.serial}`}>{item.serial}{item.state}</a>
                          }
                          {item.state === 'Egg' &&
                            'egg'
                          }
                        </div>
                      </div>
                    </div>
                  </div>)}
              </div>
              <MaterialPagination linkPath="MyGons" pageNum={pagenum} lastPage={lastPage} />
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
  graphql(editUserDragonState),
)(MyGons)
