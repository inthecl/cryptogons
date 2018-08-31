import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom'
import { graphql, compose } from 'react-apollo'
import { finduser, addUserDragon } from './queries'
import './App.css'
import Layout from './Layout'
import btnPlus from './image/plus.png'
import btnMinus from './image/minus.png'
import MyGonHeader from './MyGonHeader'
import MaterialPagination from './MaterialPagination'

class Breed extends Component {
  constructor(props) {
    super(props)
    this.state = {
      redirect: false,
      dragonsComb: [],
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
      name: null,
      birthday: null,
      price: null,
      average_siring_price: 100,
      siring_price: 10,
      siring_period: 1,
      serial: null,
      choice_cbg: 'null',
      username: 'JaeDragon',
      generation: 'generation',
      cooldown: 'cooldown',
      parents: 'parents,parents',
      children: 'children,children',
      choiceGon: false,
      choice_comb: null,
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
      new_comb: null,
      new_evolution: '01',
      new_property: null,
      new_wing: null,
      new_wingColor: null,
      new_horn: null,
      new_hornColor: null,
      cnew_tail: null,
      new_body: null,
      new_bodyColor: null,
      new_eye: null,
      new_eyeColor: null,
      new_mouth: null,
      new_nose: null
    }
    this.btnPricePlus = this.btnPricePlus.bind(this)
    this.btnPriceMinus = this.btnPriceMinus.bind(this)
    this.btnPeriodPlus = this.btnPeriodPlus.bind(this)
    this.btnPeriodMinus = this.btnPeriodMinus.bind(this)
    this.onlyPriceNumber = this.onlyPriceNumber.bind(this)
    this.onlyPeriodNumber = this.onlyPeriodNumber.bind(this)
    this.btnSelectGon = this.btnSelectGon.bind(this)
    this.btnBreed = this.btnBreed.bind(this)
  }
  btnPricePlus() {
    if (this.state.siring_price < 1000000) {
      this.setState({
        siring_price: this.state.siring_price + 1
      })
    }
  }
  btnPriceMinus() {
    if (this.state.siring_price > 10) {
      this.setState({
        siring_price: this.state.siring_price - 1
      })
      console.log('minus')
    }
  }
  btnPeriodPlus() {
    if (this.state.siring_period < 3) {
      this.setState({
        siring_period: this.state.siring_period + 1
      })
    }
  }
  btnPeriodMinus() {
    if (this.state.siring_period > 1) {
      this.setState({
        siring_period: this.state.siring_period - 1
      })
      console.log('minus')
    }
  }
  onlyPriceNumber(event) {
    if (isNaN(Number(event.target.value))) {
      return;
    } else {
      this.setState({ siring_price: Number(event.target.value) })
    }
  }
  onlyPeriodNumber(event) {
    if (isNaN(Number(event.target.value))) {
      return;
    } else {
      this.setState({ siring_period: Number(event.target.value) })
    }
  }
  btnSelectGon(e) {
    console.log('btnSelectGon', e.target.id)
    for (let dl = 0; dl < this.props.data.finduser.dragons.length; dl += 1) {
      if (this.props.data.finduser.dragons[dl].serial === e.target.id) {
        this.setState({
          choiceGon: true,
          choice_comb: this.props.data.finduser.dragons[dl].combination,
          choice_evolution: this.props.data.finduser.dragons[dl].combination.substring(0, 2),
          choice_property: this.props.data.finduser.dragons[dl].combination.substring(2, 4),
          choice_wing: this.props.data.finduser.dragons[dl].combination.substring(4, 6),
          choice_wingColor: this.props.data.finduser.dragons[dl].combination.substring(6, 8),
          choice_horn: this.props.data.finduser.dragons[dl].combination.substring(8, 10),
          choice_hornColor: this.props.data.finduser.dragons[dl].combination.substring(10, 12),
          choice_tail: this.props.data.finduser.dragons[dl].combination.substring(12, 14),
          choice_body: this.props.data.finduser.dragons[dl].combination.substring(14, 16),
          choice_bodyColor: this.props.data.finduser.dragons[dl].combination.substring(16, 18),
          choice_eye: this.props.data.finduser.dragons[dl].combination.substring(18, 20),
          choice_eyeColor: this.props.data.finduser.dragons[dl].combination.substring(20, 22),
          choice_mouth: this.props.data.finduser.dragons[dl].combination.substring(22, 24),
          choice_nose: this.props.data.finduser.dragons[dl].combination.substring(24, 26)
        })
      }
    }
  }
  btnBreed(event) {
    if (this.state.choiceGon) {
      // randomBreedArr 0~2 father, 3~5 mather
      let x
      let y
      const randomBreedArr = []
      for (x = 0; x <= 5; x += 1) {
        randomBreedArr[x] = Math.floor(Math.random() * 11)
        for (y = 0; y < x; y += 1) {
          if (randomBreedArr[x] === randomBreedArr[y]) x -= 1
        }
      }
      console.log('randomBreedArr: ', randomBreedArr)
      const pad = (n, width) => {
        n = n + ''
        return n.length >= width ? n : new Array(width - n.length + 1).join('0') + n
      }
      console.log('randomBreedArr[0]: ', randomBreedArr[0])
      console.log('randomBreedArr[1]: ', randomBreedArr[1])
      console.log('randomBreedArr[2]: ', randomBreedArr[2])
      console.log('randomBreedArr[3]: ', randomBreedArr[3])
      console.log('randomBreedArr[4]: ', randomBreedArr[4])
      console.log('randomBreedArr[5]: ', randomBreedArr[5])
      // wing
      if (randomBreedArr[0] === 0 || randomBreedArr[1] === 0 || randomBreedArr[2] === 0) {
        this.state.new_wing = this.state.wing
      } else if (randomBreedArr[3] === 0 || randomBreedArr[4] === 0 || randomBreedArr[5] === 0) {
        this.state.new_wing = this.state.choice_wing
      } else {
        this.state.new_wing = pad(Math.floor(Math.random() * 3) + 1, 2)
      }
      console.log('this.state.new_wing:', this.state.new_wing)
      // wingColor
      if (randomBreedArr[0] === 1 || randomBreedArr[1] === 1 || randomBreedArr[2] === 1) {
        this.state.new_wingColor = this.state.wingColor
      } else if (randomBreedArr[3] === 1 || randomBreedArr[4] === 1 || randomBreedArr[5] === 1) {
        this.state.new_wingColor = this.state.choice_wingColor
      } else {
        this.state.new_wingColor = pad(Math.floor(Math.random() * 3) + 1, 2)
      }
      console.log('this.state.new_wingColor:', this.state.new_wingColor)
      // horn
      if (randomBreedArr[0] === 2 || randomBreedArr[1] === 2 || randomBreedArr[2] === 2) {
        this.state.new_horn = this.state.horn
      } else if (randomBreedArr[3] === 2 || randomBreedArr[4] === 2 || randomBreedArr[5] === 2) {
        this.state.new_horn = this.state.choice_horn
      } else {
        this.state.new_horn = pad(Math.floor(Math.random() * 3) + 1, 2)
      }
      console.log('this.state.new_horn:', this.state.new_horn)
      // hornColor
      if (randomBreedArr[0] === 3 || randomBreedArr[1] === 3 || randomBreedArr[2] === 3) {
        this.state.new_hornColor = this.state.hornColor
      } else if (randomBreedArr[3] === 3 || randomBreedArr[4] === 3 || randomBreedArr[5] === 3) {
        this.state.new_hornColor = this.state.choice_hornColor
      } else {
        this.state.new_hornColor = pad(Math.floor(Math.random() * 3) + 1, 2)
      }
      console.log('this.state.new_hornColor:', this.state.new_hornColor)
      // tail
      if (randomBreedArr[0] === 4 || randomBreedArr[1] === 4 || randomBreedArr[2] === 4) {
        this.state.new_tail = this.state.tail
      } else if (randomBreedArr[3] === 4 || randomBreedArr[4] === 4 || randomBreedArr[5] === 4) {
        this.state.new_tail = this.state.choice_tail
      } else {
        this.state.new_tail = pad(Math.floor(Math.random() * 3) + 1, 2)
      }
      console.log('this.state.new_tail:', this.state.new_tail)
      // body
      if (randomBreedArr[0] === 5 || randomBreedArr[1] === 5 || randomBreedArr[2] === 5) {
        this.state.new_body = this.state.body
      } else if (randomBreedArr[3] === 5 || randomBreedArr[4] === 5 || randomBreedArr[5] === 5) {
        this.state.new_body = this.state.choice_body
      } else {
        this.state.new_body = pad(Math.floor(Math.random() * 3) + 1, 2)
      }
      console.log('this.state.new_body:', this.state.new_body)
      // bodyColor
      if (randomBreedArr[0] === 6 || randomBreedArr[1] === 6 || randomBreedArr[2] === 6) {
        this.state.new_bodyColor = this.state.bodyColor
      } else if (randomBreedArr[3] === 6 || randomBreedArr[4] === 6 || randomBreedArr[5] === 6) {
        this.state.new_bodyColor = this.state.choice_bodyColor
      } else {
        this.state.new_bodyColor = pad(Math.floor(Math.random() * 3) + 1, 2)
      }
      console.log('this.state.new_bodyColor:', this.state.new_bodyColor)
      // eye
      if (randomBreedArr[0] === 7 || randomBreedArr[1] === 7 || randomBreedArr[2] === 7) {
        this.state.new_eye = this.state.eye
      } else if (randomBreedArr[3] === 7 || randomBreedArr[4] === 7 || randomBreedArr[5] === 7) {
        this.state.new_eye = this.state.choice_eye
      } else {
        this.state.new_eye = pad(Math.floor(Math.random() * 3) + 1, 2)
      }
      console.log('this.state.new_eye:', this.state.new_eye)
      // eyeColor
      if (randomBreedArr[0] === 8 || randomBreedArr[1] === 8 || randomBreedArr[2] === 8) {
        this.state.new_eyeColor = this.state.eyeColor
      } else if (randomBreedArr[3] === 8 || randomBreedArr[4] === 8 || randomBreedArr[5] === 8) {
        this.state.new_eyeColor = this.state.choice_eyeColor
      } else {
        this.state.new_eyeColor = pad(Math.floor(Math.random() * 3) + 1, 2)
      }
      console.log('this.state.new_eyeColor:', this.state.new_eyeColor)
      // mouth
      if (randomBreedArr[0] === 9 || randomBreedArr[1] === 9 || randomBreedArr[2] === 9) {
        this.state.new_mouth = this.state.mouth
      } else if (randomBreedArr[3] === 9 || randomBreedArr[4] === 9 || randomBreedArr[5] === 9) {
        this.state.new_mouth = this.state.choice_mouth
      } else {
        this.state.new_mouth = pad(Math.floor(Math.random() * 3) + 1, 2)
      }
      console.log('this.state.new_mouth:', this.state.new_mouth)
      // nose
      if (randomBreedArr[0] === 10 || randomBreedArr[1] === 10 || randomBreedArr[2] === 10) {
        this.state.new_nose = this.state.nose
      } else if (randomBreedArr[3] === 10 || randomBreedArr[4] === 10 || randomBreedArr[5] === 10) {
        this.state.new_nose = this.state.choice_nose
      } else {
        this.state.new_nose = pad(Math.floor(Math.random() * 3) + 1, 2)
      }
      console.log('this.state.new_nose:', this.state.new_nose)

      this.state.new_property = pad(Math.floor(Math.random() * 5) + 1, 2)
      this.state.new_comb = this.state.new_evolution + this.state.new_property + this.state.new_wing + this.state.new_wingColor + this.state.new_horn + this.state.new_hornColor +
      this.state.new_tail + this.state.new_body + this.state.new_bodyColor + this.state.new_eye + this.state.new_eyeColor + this.state.new_mouth + this.state.new_nose

      console.log('email', localStorage.getItem('email'))
      console.log('new_comb', this.state.new_comb)

      // 새로운 용 서버로 보내기
      this.props.mutate({ variables: { email: localStorage.getItem('email'), new_comb: this.state.new_comb } })
        .then((res) => {
          console.log(res)
          this.setState({ redirect: true })
        })
        .catch((errors) => {
          console.log('errors: ', errors)
        })
    }
  }
  render() {
    if (this.state.redirect) {
      return <Redirect to='/Activity'/>
    }
    if (!this.props.data.loading) {
      console.log('this.props', this.props.data.finduser.dragons)
      for (let dl = 0; dl < this.props.data.finduser.dragons.length; dl += 1) {
        if (this.props.data.finduser.dragons[dl].serial === this.props.match.params.serialnumber) {
          this.state.name = this.props.data.finduser.dragons[dl].name
          this.state.birthday = this.props.data.finduser.dragons[dl].birthday
          this.state.price = this.props.data.finduser.dragons[dl].price
          this.state.serial = this.props.data.finduser.dragons[dl].serial
          this.state.choice_cbg = this.props.data.finduser.dragons[dl].choice_cbg
          this.state.comb = this.props.data.finduser.dragons[dl].combination
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
        } else {
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
      }
      console.log('1 : ', this.state.dragonsComb[0])
      console.log('2 : ', this.state.dragonsComb[1])
      console.log('3 : ', this.state.dragonsComb[2])
      console.log('4 : ', this.state.dragonsComb[3])
      console.log('5 : ', this.props.match.params)
    }
    const { pagenum } = {pagenum: '1'} 
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
            <h4 align='center'><p>Breed Gon</p></h4>
            <div class="col s12">
              <ul class="tabs">
                <li class="tab col s6"><a class="active" href="#test1">대중과 교배</a></li>
                <li class="tab col s6"><a href="#test2">내꺼랑 교배</a></li>
              </ul>
            </div>
            <div id="test1" class="col s12">
              <br/>
              <h6> - Register my gon in the market. Another user can cross with my gon.</h6>
              <h6> - The minimum price starts at 10dia.</h6>
              <br/><br/>

              <div className="row">
                <div class="col s12 m6 l6 left">
                  <p>Average price for the same gen</p>
                </div>
                <div class="col s12 m6 l6 right right-align">
                  <span class="textbox"><input type="text" class="browser-default" id="ex_input" value={this.state.average_siring_price}/></span>
                </div>
              </div>

              <div className="row">
                <div class="col s12 m6 l6 left">
                  <p>Enter siring price</p>
                </div>
                <div class="col s12 m6 l6 right right-align">
                  <img src={btnMinus} onClick={this.btnPriceMinus} align="center" hspace="10"/>
                  <span class="textbox"><input type="text" class="browser-default" id="ex_input" value={this.state.siring_price} onChange={this.onlyPriceNumber} maxlength="7"/></span>
                  <img src={btnPlus} onClick={this.btnPricePlus} align="center" hspace="10"/>
                </div>
              </div>

              <div className="row">
                <div class="col s12 m6 l6 left">
                  <p>Enter sales period</p>
                </div>
                <div class="col s12 m6 l6 right right-align">
                  <img src={btnMinus} onClick={this.btnPeriodMinus} align="center" hspace="10"/>
                  <span class="textbox"><input type="text" class="browser-default" id="ex_input" value={this.state.siring_period} onChange={this.onlyPeriodNumber} maxlength="1"/></span>
                  <img src={btnPlus} onClick={this.btnPeriodPlus} align="center" hspace="10"/>
                </div>
              </div>

              <br/>
              <div class="center-align">
                <a class="waves-effect waves-light btn-large col s12">Done</a>
              </div>
              <br/><br/><br/><br/>
              <div class="card-panel">
                <span class="red-text text-lighten-1">This is a card panel with dark blue text</span>
              </div>
            </div>

            <div id="test2" class="col s12">
              <br/>
              <h6> - Please select a breeder. Breeding increases cooldown.</h6>
              <h6> - The minimum price starts at 10dia.</h6>
              <br/><br/>

              <div className="row">
                <div class="col s12 m6 l6 left">
                  <div className="card z-depth-0">
                    {this.state.choiceGon ? (
                      <div className="card-image">
                        <img src={`${process.env.PUBLIC_URL}/images/gonImages/1_property/property_${this.state.choice_property}.png`}/>
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

                          <div id="modal1" class="modal">
                            <div class="modal-content">
                              <h4>Select a gon to be the mother</h4>
                              <div className='center margin-top-50'>
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
                                          <div className="card-action">
                                            <div className="modal-close" id={item.serial} onClick={this.btnSelectGon}>{item.serial}</div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>)}
                                </div>
                                <MaterialPagination linkPath="Breed" pageNum={pagenum} lastPage={lastPage} />
                              </div>
                            </div>
                            <div class="modal-footer">
                              <a href="#!" class="modal-close waves-effect waves-green btn-flat">Agree</a>
                            </div>
                          </div>

                        </div>
                      </div>
                    )}

                  </div>
                </div>

                <div class="col s12 m6 l6 right">
                  <div className="card z-depth-0">
                    <div className="card-image">
                      <img src={`${process.env.PUBLIC_URL}/images/gonImages/1_property/property_${this.state.property}.png`}/>
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

              <br/>
              <h6 align="center"> Click the button below to create a new dragon. </h6>
              <br/>

              <div class="center-align">
                <a class="waves-effect waves-light btn-large col s12" onClick={this.btnBreed}>OK, Breed!</a>
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

const queryOptions = {
  options: props => ({
    variables: {
      email: localStorage.getItem('email')
    }
  })
}

export default compose(
  graphql(finduser, queryOptions),
  graphql(addUserDragon),
)(Breed)

