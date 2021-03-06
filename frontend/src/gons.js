import React, { Component } from 'react'
import { graphql, compose } from 'react-apollo'
import { Link, Redirect } from 'react-router-dom'
import M from 'materialize-css'
import { finduser, dragons, editChoicecbg, editChoicesword, editChoiceshield, editUserDragonState, dragonPurchase, dragonSellCancel, dragonSiringCancel, battleUpdate, findbadge, dragonNameChange } from './queries'
import './App.css'
import Layout from './Layout'
import MyGonHeader from './MyGonHeader'
import MaterialPagination from './MaterialPagination'

class gons extends Component {
  constructor(props) {
    super(props)
    this.state = {
      redirect: false,
      email: null,
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
      period: null,
      serial: null,
      state: null,
      change_state: null,
      win: null,
      lose: null,
      winning_rate: null,
      username: 'JaeDragon',
      gen: null,
      cooldown: [],
      parents: [],
      parentsList: [],
      child: [],
      childList: [],
      egg_state: null,
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
      possible_cbg: [],
      possible_sword: [],
      possible_shield: [],
      owner_email: null,
      owner_username: null,
      owner_icon: null,
      change_name: null,
      new_name: null
    }
    this.handleChoiceCbg = this.handleChoiceCbg.bind(this)
    this.handleReleaseCbg = this.handleReleaseCbg.bind(this)
    this.handleChoiceSword = this.handleChoiceSword.bind(this)
    this.handleReleaseSword = this.handleReleaseSword.bind(this)
    this.handleChoiceShield = this.handleChoiceShield.bind(this)
    this.handleReleaseShield = this.handleReleaseShield.bind(this)
    this.handleResting = this.handleResting.bind(this)
    this.handleBrooding = this.handleBrooding.bind(this)
    this.handleDuringBattle = this.handleDuringBattle.bind(this)
    this.handleSell = this.handleSell.bind(this)
    this.handleSellCancel = this.handleSellCancel.bind(this)
    this.handleSiring = this.handleSiring.bind(this)
    this.handleSiringCancel = this.handleSiringCancel.bind(this)
    this.handleBuybtn = this.handleBuybtn.bind(this)
    this.handleName = this.handleName.bind(this)
    this.handleDragonName = this.handleDragonName.bind(this)
    this.handleMatching = this.handleMatching.bind(this)
  }
  handleResting() {
    M.toast({ html: 'Resting' })
  }
  handleBrooding() {
    M.toast({ html: 'brooding' })
  }
  handleDuringBattle() {
    M.toast({ html: 'during battle' })
  }
  handleSell() {
    M.toast({ html: 'Sell' })
  }
  handleMatching() {
    M.toast({ html: 'Matching' })
  }
  handleSellCancel() {
    this.props.dragonSellCancel({ variables: { serial: this.props.match.params.serialnumber } })
      .then((res) => {
        console.log(res)
        if (res.data.dragonSellCancel.email === localStorage.getItem('email')) {
          M.toast({ html: '판매취소' })
          window.location.replace('/Mygons/1')
        }
        if (res.data.dragonSellCancel.email !== localStorage.getItem('email')) {
          M.toast({ html: '이미 판매가 되었습니다' })
          window.location.replace('/Mygons/1')
        }
      })
      .catch((errors) => {
        console.log('errors: ', errors)
      })
  }
  handleSiring() {
    M.toast({ html: 'Siring' })
  }
  handleSiringCancel() {
    this.props.dragonSiringCancel({ variables: { serial: this.props.match.params.serialnumber } })
      .then((res) => {
        console.log(res)
        if (res.data.dragonSiringCancel.email === localStorage.getItem('email')) {
          M.toast({ html: '판매취소' })
          window.location.replace('/Mygons/1')
        }
        if (res.data.dragonSiringCancel.email !== localStorage.getItem('email')) {
          M.toast({ html: '이미 판매가 되었습니다' })
          window.location.replace('/Mygons/1')
        }
      })
      .catch((errors) => {
        console.log('errors: ', errors)
      })
  }
  // Market 용 구매
  handleBuybtn() {
    if (localStorage.getItem('email') !== null) {
      if (this.state.price <= this.props.finduser.finduser.diamond) {
        console.log('this.state.price : ', this.state.price)
        this.props.dragonPurchase({ variables: { email: localStorage.getItem('email'), serial: this.props.match.params.serialnumber, diamond: this.state.price } })
          .then((res) => {
            console.log(res)
            if (res.data.dragonPurchase.email === localStorage.getItem('email')) {
              M.toast({ html: '구매 성공' })
              this.setState({ redirect: true })
            }
            if (res.data.dragonPurchase.email !== localStorage.getItem('email')) {
              M.toast({ html: '구매 할 용이 없어졌어요' })
            }
          })
          .catch((errors) => {
            console.log('errors: ', errors)
          })
      } else {
        M.toast({ html: '잔액 부족' })
      }
    }
    if (localStorage.getItem('email') === null) {
      M.toast({ html: '로그인을 해주세요' })
    }
  }
  handleChoiceCbg(event) {
    console.log('email: ', localStorage.getItem('email'))
    console.log('serial: ', this.props.match.params.serialnumber)
    console.log('choice_cbg: ', event)
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
  handleName(event) {
    this.setState({ change_name: event.target.value })
  }
  handleDragonName() {
    M.toast({ html: '드래곤 이름이 변경되었습니다' })
    this.props.dragonNameChange({ variables: { email: localStorage.getItem('email'), serial: this.props.match.params.serialnumber, name: this.state.change_name } })
      .then((res) => {
        console.log(res)
        this.setState({ new_name: this.state.change_name })
      })
      .catch((errors) => {
        console.log('errors: ', errors)
      })
  }
  render() {
    if (this.state.redirect) {
      window.location.replace('/Activity')
    }
    let x = 0
    let y = 0
    let z = 0
    if (!this.props.finduser.loading && !this.props.data.loading) {
      if (localStorage.getItem('email') !== null) {
        for (let a = 0; a < this.props.finduser.finduser.sword.length; a += 1) {
          this.state.all_sword[a] = this.props.finduser.finduser.sword[a]
        }
        for (let b = 0; b < this.props.finduser.finduser.shield.length; b += 1) {
          this.state.all_shield[b] = this.props.finduser.finduser.shield[b]
        }
        for (let c = 0; c < this.props.finduser.finduser.cbg.length; c += 1) {
          this.state.all_cbg[c] = this.props.finduser.finduser.cbg[c].number
        }
      }
      console.log('this.props', this.props)
      for (let dl = 0; dl < this.props.data.dragons.length; dl += 1) {
        if (this.props.data.dragons[dl].serial === this.props.match.params.serialnumber) {
          // 소유한 모든 용 스테이트, 쿨타임 확인, 수정
          if (this.props.data.dragons[dl].state === 'Resting' || this.props.data.dragons[dl].state === 'brooding' || this.props.data.dragons[dl].state === 'Egg' || this.props.data.dragons[dl].state === 'Sell' || this.props.data.dragons[dl].state === 'Siring' || this.props.data.dragons[dl].state === 'during battle') {
            if (Date.now() > this.props.data.dragons[dl].cooldown[1]) {
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
          this.state.email = this.props.data.dragons[dl].email
          this.state.name = this.props.data.dragons[dl].name
          this.state.birthday = this.props.data.dragons[dl].birthday
          this.state.price = this.props.data.dragons[dl].price
          this.state.period = this.props.data.dragons[dl].period
          this.state.serial = this.props.data.dragons[dl].serial
          this.state.gen = this.props.data.dragons[dl].gen
          this.state.state = this.state.change_state
          this.state.cooldown = this.props.data.dragons[dl].cooldown
          this.state.parents = this.props.data.dragons[dl].parents
          this.state.child = this.props.data.dragons[dl].child
          this.state.choice_cbg = this.props.data.dragons[dl].choice_cbg
          this.state.choice_sword = this.props.data.dragons[dl].choice_sword
          this.state.choice_shield = this.props.data.dragons[dl].choice_shield
          this.state.win = this.props.data.dragons[dl].win
          this.state.lose = this.props.data.dragons[dl].lose
          this.state.winning_rate = this.props.data.dragons[dl].winning_rate
          this.state.comb = this.props.data.dragons[dl].combination
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
          // 다른유저일 경우 현재용의 소유자 정보를 가져온다.
          if (this.state.owner_email === null && this.state.email !== localStorage.getItem('email') && this.state.email !== 'devman') {
            this.props.findbadge({ variables: { email: this.state.email } })
              .then((res) => {
                console.log(res)
                this.setState({ owner_email: res.data.findbadge.email, owner_username: res.data.findbadge.username, owner_icon: res.data.findbadge.choice_icon })
              })
              .catch((errors) => {
                console.log('errors: ', errors)
              })
          }
        } else {
          if (this.props.data.dragons[dl].choice_cbg !== 'null' && this.props.data.dragons[dl].email === localStorage.getItem('email')) {
            this.state.except_cbg[x] = this.props.data.dragons[dl].choice_cbg
            x += 1
          }
          console.log('this.state.except_cbg : ', this.state.except_cbg)
          if (this.props.data.dragons[dl].choice_sword !== 'null' && this.props.data.dragons[dl].email === localStorage.getItem('email')) {
            this.state.except_sword[y] = this.props.data.dragons[dl].choice_sword
            y += 1
          }
          console.log('this.state.except_sword : ', this.state.except_sword)
          if (this.props.data.dragons[dl].choice_shield !== 'null' && this.props.data.dragons[dl].email === localStorage.getItem('email')) {
            this.state.except_shield[z] = this.props.data.dragons[dl].choice_shield
            z += 1
          }
          console.log('this.state.except_shield : ', this.state.except_shield)
        }
      }
      // 부모용 리스트
      if (this.state.parents[0] === 'devman') {
        this.state.parentsList[0] = 'devman'
      }
      if (this.state.parents !== null) {
        for (let pl = 0; pl < this.props.data.dragons.length; pl += 1) {
          if (this.props.data.dragons[pl].serial === this.state.parents[0]) {
            this.state.parentsList[0] = {
              serial: this.props.data.dragons[pl].serial,
              state: this.props.data.dragons[pl].state,
              evolution: this.props.data.dragons[pl].combination.substring(0, 2),
              property: this.props.data.dragons[pl].combination.substring(2, 4),
              wing: this.props.data.dragons[pl].combination.substring(4, 6),
              wingColor: this.props.data.dragons[pl].combination.substring(6, 8),
              horn: this.props.data.dragons[pl].combination.substring(8, 10),
              hornColor: this.props.data.dragons[pl].combination.substring(10, 12),
              tail: this.props.data.dragons[pl].combination.substring(12, 14),
              body: this.props.data.dragons[pl].combination.substring(14, 16),
              bodyColor: this.props.data.dragons[pl].combination.substring(16, 18),
              eye: this.props.data.dragons[pl].combination.substring(18, 20),
              eyeColor: this.props.data.dragons[pl].combination.substring(20, 22),
              mouth: this.props.data.dragons[pl].combination.substring(22, 24),
              nose: this.props.data.dragons[pl].combination.substring(24, 26)
            }
          }
          if (this.props.data.dragons[pl].serial === this.state.parents[1]) {
            this.state.parentsList[1] = {
              serial: this.props.data.dragons[pl].serial,
              state: this.props.data.dragons[pl].state,
              evolution: this.props.data.dragons[pl].combination.substring(0, 2),
              property: this.props.data.dragons[pl].combination.substring(2, 4),
              wing: this.props.data.dragons[pl].combination.substring(4, 6),
              wingColor: this.props.data.dragons[pl].combination.substring(6, 8),
              horn: this.props.data.dragons[pl].combination.substring(8, 10),
              hornColor: this.props.data.dragons[pl].combination.substring(10, 12),
              tail: this.props.data.dragons[pl].combination.substring(12, 14),
              body: this.props.data.dragons[pl].combination.substring(14, 16),
              bodyColor: this.props.data.dragons[pl].combination.substring(16, 18),
              eye: this.props.data.dragons[pl].combination.substring(18, 20),
              eyeColor: this.props.data.dragons[pl].combination.substring(20, 22),
              mouth: this.props.data.dragons[pl].combination.substring(22, 24),
              nose: this.props.data.dragons[pl].combination.substring(24, 26)
            }
          }
        }
      }
      // 자식용 리스트
      let clx = 0
      if (this.state.child !== null) {
        for (let cl = 0; cl < this.props.data.dragons.length; cl += 1) {
          if (this.props.data.dragons[cl].serial === this.state.child[clx]) {
            if (this.props.data.dragons[cl].state === 'Egg') {
              if (Date.now() > Number(this.props.data.dragons[cl].cooldown[1])) {
                this.state.egg_state = 'Normal'
              } else {
                this.state.egg_state = this.props.data.dragons[cl].state
              }
            } else {
              this.state.egg_state = this.props.data.dragons[cl].state
            }
            this.state.childList[clx] = {
              serial: this.props.data.dragons[cl].serial,
              state: this.state.egg_state,
              comb: this.props.data.dragons[cl].combination,
              evolution: this.props.data.dragons[cl].combination.substring(0, 2),
              property: this.props.data.dragons[cl].combination.substring(2, 4),
              wing: this.props.data.dragons[cl].combination.substring(4, 6),
              wingColor: this.props.data.dragons[cl].combination.substring(6, 8),
              horn: this.props.data.dragons[cl].combination.substring(8, 10),
              hornColor: this.props.data.dragons[cl].combination.substring(10, 12),
              tail: this.props.data.dragons[cl].combination.substring(12, 14),
              body: this.props.data.dragons[cl].combination.substring(14, 16),
              bodyColor: this.props.data.dragons[cl].combination.substring(16, 18),
              eye: this.props.data.dragons[cl].combination.substring(18, 20),
              eyeColor: this.props.data.dragons[cl].combination.substring(20, 22),
              mouth: this.props.data.dragons[cl].combination.substring(22, 24),
              nose: this.props.data.dragons[cl].combination.substring(24, 26)
            }
            clx += 1
          }
        }
      }
      console.log('this.state.childList', this.state.childList)

      this.state.possible_cbg = this.state.all_cbg
      for (let a = 0; a < this.state.except_cbg.length; a += 1) {
        this.state.possible_cbg.splice(this.state.possible_cbg.indexOf(this.state.except_cbg[a]), 1)
      }

      console.log('all_sword', this.state.all_sword)
      console.log('except_sword', this.state.except_sword)
      // all sword - expect sword = possible sword
      let psword = 0
      let olsword = false
      for (let sn = 0; sn < this.state.all_sword.length; sn += 1) {
        for (let en = 0; en < this.state.except_sword.length; en += 1) {
          if (this.state.all_sword[sn].number === this.state.except_sword[en]) {
            olsword = true
          }
        }
        if (olsword === false) {
          this.state.possible_sword[psword] = this.state.all_sword[sn]
          psword += 1
        } else {
          olsword = false
        }
      }
      console.log('possible_sword', this.state.possible_sword)

      // all shield - expect shield = possible shield
      let pshield = 0
      let olshield = false
      for (let sn = 0; sn < this.state.all_shield.length; sn += 1) {
        for (let en = 0; en < this.state.except_shield.length; en += 1) {
          if (this.state.all_shield[sn].number === this.state.except_shield[en]) {
            olshield = true
          }
        }
        if (olshield === false) {
          this.state.possible_shield[pshield] = this.state.all_shield[sn]
          pshield += 1
        } else {
          olshield = false
        }
      }
    }
    return (
      <Layout>
        {this.state.email === localStorage.getItem('email') && localStorage.getItem('email') !== null &&
          <MyGonHeader/>
        }
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

                            <img src={`${process.env.PUBLIC_URL}/images/item/sword/sword_${item.number}.png`} onClick={ () => this.handleChoiceSword(item.number)}/>
                            {this.state.choice_sword === item.number && this.state.change_sword === 'doNotClick' &&
                              <div class="absolute">
                                <img src={`${process.env.PUBLIC_URL}/images/item/custom_bg/cbg_choice.png`} onClick={this.handleReleaseSword}/>
                              </div>
                            }
                            {this.state.change_sword === item.number &&
                              <div class="absolute">
                                <img src={`${process.env.PUBLIC_URL}/images/item/custom_bg/cbg_choice.png`} onClick={this.handleReleaseSword}/>
                              </div>
                            }
                            {this.state.change_sword === 'null' &&
                              <div class="absolute">
                                <img src={`${process.env.PUBLIC_URL}/images/item/sword/sword_${item.number}.png`} onClick={ () => this.handleChoiceSword(item.number)}/>
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

                            <img src={`${process.env.PUBLIC_URL}/images/item/shield/shield_${item.number}.png`} onClick={ () => this.handleChoiceShield(item.number)}/>
                            {this.state.choice_shield === item.number && this.state.change_shield === 'doNotClick' &&
                              <div class="absolute">
                                <img src={`${process.env.PUBLIC_URL}/images/item/custom_bg/cbg_choice.png`} onClick={this.handleReleaseShield}/>
                              </div>
                            }
                            {this.state.change_shield === item.number &&
                              <div class="absolute">
                                <img src={`${process.env.PUBLIC_URL}/images/item/custom_bg/cbg_choice.png`} onClick={this.handleReleaseShield}/>
                              </div>
                            }
                            {this.state.change_shield === 'null' &&
                              <div class="absolute">
                                <img src={`${process.env.PUBLIC_URL}/images/item/shield/shield_${item.number}.png`} onClick={ () => this.handleChoiceShield(item.number)}/>
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

        <div id="modal_name" class="modal">
          <div class="modal-content">
            <h4>Modal Header</h4>
            <div class="row margin-top-50">
              <form class="col s12">
                <div class="row">
                  <div class="input-field col s12">
                    <textarea id="textarea1" class="materialize-textarea" onChange={this.handleName}></textarea>
                    <label for="textarea1">dragon name</label>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div class="modal-footer">
            <a href="#!" class="modal-close waves-effect waves-green btn-flat" onClick={this.handleDragonName}>Agree</a>
          </div>
        </div>

        <div id="modal_cbg" class="modal">
          <div class="modal-content">
            <h4>Modal Header</h4>
            <div className='center'>
              <div className="row">
                {this.state.possible_cbg.map(item =>
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
              <MaterialPagination linkPath="gons" pageNum={this.state.pagenum} lastPage={this.state.lastPage} />
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
                      {this.state.state !== 'Egg' &&
                        <div className="card-image">
                          {this.state.email !== localStorage.getItem('email') && this.state.choice_cbg === 'null' &&
                            <img src={`${process.env.PUBLIC_URL}/images/gonImages/1_property/property_${this.state.property}.png`}/>
                          }
                          {this.state.email !== localStorage.getItem('email') && this.state.choice_cbg !== 'null' && this.state.state !== 'Sell' && this.state.state !== 'Siring' &&
                            <img src={`${process.env.PUBLIC_URL}/images/item/custom_bg/cbg_${this.state.choice_cbg}.png`}/>
                          }
                          {this.state.email !== localStorage.getItem('email') && this.state.choice_cbg !== 'null' && this.state.state === 'Sell' &&
                            <img src={`${process.env.PUBLIC_URL}/images/gonImages/1_property/property_${this.state.property}.png`}/>
                          }
                          {this.state.email !== localStorage.getItem('email') && this.state.choice_cbg !== 'null' && this.state.state === 'Siring' &&
                            <img src={`${process.env.PUBLIC_URL}/images/gonImages/1_property/property_${this.state.property}.png`}/>
                          }
                          {this.state.email === localStorage.getItem('email') &&
                            <div>
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
                            </div>
                          }
                          {this.state.evolution !== '03' && this.state.evolution !== '04' && this.state.evolution !== '05' &&
                            <div>
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
                          }
                          {this.state.evolution === '03' &&
                              <div class="absolute">
                                <img src={`${process.env.PUBLIC_URL}/images/gonImages/step3/step3_03${this.state.comb.substring(4, 6)}${this.state.comb.substring(6, 8)}.png`}/>
                              </div>
                          }
                          {this.state.evolution === '04' &&
                              <div class="absolute">
                                <img src={`${process.env.PUBLIC_URL}/images/gonImages/step4/step4_04${this.state.comb.substring(4, 6)}${this.state.comb.substring(6, 8)}.png`}/>
                              </div>
                          }
                          {this.state.evolution === '05' &&
                              <div class="absolute">
                                <img src={`${process.env.PUBLIC_URL}/images/gonImages/step5/step5_05${this.state.comb.substring(4, 6)}${this.state.comb.substring(6, 8)}.png`}/>
                              </div>
                          }
                        </div>
                      }
                      {this.state.state === 'Egg' &&
                        <div className='margin-bottom-30'>
                          <img src={`${process.env.PUBLIC_URL}/images/gonImages/1_property/property_${this.state.property}.png`}/>
                          <div class="absolute">
                            {this.state.evolution === '01' &&
                              <img src={`${process.env.PUBLIC_URL}/images/gonImages/egg/egg.png`}/>
                            }
                            {this.state.evolution === '02' &&
                              <img src={`${process.env.PUBLIC_URL}/images/gonImages/egg/egg2.png`}/>
                            }
                            {this.state.evolution === '03' &&
                              <img src={`${process.env.PUBLIC_URL}/images/gonImages/egg/egg3.png`}/>
                            }
                            {this.state.evolution === '04' &&
                              <img src={`${process.env.PUBLIC_URL}/images/gonImages/egg/egg.png`}/>
                            }
                          </div>
                        </div>
                      }
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {this.state.state !== 'Egg' &&
              <div class="detail-Explanation" >
                <div class="row">

                  {this.state.email !== localStorage.getItem('email') &&
                    <div className="right margin-top-15">
                      <span>
                        <div class="left valign-wrapper">
                          <div class="col s6 m6 l12">
                            <a href={`/profile/${this.state.owner_username}/1`}><img src={`${process.env.PUBLIC_URL}/images/icon/icon_${this.state.owner_icon}.png`} alt="" class="circle responsive-img"/></a>
                          </div>
                          <div class="col">
                            <span class="black-text">
                              <a href={`/profile/${this.state.owner_username}/1`}><h5>{this.state.owner_email}</h5></a>
                              <a href={`/profile/${this.state.owner_username}/1`}><p>{this.state.owner_username}</p></a>
                            </span>
                          </div>
                        </div>
                      </span>
                    </div>
                  }

                  {this.state.email !== localStorage.getItem('email') && this.state.state === 'New' &&
                    <div className="right margin-top-15">
                      <span>
                        <a class="waves-effect waves-light btn-large margin-right-10" onClick={this.handleBuybtn}><i class="material-icons left">cloud</i>Buy</a>
                      </span>
                    </div>
                  }
                  {this.state.email !== localStorage.getItem('email') && this.state.state === 'Sell' &&
                    <div className="right margin-top-15">
                      <span>
                        <a class="waves-effect waves-light btn-large margin-right-10" onClick={this.handleBuybtn}><i class="material-icons left">cloud</i>Buy</a>
                      </span>
                    </div>
                  }
                  {this.state.email !== localStorage.getItem('email') && this.state.state === 'Siring' && localStorage.getItem('email') !== null &&
                    <div className="right margin-top-15">
                      <span>
                        <a href={`/breed/${this.state.serial}`} class="waves-effect waves-light btn-large margin-right-10"><i class="material-icons left">cloud</i>Siring</a>
                      </span>
                    </div>
                  }
                  {this.state.email === localStorage.getItem('email') &&
                    <div className="right margin-top-30">
                      {this.state.state !== 'Resting' && this.state.state !== 'brooding' && this.state.state !== 'during battle' && this.state.state !== 'Sell' && this.state.state !== 'Siring' && this.state.state !== 'Matching' &&
                        <span>
                          <a href={`/breed/${this.state.serial}`} class="waves-effect waves-light btn-large margin-right-10"><i class="material-icons left">cloud</i>Breed</a>
                          <a href={`/sell/${this.state.serial}`} class="waves-effect waves-light btn-large margin-right-10"><i class="material-icons left">cloud</i>Sell</a>
                          <a href={`/gift/${this.state.serial}`} class="waves-effect waves-light btn-large"><i class="material-icons left">cloud</i>Gift</a>
                        </span>
                      }
                      {this.state.state === 'Resting' &&
                        <span>
                          <a class="waves-effect waves-light btn-large margin-right-10" onClick={this.handleResting}><i class="material-icons left">cloud</i>Breed</a>
                          <a class="waves-effect waves-light btn-large margin-right-10" onClick={this.handleResting}><i class="material-icons left">cloud</i>Sell</a>
                          <a class="waves-effect waves-light btn-large" onClick={this.handleResting}><i class="material-icons left">cloud</i>Gift</a>
                        </span>
                      }
                      {this.state.state === 'brooding' &&
                        <span>
                          <a class="waves-effect waves-light btn-large margin-right-10" onClick={this.handleBrooding}><i class="material-icons left">cloud</i>Breed</a>
                          <a class="waves-effect waves-light btn-large margin-right-10" onClick={this.handleBrooding}><i class="material-icons left">cloud</i>Sell</a>
                          <a class="waves-effect waves-light btn-large" onClick={this.handleBrooding}><i class="material-icons left">cloud</i>Gift</a>
                        </span>
                      }
                      {this.state.state === 'during battle' &&
                        <span>
                          <a class="waves-effect waves-light btn-large margin-right-10" onClick={this.handleDuringBattle}><i class="material-icons left">cloud</i>Breed</a>
                          <a class="waves-effect waves-light btn-large margin-right-10" onClick={this.handleDuringBattle}><i class="material-icons left">cloud</i>Sell</a>
                          <a class="waves-effect waves-light btn-large" onClick={this.handleDuringBattle}><i class="material-icons left">cloud</i>Gift</a>
                        </span>
                      }
                      {this.state.state === 'Sell' &&
                        <span>
                          <a class="waves-effect waves-light btn-large margin-right-10" onClick={this.handleSell}><i class="material-icons left">cloud</i>Breed</a>
                          <a class="waves-effect waves-light btn-large margin-right-10" onClick={this.handleSellCancel}><i class="material-icons left">cloud</i>SellCancel</a>
                          <a class="waves-effect waves-light btn-large" onClick={this.handleSell}><i class="material-icons left">cloud</i>Gift</a>
                        </span>
                      }
                      {this.state.state === 'Siring' &&
                        <span>
                          <a class="waves-effect waves-light btn-large margin-right-10" onClick={this.handleSiring}><i class="material-icons left">cloud</i>Breed</a>
                          <a class="waves-effect waves-light btn-large margin-right-10" onClick={this.handleSiringCancel}><i class="material-icons left">cloud</i>SiringCancel</a>
                          <a class="waves-effect waves-light btn-large" onClick={this.handleSiring}><i class="material-icons left">cloud</i>Gift</a>
                        </span>
                      }
                      {this.state.state === 'Matching' &&
                        <span>
                          <a class="waves-effect waves-light btn-large margin-right-10" onClick={this.handleMatching}><i class="material-icons left">cloud</i>Breed</a>
                          <a class="waves-effect waves-light btn-large margin-right-10" onClick={this.handleMatching}><i class="material-icons left">cloud</i>SiringCancel</a>
                          <a class="waves-effect waves-light btn-large" onClick={this.handleMatching}><i class="material-icons left">cloud</i>Gift</a>
                        </span>
                      }
                    </div>
                  }

                  {this.state.new_name === null &&
                    <font size="7">{this.state.name}</font>
                  }
                  {this.state.new_name !== null &&
                    <font size="7">{this.state.new_name}</font>
                  }
                  {this.state.email === localStorage.getItem('email') &&
                    <a class="modal-trigger" href="#modal_name"><i class="Medium material-icons margin-left-10">edit</i></a>
                  }
                  <p><font size="6">{this.state.serial}</font></p>
                </div>

                - win {this.state.win}&nbsp;&nbsp;&nbsp;- lose {this.state.lose}&nbsp;&nbsp;&nbsp;- rate {this.state.winning_rate}&nbsp;&nbsp;&nbsp;- gen {this.state.gen}&nbsp;&nbsp;&nbsp;- cooldown {this.state.cooldown[0]}
                    &nbsp;&nbsp;&nbsp;- price {this.state.price}&nbsp;&nbsp;&nbsp;- birthday {this.state.birthday}
                <br/><br/><br/>

                {this.state.email !== localStorage.getItem('email') &&
                  <div>
                    <h5>price</h5>
                    {this.state.price}
                    <h5>period</h5>
                    {this.state.period}
                  </div>
                }
                {this.state.email === localStorage.getItem('email') &&
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
                }

                <h5>lineament</h5>
                {this.state.comb}
                <br/><br/><br/>
                <h5>parents</h5>
                <div className='center'>
                  <div className="row">
                    {this.state.parentsList.map(item =>
                      <div key={item.id}>
                        <div className="col s12 m6 l3">
                          <div className="card">
                            { this.state.parentsList[0] === 'devman' &&
                              <div className="card-image">
                                <img src={`${process.env.PUBLIC_URL}/images/brief_Info/DragonBalls.png`}/>
                              </div>
                            }
                            { this.state.parentsList[0] !== 'devman' &&
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
                                  <a href={`/gons/${item.serial}`}><img src={`${process.env.PUBLIC_URL}/images/gonImages/8_nose/nose_${item.evolution}${item.nose}.png`}/></a>
                                </div>
                              </div>
                            }
                          </div>
                        </div>
                      </div>)}
                  </div>
                </div>
                <br/><br/><br/>
                <h5>children</h5>
                <div className='center'>
                  <div className="row">
                    {this.state.childList.map(item =>
                      <div key={item.id}>
                        <div className="col s12 m6 l3">
                          <div className="card">
                            <div className="card-image">
                              {item.state === 'Egg' &&
                                <div>
                                  <img src={`${process.env.PUBLIC_URL}/images/gonImages/1_property/property_${item.property}.png`}/>
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
                                    {item.evolution === '04' &&
                                      <img src={`${process.env.PUBLIC_URL}/images/gonImages/egg/egg.png`}/>
                                    }
                                  </div>
                                </div>
                              }
                              {item.state !== 'Egg' && item.evolution !== '03' && item.evolution !== '04' &&
                                <div>
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
                                    <a href={`/gons/${item.serial}`}><img src={`${process.env.PUBLIC_URL}/images/gonImages/8_nose/nose_${item.evolution}${item.nose}.png`}/></a>
                                  </div>
                                </div>
                              }
                              {item.state !== 'Egg' && item.evolution === '03' &&
                                <div>
                                  <img src={`${process.env.PUBLIC_URL}/images/gonImages/1_property/property_${item.property}.png`}/>
                                  <div class="absolute">
                                    <a href={`/gons/${item.serial}`}><img src={`${process.env.PUBLIC_URL}/images/gonImages/step3/step3_03${item.comb.substring(4, 6)}${item.comb.substring(6, 8)}.png`}/></a>
                                  </div>
                                </div>
                              }
                              {item.state !== 'Egg' && item.evolution === '04' &&
                                <div>
                                  <img src={`${process.env.PUBLIC_URL}/images/gonImages/1_property/property_${item.property}.png`}/>
                                  <div class="absolute">
                                    <a href={`/gons/${item.serial}`}><img src={`${process.env.PUBLIC_URL}/images/gonImages/step4/step4_04${item.comb.substring(4, 6)}${item.comb.substring(6, 8)}.png`}/></a>
                                  </div>
                                </div>
                              }
                            </div>
                          </div>
                        </div>
                      </div>)}
                  </div>
                </div>
              </div>
            }
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
  graphql(dragons),
  graphql(editChoicecbg, { name: 'editChoicecbg' }),
  graphql(editChoicesword, { name: 'editChoicesword' }),
  graphql(editChoiceshield, { name: 'editChoiceshield' }),
  graphql(editUserDragonState, { name: 'editUserDragonState' }),
  graphql(dragonPurchase, { name: 'dragonPurchase' }),
  graphql(dragonSellCancel, { name: 'dragonSellCancel' }),
  graphql(dragonSiringCancel, { name: 'dragonSiringCancel' }),
  graphql(battleUpdate, { name: 'battleUpdate' }),
  graphql(findbadge, { name: 'findbadge' }),
  graphql(dragonNameChange, { name: 'dragonNameChange' })
)(gons)
