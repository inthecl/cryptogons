import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom'
import { graphql, compose } from 'react-apollo'
import { finduser, dragons } from './queries'
import Layout from './Layout'
import MaterialPagination from './MaterialPagination'

class Market extends Component {
  constructor(props) {
    super(props)
    this.state = {
      dragonsComb: [],
      release_date: null,
      user_dia: null,
      user_gold: null,
      user_trophy: null
    }
  }
  render() {
    console.log('this.props : ', this.props)
    if (!this.props.data.loading && !this.props.finduser.loading) {
      if (localStorage.getItem('email') !== null) {
        this.state.user_dia = this.props.finduser.finduser.diamond
        this.state.user_gold = this.props.finduser.finduser.gold
        this.state.user_trophy = this.props.finduser.finduser.trophy
      }
      let dcx = 0
      for (let dl = 0; dl < this.props.data.dragons.length; dl += 1) {
        if (this.props.data.dragons[dl].state === 'New' || this.props.data.dragons[dl].state === 'Sell' || this.props.data.dragons[dl].state === 'Siring') {
          if (this.props.data.dragons[dl].cooldown[1] === null || Date.now() <= this.props.data.dragons[dl].cooldown[1]) { // 쿨타임 이전
            this.state.dragonsComb[dcx] = {
              release_date: this.props.data.dragons[dl].release_date,
              name: this.props.data.dragons[dl].name,
              serial: this.props.data.dragons[dl].serial,
              state: this.props.data.dragons[dl].state,
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
      this.state.dragonsComb.sort((a, b) => { // 최신순으로 정렬
        return b['release_date'] - a['release_date']
      })
      console.log('this.state.dragonsComb : ', this.state.dragonsComb)
    }
    const { pagenum } = this.props.match.params
    const lastItem = this.state.dragonsComb.length
    const lastPage = lastItem / 12
    const startItem = (pagenum - 1) * 12
    let endItem = pagenum * 12
    if (pagenum < 1) return <Redirect to="/Market/1"/>
    if (pagenum > lastPage + 1) return <Redirect to="/Market/1"/>
    if (endItem > lastItem) endItem = lastItem
    const pages = this.state.dragonsComb.slice(startItem, endItem)
    console.log('pages:', pages)

    return (
      <Layout>
        {this.props.data.loading ? (
          <h1>loading...</h1>
        ) : (
          <div className='container center'>
            <div className="row">

              <div className="col l12 m12 s12 margin-bottom-30">
                <div className="col s12 m6 l6 left left-align">
                  <h2>Market</h2>
                </div>
                { localStorage.getItem('email') !== null &&
                  <div className="col s12 m6 l6 right right-align">
                    <h5><img src={`${process.env.PUBLIC_URL}/images/brief_info/dia.png`}/> {this.state.user_dia}
                      <img src={`${process.env.PUBLIC_URL}/images/brief_info/gold.png`}/> {this.state.user_gold}
                      <img src={`${process.env.PUBLIC_URL}/images/brief_info/trophy2.png`}/> {this.state.user_trophy}</h5>
                  </div>
                }
              </div>

              <div className="col s12 m12 l12 margin-top-15">
                <nav>
                  <div class="nav-wrapper teal">
                    <form>
                      <div class="input-field">
                        <input id="search" type="search" required/>
                        <label class="label-icon" for="search"><i class="material-icons">search</i></label>
                        <i class="material-icons">close</i>
                      </div>
                    </form>
                  </div>
                </nav>
              </div>

              <div className="col l12 m12 margin-top-15 margin-bottom-15">
                <div className="col s12 m6 l6 left left-align">
                  <form action="#">
                    <p>
                      <label class="margin-right-10">
                        <input class="with-gap" name="group1" type="radio" checked />
                        <span>New</span>
                      </label>
                      <label class="margin-right-10">
                        <input class="with-gap" name="group1" type="radio" />
                        <span>for sale</span>
                      </label>
                      <label class="margin-right-10">
                        <input class="with-gap" name="group1" type="radio"/>
                        <span>siring</span>
                      </label>
                      <label>
                        <input class="with-gap" name="group1" type="radio" />
                        <span>all</span>
                      </label>
                    </p>
                  </form>
                </div>
                <div className="col s12 m6 l6 right right-align margin-top-15">
                  <ul id="dropdown2" class="dropdown-content">
                    <li><a href="#!">one<span class="badge">1</span></a></li>
                    <li><a href="#!">two<span class="new badge">1</span></a></li>
                    <li><a href="#!">three</a></li>
                  </ul>
                  <a class="btn dropdown-trigger" href="#!" data-target="dropdown2">Dropdown<i class="material-icons right">arrow_drop_down</i></a>
                  <div class="switch margin-top-15">
                    <label>
                      Off
                      <input type="checkbox"/>
                      <span class="lever"></span>
                      On
                    </label>
                  </div>
                </div>
              </div>

              {pages.map(item =>
                <div key={item.id}>
                  <div className="col s12 m6 l3 margin-top-15">
                    <div className="card">
                      <div className="card-image">
                        <img src={`${process.env.PUBLIC_URL}/images/gonImages/1_property/property_${item.property}.png`}/>
                        {item.evolution !== '03' && item.evolution !== '04' && item.evolution !== '05' &&
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
                        {item.evolution === '03' &&
                          <div class="absolute">
                            <img src={`${process.env.PUBLIC_URL}/images/gonImages/step3/step3_03${item.comb.substring(4, 6)}${item.comb.substring(6, 8)}.png`}/>
                          </div>
                        }
                        {item.evolution === '04' &&
                          <div class="absolute">
                            <img src={`${process.env.PUBLIC_URL}/images/gonImages/step4/step4_04${item.comb.substring(4, 6)}${item.comb.substring(6, 8)}.png`}/>
                          </div>
                        }
                        {item.evolution === '05' &&
                          <div class="absolute">
                            <img src={`${process.env.PUBLIC_URL}/images/gonImages/step5/step5_05${item.comb.substring(4, 6)}${item.comb.substring(6, 8)}.png`}/>
                          </div>
                        }
                        <span className="card-title">Card Title</span>
                      </div>
                      <div className="card-content">
                        {item.state}
                      </div>
                      <div className="card-action">
                        <Link to={`/gons/${item.serial}`}>{item.serial}</Link>
                      </div>
                    </div>
                  </div>
                </div>)}

            </div>
            <MaterialPagination linkPath="Market" pageNum={pagenum} lastPage={lastPage} />
          </div>
        )}
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
  graphql(dragons)
)(Market)

