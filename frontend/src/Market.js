import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import _ from 'underscore'
import Layout from './Layout'
import MaterialPagination from './MaterialPagination'

const dragons = gql`
query { dragons {
  name
  combination
  birthday
  price
  serial
} }
`

class Market extends Component {
  constructor(props) {
    super(props)
    this.state = {
      dragonsComb: [],
      pages: null,
      dia: '300',
      point: '45'
    }
  }
  render() {
    if (!this.props.data.loading) {
      for (let dl = 0; dl < this.props.data.dragons.length; dl += 1) {
        this.state.dragonsComb[dl] = {
          name: this.props.data.dragons[dl].name,
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
      }
      console.log('1 : ', this.state.dragonsComb[0])
      console.log('2 : ', this.state.dragonsComb[1])
      console.log('3 : ', this.state.dragonsComb[2])
      console.log('4 : ', this.state.dragonsComb[3])
      console.log('5 : ', this.state.dragonsComb[4])
    }
    const { pagenum } = this.props.match.params
    const lastItem = this.state.dragonsComb.length
    const lastPage = lastItem / 12
    const startItem = (pagenum - 1) * 12
    let endItem = pagenum * 12
    if (pagenum < 1) return <Redirect to="/Market/1"/>
    if (pagenum > lastPage + 1) return <Redirect to="/Market/1"/>
    if (endItem > lastItem) endItem = lastItem
    this.state.pages = this.state.dragonsComb.slice(startItem, endItem)
    console.log('lastPage:', this.state.pages)

    return (
      <Layout>
        {this.props.data.loading ? (
          <h1>loading...</h1>
        ) : (
          <div className='container center'>
            <div className="row">

              <div className="col l12 m12 s12">
                <div className="col s12 m6 l6 left left-align">
                  <h2>Market</h2>
                </div>
                <div className="col s12 m6 l6 right right-align">
                  <h5>다이아 {this.state.dia} 포인트 {this.state.point}</h5>
                </div>
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

              {this.state.pages.map(item =>
                <div key={item.id}>
                  <div className="col s12 m6 l3 margin-top-15">
                    <div className="card">
                      <div className="card-image">
                        <img src={`${process.env.PUBLIC_URL}/images/gonImages/1_property/property_${item.property}.png`}/>
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
                        <span className="card-title">Card Title</span>
                      </div>
                      <div className="card-content">
                        <p>I am a very simple card.</p>
                      </div>
                      <div className="card-action">
                        <Link to={`/MarketSale/' ${item.name}`}>{item.name}</Link>
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

export default graphql(dragons)(Market)

