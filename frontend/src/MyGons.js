import React, { Component } from 'react'
import _ from 'underscore'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import { Link, Redirect } from 'react-router-dom'
import './App.css'
import Layout from './Layout'
import MyGonHeader from './MyGonHeader'
import MaterialPagination from './MaterialPagination'

const finduser = gql`
query finduser($email: String!){
  finduser(email:$email) {
  email
  username
  name
  diamond
  gold
  iconNum
  dragons {
    name
    combination
    birthday
    price
    serial
  }
 }
}
`

class MyGons extends Component {
  constructor(props) {
    super(props)
    this.state = {
      dragonsComb: [],
      email: 'state_email',
      radio: 'state_radio',
      TestList: []

    }

    // 조합배열 생성
    let a
    let b
    let c
    let count = 0
    const combArr = []
    for (a = 1; a <= 3; a += 1) {
      for (b = 1; b <= 3; b += 1) {
        for (c = 1; c <= 3; c += 1) {
          combArr[count] = [a, b, c]
          count += 1
        }
      }
    }
    // 중복없는 난수배열 생성
    let x
    let y
    const randomArr = []
    for (x = 0; x <= 26; x += 1) {
      randomArr[x] = Math.floor(Math.random() * 27)
      for (y = 0; y < x; y += 1) {
        if (randomArr[x] === randomArr[y]) x -= 1
      }
    }

    this.exampleItems = _.range(1, 151).map(i => ({
      id: i,
      name: `Item ${i}`,
      comb0: combArr[randomArr[i % 26]][0],
      comb1: combArr[randomArr[i % 26]][1],
      comb2: combArr[randomArr[i % 26]][2]
    }))
  }
  render() {
    if (!this.props.data.loading) {
      console.log('this.props', this.props.data.finduser.dragons)
      for (let dl = 0; dl < this.props.data.finduser.dragons.length; dl += 1) {
        this.state.dragonsComb[dl] = {
          name: this.props.data.finduser.dragons[dl].name,
          serial: this.props.data.finduser.dragons[dl].serial,
          evolution: this.props.data.finduser.dragons[dl].combination.substring(0, 2),
          property: this.props.data.finduser.dragons[dl].combination.substring(2, 4),
          wing: this.props.data.finduser.dragons[dl].combination.substring(4, 6),
          wingColor: this.props.data.finduser.dragons[dl].combination.substring(6, 8),
          horn: this.props.data.finduser.dragons[dl].combination.substring(8, 10),
          hornColor: this.props.data.finduser.dragons[dl].combination.substring(10, 12),
          tail: this.props.data.finduser.dragons[dl].combination.substring(12, 14),
          body: this.props.data.finduser.dragons[dl].combination.substring(14, 16),
          bodyColor: this.props.data.finduser.dragons[dl].combination.substring(16, 18),
          eye: this.props.data.finduser.dragons[dl].combination.substring(18, 20),
          eyeColor: this.props.data.finduser.dragons[dl].combination.substring(20, 22),
          mouth: this.props.data.finduser.dragons[dl].combination.substring(22, 24),
          nose: this.props.data.finduser.dragons[dl].combination.substring(24, 26)
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
    const pages = this.state.dragonsComb.slice(startItem, endItem)
    console.log('lastPage:', this.state.pages)
    return (
      <Layout>
        <MyGonHeader/>
        <div class="row container">
          <div class="col s12">
            <ul class="tabs">
              <li class="tab col s4"><a class="active" href="#test1">Gons</a></li>
              <li class="tab col s4"><a href="#test2">장신구</a></li>
              <li class="tab col s4"><a href="#test3">배경</a></li>
            </ul>
          </div>
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
          <div id="test1" class="col s12">
            <div className='center'>
              <div className="row">
                {pages.map(item =>
                  <div key={item.id}>
                    <div className="col s12 m6 l3">
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
                        </div>
                        <div className="card-content">
                          <p>I am a very simple card. I am good at containing small bits of information.
                          I am convenient because I require little markup to use effectively.</p>
                        </div>
                        <div className="card-action">
                          <Link to={`/Detail/' ${item.serial}`}>{item.serial}</Link>
                        </div>
                      </div>
                    </div>
                  </div>)}
              </div>
              <MaterialPagination linkPath="MyGons" pageNum={pagenum} lastPage={lastPage} />
            </div>
          </div>
          <div id="test2" class="col s12">장신구</div>
          <div id="test3" class="col s12">배경</div>
        </div>
      </Layout>
    )
  }
}

const queryOptions = {
  options: props => ({
    variables: {
      email: localStorage.getItem('email')
    }
  })
}

export default graphql(finduser, queryOptions)(MyGons)
