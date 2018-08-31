import React, { Component } from 'react'
import { graphql, compose } from 'react-apollo'
import { Link, Redirect } from 'react-router-dom'
import { finduser, editChoicecbg, editChoicesword, editChoiceshield } from './queries'
import './App.css'
import Layout from './Layout'
import MyGonHeader from './MyGonHeader'
import MaterialPagination from './MaterialPagination'

class Detail extends Component {
  constructor(props) {
    super(props)
    this.state = {
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
      serial: null,
      username: 'JaeDragon',
      generation: 'generation',
      cooldown: 'cooldown',
      parents: 'parents,parents',
      children: 'children,children',
      all_cbg: [],
      except_cbg: [], // 제외할 cbg
      choice_cbg: 'null', // 선택한 cbg
      change_cbg: 'doNotClick',
      all_sword: [],
      except_sword: [],
      choice_sword: 'null',
      change_sword: 'doNotClick',
      all_shield: [],
      except_shield: [],
      choice_shield: 'null',
      change_shield: 'doNotClick',
      pagenum: null,
      lastPage: null,
      pages: [],
      possible_sword: [],
      possible_shield: []
    }
    this.handleChoiceCbg = this.handleChoiceCbg.bind(this)
    this.handleReleaseCbg = this.handleReleaseCbg.bind(this)
    this.handleChoiceSword = this.handleChoiceSword.bind(this)
    this.handleReleaseSword = this.handleReleaseSword.bind(this)
    this.handleChoiceShield = this.handleChoiceShield.bind(this)
    this.handleReleaseShield = this.handleReleaseShield.bind(this)
  }
  handleChoiceCbg(event) {
    this.setState({ change_cbg: event })
    // 서버에 현재용의 serial, choice_cbg(event) 보냄
    this.props.editChoicecbg({ variables: { email: localStorage.getItem('email'), serial: this.props.match.params.serialnumber, choice_cbg: event } })
      .then((res) => {
        console.log(res)
      })
      .catch((errors) => {
        console.log('errors: ', errors)
      })
  }
  handleReleaseCbg() {
    this.setState({ change_cbg: 'null' })
    // 서버에 현재용의 serial, choice_cbg(null) 보냄
    this.props.editChoicecbg({ variables: { email: localStorage.getItem('email'), serial: this.props.match.params.serialnumber, choice_cbg: 'null' } })
      .then((res) => {
        console.log(res)
      })
      .catch((errors) => {
        console.log('errors: ', errors)
      })
  }
  handleChoiceSword(event) {
    this.setState({ change_sword: event })
    // 서버에 현재용의 serial, choice_sword(event) 보냄
    this.props.editChoicesword({ variables: { email: localStorage.getItem('email'), serial: this.props.match.params.serialnumber, choice_sword: event } })
      .then((res) => {
        console.log(res)
      })
      .catch((errors) => {
        console.log('errors: ', errors)
      })
    console.log('handleChoiceSword: ', this.state.choice_sword)
  }
  handleReleaseSword() {
    this.setState({ change_sword: 'null' })
    // 서버에 현재용의 serial, choice_sword(null) 보냄
    this.props.editChoicesword({ variables: { email: localStorage.getItem('email'), serial: this.props.match.params.serialnumber, choice_sword: 'null' } })
      .then((res) => {
        console.log(res)
      })
      .catch((errors) => {
        console.log('errors: ', errors)
      })
  }
  handleChoiceShield(event) {
    this.setState({ change_shield: event })
    // 서버에 현재용의 serial, choice_shield(event) 보냄
    this.props.editChoiceshield({ variables: { email: localStorage.getItem('email'), serial: this.props.match.params.serialnumber, choice_shield: event } })
      .then((res) => {
        console.log(res)
      })
      .catch((errors) => {
        console.log('errors: ', errors)
      })
    console.log('handleChoiceShield: ', this.state.choice_shield)
  }
  handleReleaseShield() {
    this.setState({ change_shield: 'null' })
    // 서버에 현재용의 serial, choice_shield(null) 보냄
    this.props.editChoiceshield({ variables: { email: localStorage.getItem('email'), serial: this.props.match.params.serialnumber, choice_shield: 'null' } })
      .then((res) => {
        console.log(res)
      })
      .catch((errors) => {
        console.log('errors: ', errors)
      })
  }
  render() {
    let x = 0
    let y = 0
    let z = 0
    if (!this.props.data.loading) {
      for (let a = 0; a < this.props.data.finduser.sword.length; a += 1) {
        this.state.all_sword[a] = this.props.data.finduser.sword[a].number
      }
      for (let b = 0; b < this.props.data.finduser.shield.length; b += 1) {
        this.state.all_shield[b] = this.props.data.finduser.shield[b].number
      }
      for (let c = 0; c < this.props.data.finduser.cbg.length; c += 1) {
        this.state.all_cbg[c] = this.props.data.finduser.cbg[c].number
      }
      console.log('this.props', this.props)
      for (let dl = 0; dl < this.props.data.finduser.dragons.length; dl += 1) {
        if (this.props.data.finduser.dragons[dl].serial === this.props.match.params.serialnumber) {
          this.state.name = this.props.data.finduser.dragons[dl].name
          this.state.birthday = this.props.data.finduser.dragons[dl].birthday
          this.state.price = this.props.data.finduser.dragons[dl].price
          this.state.serial = this.props.data.finduser.dragons[dl].serial
          this.state.choice_cbg = this.props.data.finduser.dragons[dl].choice_cbg
          this.state.choice_sword = this.props.data.finduser.dragons[dl].choice_sword
          this.state.choice_shield = this.props.data.finduser.dragons[dl].choice_shield
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
          if (this.props.data.finduser.dragons[dl].choice_cbg !== 'null') {
            this.state.except_cbg[x] = this.props.data.finduser.dragons[dl].choice_cbg
            x += 1
          }
          console.log('this.state.except_cbg : ', this.state.except_cbg)
          if (this.props.data.finduser.dragons[dl].choice_sword !== 'null') {
            this.state.except_sword[y] = this.props.data.finduser.dragons[dl].choice_sword
            y += 1
          }
          console.log('this.state.except_sword : ', this.state.except_sword)
          if (this.props.data.finduser.dragons[dl].choice_shield !== 'null') {
            this.state.except_shield[z] = this.props.data.finduser.dragons[dl].choice_shield
            z += 1
          }
          console.log('this.state.except_shield : ', this.state.except_shield)
        }
      }
      // cbg pagination
      this.state.pagenum = '1'
      const lastItem = this.state.all_cbg.length
      this.state.lastPage = lastItem / 12
      const startItem = (this.state.pagenum - 1) * 12
      let endItem = this.state.pagenum * 12
      if (this.state.pagenum < 1) return <Redirect to="/MyCbg/1"/>
      if (this.state.pagenum > this.state.lastPage + 1) return <Redirect to="/MyCbg/1"/>
      if (endItem > lastItem) endItem = lastItem
      this.state.pages = this.state.all_cbg.slice(startItem, endItem)
      for (let a = 0; a < this.state.except_cbg.length; a += 1) {
        this.state.pages.splice(this.state.pages.indexOf(this.state.except_cbg[a]), 1)
      }

      // all sword - expect sword = possible sword
      Array.prototype.subtract = function (array) {
        var hash = Object.create(null);
        array.forEach(function (a) {
            hash[a] = (hash[a] || 0) + 1;
        });
        return this.filter(function (a) {
           return !hash[a] || (hash[a]--, false);
        });
      }
      var a = this.state.all_sword,
          b = this.state.except_sword;
      this.state.possible_sword = (a.subtract(b))
      // all shield - expect shield = possible shield
      var c = this.state.all_shield,
          d = this.state.except_shield;
      this.state.possible_shield = (c.subtract(d))
    }
    return (
      <Layout>
        <MyGonHeader/>
        <div id="modal_sword" class="modal">
          <div class="modal-content">
            <h4>Modal Header</h4>
            <div class="col s12">
              <div className='center'>
                <div className="row">
                  {this.state.possible_sword.map(item =>
                    <div key={item.id}>
                      <div className="col s12 m6 l3">
                        <div className="card">
                          <div className="card-image">

                            <img src={`${process.env.PUBLIC_URL}/images/item/sword/sword_${item}.png`} onClick={ () => this.handleChoiceSword(item)}/>
                            {this.state.choice_sword === item && this.state.change_sword === 'doNotClick' &&
                              <div class="absolute">
                                <img src={`${process.env.PUBLIC_URL}/images/item/custom_bg/cbg_choice.png`} onClick={this.handleReleaseSword}/>
                              </div>
                            }
                            {this.state.change_sword === item &&
                              <div class="absolute">
                                <img src={`${process.env.PUBLIC_URL}/images/item/custom_bg/cbg_choice.png`} onClick={this.handleReleaseSword}/>
                              </div>
                            }
                            {this.state.change_sword === 'null' &&
                              <div class="absolute">
                                <img src={`${process.env.PUBLIC_URL}/images/item/sword/sword_${item}.png`} onClick={ () => this.handleChoiceSword(item)}/>
                              </div>
                            }

                          </div>
                          <div className="card-content">
                            <p>I am a very simple card.</p>
                          </div>
                        </div>
                      </div>
                    </div>)}
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <a href="#!" class="modal-close waves-effect waves-green btn-flat">Agree</a>
          </div>
        </div>
        <div id="modal_shield" class="modal">
          <div class="modal-content">
            <h4>Modal Header</h4>
            <div class="col s12">
              <div className='center'>
                <div className="row">
                  {this.state.possible_shield.map(item =>
                    <div key={item.id}>
                      <div className="col s12 m6 l3">
                        <div className="card">
                          <div className="card-image">

                            <img src={`${process.env.PUBLIC_URL}/images/item/shield/shield_${item}.png`} onClick={ () => this.handleChoiceShield(item)}/>
                            {this.state.choice_shield === item && this.state.change_shield === 'doNotClick' &&
                              <div class="absolute">
                                <img src={`${process.env.PUBLIC_URL}/images/item/custom_bg/cbg_choice.png`} onClick={this.handleReleaseShield}/>
                              </div>
                            }
                            {this.state.change_shield === item &&
                              <div class="absolute">
                                <img src={`${process.env.PUBLIC_URL}/images/item/custom_bg/cbg_choice.png`} onClick={this.handleReleaseShield}/>
                              </div>
                            }
                            {this.state.change_shield === 'null' &&
                              <div class="absolute">
                                <img src={`${process.env.PUBLIC_URL}/images/item/shield/shield_${item}.png`} onClick={ () => this.handleChoiceShield(item)}/>
                              </div>
                            }

                          </div>
                          <div className="card-content">
                            <p>I am a very simple card.</p>
                          </div>
                        </div>
                      </div>
                    </div>)}
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <a href="#!" class="modal-close waves-effect waves-green btn-flat">Agree</a>
          </div>
        </div>
        <div id="modal_cbg" class="modal">
          <div class="modal-content">
            <h4>Modal Header</h4>
            <div className='center'>
              <div className="row">
                {this.state.pages.map(item =>
                  <div key={item.id}>
                    <div className="col s12 m6 l3">
                      <div className="card">
                        <div className="card-image">
                          <img src={`${process.env.PUBLIC_URL}/images/item/custom_bg/cbg_${item}.png`} onClick={ () => this.handleChoiceCbg(item)}/>
                          {this.state.choice_cbg === item && this.state.change_cbg === 'doNotClick' &&
                            <div class="absolute">
                              <img src={`${process.env.PUBLIC_URL}/images/item/custom_bg/cbg_choice.png`} onClick={this.handleReleaseCbg}/>
                            </div>
                          }
                          {this.state.change_cbg === item &&
                            <div class="absolute">
                              <img src={`${process.env.PUBLIC_URL}/images/item/custom_bg/cbg_choice.png`} onClick={this.handleReleaseCbg}/>
                            </div>
                          }
                          {this.state.change_cbg === 'null' &&
                            <div class="absolute">
                              <img src={`${process.env.PUBLIC_URL}/images/item/custom_bg/cbg_${item}.png`} onClick={ () => this.handleChoiceCbg(item)}/>
                            </div>
                          }
                        </div>
                        <div className="card-content">
                          <p>I am a very simple card.</p>
                        </div>
                      </div>
                    </div>
                  </div>)}
              </div>
              <MaterialPagination linkPath="Detail" pageNum={this.state.pagenum} lastPage={this.state.lastPage} />
            </div>
          </div>
          <div class="modal-footer">
            <a href="#!" class="modal-close waves-effect waves-green btn-flat">Agree</a>
          </div>
        </div>
        {this.props.data.loading ? (
          <p>Loding...</p>
        ) : (
          <div>
            <div className="container margin-top-50">
              <div className="col s12 right">
                <i class="Small material-icons">share</i>
              </div>
              <div class="detail-img">
                <div className="row">
                  <div class="s12 m4 l8">
                    <div className="card z-depth-1">
                      <div className="card-image">
                        {this.state.choice_cbg === 'null' && this.state.change_cbg === 'doNotClick' &&
                          <img src={`${process.env.PUBLIC_URL}/images/gonImages/1_property/property_${this.state.property}.png`}/>
                        }
                        {this.state.choice_cbg !== 'null' && this.state.change_cbg === 'doNotClick' &&
                          <img src={`${process.env.PUBLIC_URL}/images/item/custom_bg/cbg_${this.state.choice_cbg}.png`}/>
                        }
                        {this.state.change_cbg !== 'doNotClick' && this.state.change_cbg !== 'null' &&
                          <img src={`${process.env.PUBLIC_URL}/images/item/custom_bg/cbg_${this.state.change_cbg}.png`}/>
                        }
                        {this.state.change_cbg === 'null' &&
                          <img src={`${process.env.PUBLIC_URL}/images/gonImages/1_property/property_${this.state.property}.png`}/>
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
              <div class="row">
                <div className="left">
                  <font size="7">{this.state.name}</font>&nbsp;&nbsp;&nbsp;&nbsp;<font size="6">{this.state.serial}</font>
                </div>
                <div className="right margin-top-15">
                  <span><a href={`/Breed/${this.state.serial}`} class="waves-effect waves-light btn-large margin-right-10"><i class="material-icons left">cloud</i>Breed</a></span>
                  <span><a href={`/Sell/${this.state.serial}`} class="waves-effect waves-light btn-large margin-right-10"><i class="material-icons left">cloud</i>Sell</a></span>
                  <span><a href={`/Gift/${this.state.serial}`} class="waves-effect waves-light btn-large"><i class="material-icons left">cloud</i>Gift</a></span>
                </div>
              </div>

              - win 70%&nbsp;&nbsp;&nbsp;- gen {this.state.generation}&nbsp;&nbsp;&nbsp;- cooldown {this.state.cooldown}
                  &nbsp;&nbsp;&nbsp;- price {this.state.price}&nbsp;&nbsp;&nbsp;- birthday {this.state.birthday}
              <br/><br/><br/>

              <div class="section">
                <div class="row">
                  <div class="col s12 m4">
                    <div class="icon-block center">
                      <h5 class="center margin-bottom-20">Sword</h5>
                      {this.state.choice_sword === 'null' && this.state.change_sword === 'doNotClick' &&
                        <a class="modal-trigger" href="#modal_sword"><img src={`${process.env.PUBLIC_URL}/images/btn_select_gon.png`} width="80%" height="80%"/></a>
                      }
                      {this.state.choice_sword !== 'null' && this.state.change_sword === 'doNotClick' &&
                        <a class="modal-trigger" href="#modal_sword"><img src={`${process.env.PUBLIC_URL}/images/item/sword/sword_${this.state.choice_sword}.png`} width="80%" height="80%"/></a>
                      }
                      {this.state.change_sword !== 'doNotClick' && this.state.change_sword !== 'null' &&
                        <a class="modal-trigger" href="#modal_sword"><img src={`${process.env.PUBLIC_URL}/images/item/sword/sword_${this.state.change_sword}.png`} width="80%" height="80%"/></a>
                      }
                      {this.state.change_sword === 'null' &&
                        <a class="modal-trigger" href="#modal_sword"><img src={`${process.env.PUBLIC_URL}/images/btn_select_gon.png`} width="80%" height="80%"/></a>
                      }
                    </div>
                  </div>

                  <div class="col s12 m4">
                    <div class="icon-block center">
                      <h5 class="center margin-bottom-20">Shield</h5>
                      {this.state.choice_shield === 'null' && this.state.change_shield === 'doNotClick' &&
                        <a class="modal-trigger" href="#modal_shield"><img src={`${process.env.PUBLIC_URL}/images/btn_select_gon.png`} width="80%" height="80%"/></a>
                      }
                      {this.state.choice_shield !== 'null' && this.state.change_shield === 'doNotClick' &&
                        <a class="modal-trigger" href="#modal_shield"><img src={`${process.env.PUBLIC_URL}/images/item/shield/shield_${this.state.choice_shield}.png`} width="80%" height="80%"/></a>
                      }
                      {this.state.change_shield !== 'doNotClick' && this.state.change_shield !== 'null' &&
                        <a class="modal-trigger" href="#modal_shield"><img src={`${process.env.PUBLIC_URL}/images/item/shield/shield_${this.state.change_shield}.png`} width="80%" height="80%"/></a>
                      }
                      {this.state.change_shield === 'null' &&
                        <a class="modal-trigger" href="#modal_shield"><img src={`${process.env.PUBLIC_URL}/images/btn_select_gon.png`} width="80%" height="80%"/></a>
                      }
                    </div>
                  </div>

                  <div class="col s12 m4">
                    <div class="icon-block center">
                      <h5 class="center margin-bottom-20">배경</h5>
                      {this.state.choice_cbg === 'null' && this.state.change_cbg === 'doNotClick' &&
                        <a class="modal-trigger" href="#modal_cbg"><img src={`${process.env.PUBLIC_URL}/images/btn_select_gon.png`} width="80%" height="80%"/></a>
                      }
                      {this.state.choice_cbg !== 'null' && this.state.change_cbg === 'doNotClick' &&
                        <a class="modal-trigger" href="#modal_cbg"><img src={`${process.env.PUBLIC_URL}/images/item/custom_bg/cbg_${this.state.choice_cbg}.png`} width="80%" height="80%"/></a>
                      }
                      {this.state.change_cbg !== 'doNotClick' && this.state.change_cbg !== 'null' &&
                        <a class="modal-trigger" href="#modal_cbg"><img src={`${process.env.PUBLIC_URL}/images/item/custom_bg/cbg_${this.state.change_cbg}.png`} width="80%" height="80%"/></a>
                      }
                      {this.state.change_cbg === 'null' &&
                        <a class="modal-trigger" href="#modal_cbg"><img src={`${process.env.PUBLIC_URL}/images/btn_select_gon.png`} width="80%" height="80%"/></a>
                      }
                    </div>
                  </div>
                </div>
              </div>

              <h5>lineament</h5>
              {this.state.comb}
              <br/><br/><br/>
              <h5>parents</h5>
              {this.state.parents}
              <br/><br/><br/>
              <h5>children</h5>
              {this.state.children}
            </div>
          </div>
        )}
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
  graphql(editChoicecbg, { name: 'editChoicecbg' }),
  graphql(editChoicesword, { name: 'editChoicesword' }),
  graphql(editChoiceshield, { name: 'editChoiceshield' })
)(Detail)
