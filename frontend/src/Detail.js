import React, { Component } from 'react'
import { graphql, compose } from 'react-apollo'
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
  cbg
  dragons {
    name
    combination
    birthday
    price
    serial
    choice_cbg
  }
 }
}
`
const editChoicecbg = gql`
mutation editChoicecbg($email: String!, $serial: String!, $choice_cbg: String!) {
  editChoicecbg(email:$email, serial:$serial, choice_cbg:$choice_cbg) {
    email
    username
    name
    diamond
    gold
    iconNum
    cbg
    dragons {
      name
      combination
      birthday
      price
      serial
      choice_cbg
    }
  }
}
`

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
      sword: ['01', '02', '03'],
      shield: ['01', '02', '03'],
      choice_sword: 'null',
      pagenum: null,
      lastPage: null,
      pages: []
    }
    this.handleChoiceCbg = this.handleChoiceCbg.bind(this)
    this.handleReleaseCbg = this.handleReleaseCbg.bind(this)
    this.handleChoiceSword = this.handleChoiceSword.bind(this)
  }
  handleChoiceCbg(event) {
    this.setState({ change_cbg: event })
    // 서버에 현재용의 serial, choice_cbg(event)
    this.props.mutate({ variables: { email: localStorage.getItem('email'), serial: this.props.match.params.serialnumber, choice_cbg: event } })
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
    this.props.mutate({ variables: { email: localStorage.getItem('email'), serial: this.props.match.params.serialnumber, choice_cbg: 'null' } })
      .then((res) => {
        console.log(res)
      })
      .catch((errors) => {
        console.log('errors: ', errors)
      })
  }
  handleChoiceSword(event) {
    this.setState({ change_sword: event })
    console.log('handleChoiceSword: ', this.state.choice_sword)
  }
  render() {
    let x = 0
    if (!this.props.data.loading) {
      this.state.all_cbg = this.props.data.finduser.cbg
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
          if (this.props.data.finduser.dragons[dl].choice_cbg !== 'null') {
            this.state.except_cbg[x] = this.props.data.finduser.dragons[dl].choice_cbg
            x += 1
          }
          console.log('this.state.except_cbg : ', this.state.except_cbg)
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
      for (let el = 0; el < this.state.except_cbg.length; el += 1) {
        this.state.pages.splice(this.state.pages.indexOf(this.state.except_cbg[el]), 1)
      }
      console.log('this.state.pages: ', this.state.pages)
      console.log('rrrrrrrrrrrrrrrr: ', this.state.choice_cbg)
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
                  {this.state.sword.map(item =>
                    <div key={item.id}>
                      <div className="col s12 m6 l3">
                        <div className="card">
                          <div className="card-image">
                            <img src={`${process.env.PUBLIC_URL}/images/item/sword/sword_${item}.png`} onClick={ () => this.handleChoiceSword(item)}/>
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
                  {this.state.shield.map(item =>
                    <div key={item.id}>
                      <div className="col s12 m6 l3">
                        <div className="card">
                          <div className="card-image">
                            <img src={`${process.env.PUBLIC_URL}/images/item/shield/shield_${item}.png`}/>
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
                          <img src={`${process.env.PUBLIC_URL}/images/custom_bg/cbg_${item}.png`} onClick={ () => this.handleChoiceCbg(item)}/>
                          {this.state.choice_cbg === item && this.state.change_cbg === 'doNotClick' &&
                            <div class="absolute">
                              <img src={`${process.env.PUBLIC_URL}/images/custom_bg/cbg_choice.png`} onClick={this.handleReleaseCbg}/>
                            </div>
                          }
                          {this.state.change_cbg === item &&
                            <div class="absolute">
                              <img src={`${process.env.PUBLIC_URL}/images/custom_bg/cbg_choice.png`} onClick={this.handleReleaseCbg}/>
                            </div>
                          }
                          {this.state.change_cbg === 'null' &&
                            <div class="absolute">
                              <img src={`${process.env.PUBLIC_URL}/images/custom_bg/cbg_${item}.png`} onClick={ () => this.handleChoiceCbg(item)}/>
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
                          <img src={`${process.env.PUBLIC_URL}/images/custom_bg/cbg_${this.state.choice_cbg}.png`}/>
                        }
                        {this.state.change_cbg !== 'doNotClick' && this.state.change_cbg !== 'null' &&
                          <img src={`${process.env.PUBLIC_URL}/images/custom_bg/cbg_${this.state.change_cbg}.png`}/>
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
                      <a class="modal-trigger" href="#modal_sword"><img src={`${process.env.PUBLIC_URL}/images/btn_select_gon.png`} width="80%" height="80%"/></a>
                    </div>
                  </div>

                  <div class="col s12 m4">
                    <div class="icon-block center">
                      <h5 class="center margin-bottom-20">Shield</h5>
                      <a class="modal-trigger" href="#modal_shield"><img src={`${process.env.PUBLIC_URL}/images/btn_select_gon.png`} width="80%" height="80%"/></a>
                    </div>
                  </div>

                  <div class="col s12 m4">
                    <div class="icon-block center">
                      <h5 class="center margin-bottom-20">배경</h5>
                      {this.state.choice_cbg === 'null' && this.state.change_cbg === 'doNotClick' &&
                        <a class="modal-trigger" href="#modal_cbg"><img src={`${process.env.PUBLIC_URL}/images/btn_select_gon.png`} width="80%" height="80%"/></a>
                      }
                      {this.state.choice_cbg !== 'null' && this.state.change_cbg === 'doNotClick' &&
                        <a class="modal-trigger" href="#modal_cbg"><img src={`${process.env.PUBLIC_URL}/images/custom_bg/cbg_${this.state.choice_cbg}.png`} width="80%" height="80%"/></a>
                      }
                      {this.state.change_cbg !== 'doNotClick' && this.state.change_cbg !== 'null' &&
                        <a class="modal-trigger" href="#modal_cbg"><img src={`${process.env.PUBLIC_URL}/images/custom_bg/cbg_${this.state.change_cbg}.png`} width="80%" height="80%"/></a>
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
  graphql(editChoicecbg),
)(Detail)
