import React, { Component } from 'react'
import { graphql, compose } from 'react-apollo'
import { Link, Redirect } from 'react-router-dom'
import { finduser, dragons, editUserDragonState, battleUpdate, addUserIcon } from './queries'
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
    this.handleAddIcon = this.handleAddIcon.bind(this)
  }
  handleAddIcon(e) {
    this.props.addUserIcon({ variables: { email: localStorage.getItem('email'), number: e } })
      .then((res) => {
        console.log(res)
      })
      .catch((errors) => {
        console.log('errors: ', errors)
      })
  }
  render() {
    if (!this.props.finduser.loading && !this.props.data.loading) {
      console.log('this.props', this.props.data)
      let dcx = 0
      for (let mdl = 0; mdl < this.props.finduser.finduser.myDragons.length; mdl += 1) {
        for (let dl = 0; dl < this.props.data.dragons.length; dl += 1) {
          if (this.props.finduser.finduser.myDragons[mdl] === this.props.data.dragons[dl].serial) {
            // 소유한 모든 용 스테이트, 쿨타임 확인, 수정
            if (this.props.data.dragons[dl].state === 'Resting' || this.props.data.dragons[dl].state === 'brooding' || this.props.data.dragons[dl].state === 'Egg' || this.props.data.dragons[dl].state === 'Sell' || this.props.data.dragons[dl].state === 'Siring' || this.props.data.dragons[dl].state === 'during battle') {
              if (Date.now() > this.props.data.dragons[dl].cooldown[1]) { // 쿨타임 이후
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
            this.state.dragonsComb[dcx] = {
              name: this.props.data.dragons[dl].name,
              serial: this.props.data.dragons[dl].serial,
              state: this.state.change_state,
              choice_sword: this.props.data.dragons[dl].choice_sword,
              choice_shield: this.props.data.dragons[dl].choice_shield,
              choice_cbg: this.props.data.dragons[dl].choice_cbg,
              comb: this.props.data.dragons[dl].combination,
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
      }
      this.state.dragonsComb.reverse() // 최신순으로 정렬
      console.log('dragonsComb.reverse : ', this.state.dragonsComb)

      // 나의 아이콘 유무 확인
      let level1 = false // 최초 1단계용 획득
      let level2 = false // 최초 2단계용 획득
      let level3 = false // 최초 3단계용 획득
      let gons10 = false // 10개용 획득
      let gons50 = false // 50개용 획득
      let gons100 = false // 100개용 획득
      let gons300 = false // 300개용 획득
      let gons500 = false // 500개용 획득
      let gons1000 = false // 1000개용 획득
      let mutant = false // 돌연변이용 획득
      for (let il = 0; il < this.props.finduser.finduser.icon.length; il += 1) {
        if (this.props.finduser.finduser.icon[il].number === '02') {
          level1 = true
        }
        if (this.props.finduser.finduser.icon[il].number === '03') {
          level2 = true
        }
        if (this.props.finduser.finduser.icon[il].number === '04') {
          level3 = true
        }
        if (this.props.finduser.finduser.icon[il].number === '05') {
          gons10 = true
        }
        if (this.props.finduser.finduser.icon[il].number === '06') {
          gons50 = true
        }
        if (this.props.finduser.finduser.icon[il].number === '07') {
          gons100 = true
        }
        if (this.props.finduser.finduser.icon[il].number === '08') {
          gons300 = true
        }
        if (this.props.finduser.finduser.icon[il].number === '09') {
          gons500 = true
        }
        if (this.props.finduser.finduser.icon[il].number === '10') {
          gons1000 = true
        }
        if (this.props.finduser.finduser.icon[il].number === '11') {
          mutant = true
        }
      }
      // 최초 1,2,3단계, 돌연변이 획득시 아이콘추가
      for (let mdl = 0; mdl < this.props.finduser.finduser.myDragons.length; mdl += 1) {
        for (let dl = 0; dl < this.props.data.dragons.length; dl += 1) {
          if (this.props.finduser.finduser.myDragons[mdl] === this.props.data.dragons[dl].serial) {
            if (level1 === false && this.props.data.dragons[dl].combination.substring(0, 2) === '01') {
              this.handleAddIcon('02')
              level1 = true
            }
            if (level2 === false && this.props.data.dragons[dl].combination.substring(0, 2) === '02') {
              this.handleAddIcon('03')
              level2 = true
            }
            if (level3 === false && this.props.data.dragons[dl].combination.substring(0, 2) === '03') {
              this.handleAddIcon('04')
              level3 = true
            }
            if (mutant === false && this.props.data.dragons[dl].combination.substring(0, 2) === '04') {
              this.handleAddIcon('11')
              mutant = true
            }
          }
        }
      }
      // 용개수 충족시 아이콘추가
      const gl = this.props.finduser.finduser.myDragons.length
      if (gons10 === false && gl >= 10 && gl < 50) {
        this.handleAddIcon('05')
        gons10 = true
      }
      if (gons50 === false && gl >= 50 && gl < 100) {
        this.handleAddIcon('06')
        gons50 = true
      }
      if (gons100 === false && gl >= 100 && gl < 300) {
        this.handleAddIcon('07')
        gons100 = true
      }
      if (gons300 === false && gl >= 300 && gl < 500) {
        this.handleAddIcon('08')
        gons300 = true
      }
      if (gons500 === false && gl >= 500 && gl < 1000) {
        this.handleAddIcon('09')
        gons500 = true
      }
      if (gons1000 === false && gl >= 1000) {
        this.handleAddIcon('10')
        gons1000 = true
      }
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
    console.log('pages : ', pages)
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
                              {item.evolution === '01' &&
                                <img src={`${process.env.PUBLIC_URL}/images/gonImages/egg/egg.png`}/>
                              }
                              {item.evolution === '02' &&
                                <img src={`${process.env.PUBLIC_URL}/images/gonImages/egg/egg2.png`}/>
                              }
                              {item.evolution === '03' &&
                                <img src={`${process.env.PUBLIC_URL}/images/gonImages/egg/egg3.png`}/>
                              }
<<<<<<< HEAD
                              {item.evolution === '04' &&
                                <img src={`${process.env.PUBLIC_URL}/images/gonImages/egg/egg.png`}/>
                              }
                            </div>
                          }
                          {item.state !== 'Egg' && item.evolution !== '03' && item.evolution !== '04' && item.evolution !== '05' &&
=======
                            </div>
                          }
                          {item.state !== 'Egg' && item.evolution !== '03' &&
>>>>>>> 7676133e769071734de79e4a5a6b51cb8bd7ec41
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
                          {item.state !== 'Egg' && item.evolution === '03' &&
                            <div class="absolute">
                              <img src={`${process.env.PUBLIC_URL}/images/gonImages/step3/step3_03${item.comb.substring(4, 6)}${item.comb.substring(6, 8)}.png`}/>
                            </div>
                          }
<<<<<<< HEAD
                          {item.state !== 'Egg' && item.evolution === '04' &&
                            <div class="absolute">
                              <img src={`${process.env.PUBLIC_URL}/images/gonImages/step4/step4_04${item.comb.substring(4, 6)}${item.comb.substring(6, 8)}.png`}/>
                            </div>
                          }
                          {item.state !== 'Egg' && item.evolution === '05' &&
                            <div class="absolute">
                              <img src={`${process.env.PUBLIC_URL}/images/gonImages/step5/step5_05${item.comb.substring(4, 6)}${item.comb.substring(6, 8)}.png`}/>
                            </div>
                          }
=======
>>>>>>> 7676133e769071734de79e4a5a6b51cb8bd7ec41
                        </div>
                        <div className='item'>
                          {item.state !== 'Egg' &&
                            <div className='l12'>
                              <img src={`${process.env.PUBLIC_URL}/images/brief_Info/new_icon.png`}/>
                              <img src={`${process.env.PUBLIC_URL}/images/brief_Info/level_${item.evolution}.png`}/>
                              <img src={`${process.env.PUBLIC_URL}/images/brief_Info/trophy.png`}/>
                              {item.choice_sword !== 'null' &&
                                <img src={`${process.env.PUBLIC_URL}/images/item/sword/preview/sword_${item.choice_sword}_preview.png`}/>
                              }
                              {item.choice_shield !== 'null' &&
                                <img src={`${process.env.PUBLIC_URL}/images/item/shield/preview/shield_${item.choice_shield}_preview.png`}/>
                              }
                              <br/>state : {item.state}
                            </div>
                          }
                          {item.state === 'Egg' &&
                            <div className='l12'>
                              <p>'egg'</p>
                            </div>
                          }
                        </div>
                        <div className="card-action">
                          <a href={`/gons/${item.serial}`}>{item.serial}</a>
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
  graphql(editUserDragonState, { name: 'editUserDragonState' }),
  graphql(battleUpdate, { name: 'battleUpdate' }),
  graphql(addUserIcon, { name: 'addUserIcon' })
)(MyGons)
