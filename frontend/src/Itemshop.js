import React, { Component } from 'react'
import { graphql, compose } from 'react-apollo'
import gql from 'graphql-tag'
import { Link, Redirect } from 'react-router-dom'
import _ from 'underscore'
import Layout from './Layout'
import MaterialPagination from './MaterialPagination'

const finduser = gql`
query finduser($email: String!){
  finduser(email:$email) {
  email
  username
  name
  diamond
  gold
  trophy
  iconNum
  cbg
  sword
  shield
  dragons {
    name
    combination
    birthday
    price
    serial
    choice_cbg
    choice_sword
    choice_shield
  }
 }
}
`
const finditem = gql`
query finditem($email: String!){
  finditem(email:$email) {
  sword {
    number
    gold
    diamond
    trophy
  }
  shield {
    number
    gold
    diamond
    trophy
  }
  cbg {
    number
    gold
    diamond
    trophy
  }
 }
}
`
const itemPurchase = gql`
mutation itemPurchase($email: String!, $sword: String, $shield: String, $cbg: String, $diamond: Int, $gold: Int, $trophy: Int) {
  itemPurchase(email:$email, sword:$sword, shield:$shield, cbg:$cbg, diamond:$diamond, gold:$gold, trophy:$trophy) {
    email
    username
    name
    diamond
    gold
    trophy
    iconNum
    sword
    shield
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

class Itemshop extends Component {
  constructor(props) {
    super(props)
    this.state = {
      redirect: false,
      user_dia: null,
      user_gold: null,
      user_trophy: null,
      user_sword: [],
      user_shield: [],
      user_cbg: [],
      dia: null,
      point: null,
      trophy: null,
      all_sword: [],
      all_shield: [],
      all_cbg: [],
      modal_item: null,
      modal_dia: null,
      modal_gold: null,
      modal_trophy: null
    }
    this.handlePurchase = this.handlePurchase.bind(this) // 구매버튼
    this.handleModal = this.handleModal.bind(this) // 아이템선택
  }
  handlePurchase() {
    const modalItem = this.state.modal_item.split('/') // 구매할 아이템 종류 modalItem[0]
    const modalNumber = modalItem[1].split('_') // 구매할 아이템 번호 modalNumber[1]
    if (modalItem[0] === 'sword') {
      this.props.itemPurchase({ variables: { email: localStorage.getItem('email'), sword: modalNumber[1], shield: null, cbg: null, diamond: this.state.modal_dia, gold: this.state.modal_gold, trophy: this.state.modal_trophy } })
        .then((res) => {
          this.setState({ redirect: true })
          console.log(res)
        })
        .catch((errors) => {
          console.log('errors: ', errors)
        })
    }
    if (modalItem[0] === 'shield') {
      this.props.itemPurchase({ variables: { email: localStorage.getItem('email'), sword: null, shield: modalNumber[1], cbg: null, diamond: this.state.modal_dia, gold: this.state.modal_gold, trophy: this.state.modal_trophy } })
        .then((res) => {
          this.setState({ redirect: true })
          console.log(res)
        })
        .catch((errors) => {
          console.log('errors: ', errors)
        })
    }
    if (modalItem[0] === 'custom_bg') {
      this.props.itemPurchase({ variables: { email: localStorage.getItem('email'), sword: null, shield: null, cbg: modalNumber[1], diamond: this.state.modal_dia, gold: this.state.modal_gold, trophy: this.state.modal_trophy } })
        .then((res) => {
          this.setState({ redirect: true })
          console.log(res)
        })
        .catch((errors) => {
          console.log('errors: ', errors)
        })
    }
  }
  handleModal(choiceItem, choiceDiamond, choiceGold, choiceTrophy) {
    this.setState({
      modal_item: choiceItem,
      modal_dia: choiceDiamond,
      modal_gold: choiceGold,
      modal_trophy: choiceTrophy
    })
  }
  render() {
    if (this.state.redirect) {
      return <Redirect to='/Activity'/>
    }
    if (!this.props.finduser.loading && !this.props.finditem.loading) {
      console.log('this.props', this.props)
      this.state.user_dia = this.props.finduser.finduser.diamond
      this.state.user_gold = this.props.finduser.finduser.gold
      this.state.user_trophy = this.props.finduser.finduser.trophy
      this.state.user_sword = this.props.finduser.finduser.sword
      this.state.user_shield = this.props.finduser.finduser.shield
      this.state.user_cbg = this.props.finduser.finduser.cbg

      for (let sw = 0; sw < this.props.finditem.finditem.sword.length; sw += 1) {
        this.state.all_sword[sw] = this.props.finditem.finditem.sword[sw]
      }
      for (let sh = 0; sh < this.props.finditem.finditem.shield.length; sh += 1) {
        this.state.all_shield[sh] = this.props.finditem.finditem.shield[sh]
      }
      for (let cb = 0; cb < this.props.finditem.finditem.cbg.length; cb += 1) {
        this.state.all_cbg[cb] = this.props.finditem.finditem.cbg[cb]
      }
    }
    console.log('user_sword', this.state.user_sword)
    return (
      <Layout>
        <div id="buyitem_modal" class="modal">
          <div class="modal-content">
            <h4>Modal Header</h4>
            <p>{this.state.modal_item}</p>
            <img class="responsive-img" src={`${process.env.PUBLIC_URL}/images/item/${this.state.modal_item}.png`} width='200px' height='200px'/>
            {this.state.modal_dia !== 0 &&
              <span>
                <img src={`${process.env.PUBLIC_URL}/images/brief_info/dia.png`}/>
                <font size="5">{this.state.modal_dia}</font>
              </span>
            }
            {this.state.modal_gold !== 0 &&
              <span>
                <img src={`${process.env.PUBLIC_URL}/images/brief_info/gold.png`}/>
                <font size="5">{this.state.modal_gold}</font>
              </span>
            }
            {this.state.modal_trophy !== 0 &&
              <span>
                <img src={`${process.env.PUBLIC_URL}/images/brief_info/trophy2.png`}/>
                <font size="5">{this.state.modal_trophy}</font>
              </span>
            }
            <a class="waves-effect waves-light btn-large" onClick={this.handlePurchase}>구매하기</a>

          </div>
          <div class="modal-footer">
            <a href="#!" class="modal-close waves-effect waves-green btn-flat">Agree</a>
          </div>
        </div>

        <div className='container'>
          <div className="row">

            <div className="col l12 m12 s12 margin-bottom-30">
              <div className="col s12 m6 l6 left left-align">
                <h2>Item</h2>
              </div>
              <div className="col s12 m6 l6 right right-align">
                <h5><img src={`${process.env.PUBLIC_URL}/images/brief_info/dia.png`}/> {this.state.user_dia}
                  <img src={`${process.env.PUBLIC_URL}/images/brief_info/gold.png`}/> {this.state.user_gold}
                  <img src={`${process.env.PUBLIC_URL}/images/brief_info/trophy2.png`}/> {this.state.user_trophy}</h5>
              </div>
            </div>
      
            <h5 className="">Sword</h5>
            <div class="col s12">
              <div className='center'>
                <div className="row">
                  {this.state.all_sword.map(item =>
                    <div key={item.id}>
                      <div className="col s12 m6 l3">
                        <div className="card">
                          <div className="card-image">
                            <a class="modal-trigger" href="#buyitem_modal">
                              <img src={`${process.env.PUBLIC_URL}/images/item/sword/sword_${item.number}.png`} onClick={ () => this.handleModal(`sword/sword_${item.number}`, item.diamond, item.gold, item.trophy)}/>
                            </a>
                            {this.state.user_sword.map(buyed =>
                              <div key={buyed.id}>
                                {buyed === item.number &&
                                  <div class="absolute">
                                    <img src={`${process.env.PUBLIC_URL}/images/itemshop/buyed.png`}/>
                                  </div>
                                }
                              </div>)}
                          </div>
                          <div className="card-content">
                            {item.diamond !== 0 &&
                              <span>
                                <img src={`${process.env.PUBLIC_URL}/images/brief_info/dia.png`}/>
                                <font size="5">{item.diamond}</font>
                              </span>
                            }
                            {item.gold !== 0 &&
                              <span>
                                <img src={`${process.env.PUBLIC_URL}/images/brief_info/gold.png`}/>
                                <font size="5">{item.gold}</font>
                              </span>
                            }
                            {item.trophy !== 0 &&
                              <span>
                                <img src={`${process.env.PUBLIC_URL}/images/brief_info/trophy2.png`}/>
                                <font size="5">{item.trophy}</font>
                              </span>
                            }
                          </div>
                        </div>
                      </div>
                    </div>)}
                </div>
              </div>
            </div>

            <h5 className="">Shield</h5>
            <div class="col s12">
              <div className='center'>
                <div className="row">
                  {this.state.all_shield.map(item =>
                    <div key={item.id}>
                      <div className="col s12 m6 l3">
                        <div className="card">
                          <div className="card-image">
                            <a class="modal-trigger" href="#buyitem_modal">
                              <img src={`${process.env.PUBLIC_URL}/images/item/shield/shield_${item.number}.png`} onClick={ () => this.handleModal(`shield/shield_${item.number}`, item.diamond, item.gold, item.trophy)}/>
                            </a>
                            {this.state.user_shield.map(buyed =>
                              <div key={buyed.id}>
                                {item.number === buyed &&
                                  <div class="absolute">
                                    <img src={`${process.env.PUBLIC_URL}/images/itemshop/buyed.png`}/>
                                  </div>
                                }
                              </div>)}
                          </div>
                          <div className="card-content">
                            {item.diamond !== 0 &&
                              <span>
                                <img src={`${process.env.PUBLIC_URL}/images/brief_info/dia.png`}/>
                                <font size="5">{item.diamond}</font>
                              </span>
                            }
                            {item.gold !== 0 &&
                              <span>
                                <img src={`${process.env.PUBLIC_URL}/images/brief_info/gold.png`}/>
                                <font size="5">{item.gold}</font>
                              </span>
                            }
                            {item.trophy !== 0 &&
                              <span>
                                <img src={`${process.env.PUBLIC_URL}/images/brief_info/trophy2.png`}/>
                                <font size="5">{item.trophy}</font>
                              </span>
                            }
                          </div>
                        </div>
                      </div>
                    </div>)}
                </div>
              </div>
            </div>

            <h5 className="">Cbg</h5>
            <div class="col s12">
              <div className='center'>
                <div className="row">
                  {this.state.all_cbg.map(item =>
                    <div key={item.id}>
                      <div className="col s12 m6 l3">
                        <div className="card">
                          <div className="card-image">
                            <a class="modal-trigger" href="#buyitem_modal">
                              <img src={`${process.env.PUBLIC_URL}/images/item/custom_bg/cbg_${item.number}.png`} onClick={ () => this.handleModal(`custom_bg/cbg_${item.number}`, item.diamond, item.gold, item.trophy)}/>
                            </a>
                            {this.state.user_cbg.map(buyed =>
                              <div key={buyed.id}>
                                {item.number === buyed &&
                                  <div class="absolute">
                                    <img src={`${process.env.PUBLIC_URL}/images/itemshop/buyed.png`}/>
                                  </div>
                                }
                              </div>)}
                          </div>
                          <div className="card-content">
                            {item.diamond !== 0 &&
                              <span>
                                <img src={`${process.env.PUBLIC_URL}/images/brief_info/dia.png`}/>
                                <font size="5">{item.diamond}</font>
                              </span>
                            }
                            {item.gold !== 0 &&
                              <span>
                                <img src={`${process.env.PUBLIC_URL}/images/brief_info/gold.png`}/>
                                <font size="5">{item.gold}</font>
                              </span>
                            }
                            {item.trophy !== 0 &&
                              <span>
                                <img src={`${process.env.PUBLIC_URL}/images/brief_info/trophy2.png`}/>
                                <font size="5">{item.trophy}</font>
                              </span>
                            }
                          </div>
                        </div>
                      </div>
                    </div>)}
                </div>
              </div>
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
  graphql(finditem, {
    name: 'finditem',
    options: props => ({
      variables: {
        email: localStorage.getItem('email')
      }
    })
  }),
  graphql(itemPurchase, { name: 'itemPurchase' })
)(Itemshop)
