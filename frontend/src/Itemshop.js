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
  cbg {
    number
    name
    description
    gold
    diamond
    trophy
  }
  sword {
    number
    name
    description
    gold
    diamond
    trophy
  }
  shield {
    number
    name
    description
    gold
    diamond
    trophy
  }
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
    name
    description
    gold
    diamond
    trophy
  }
  shield {
    number
    name
    description
    gold
    diamond
    trophy
  }
  cbg {
    number
    name
    description
    gold
    diamond
    trophy
  }
 }
}
`
const itemPurchase = gql`
mutation itemPurchase($email: String!, $number: String!, $item: String!, $name: String!, $description: String!, $diamond: Int!, $gold: Int!, $trophy: Int!) {
  itemPurchase(email:$email, number:$number, item:$item, name:$name, description:$description, diamond:$diamond, gold:$gold, trophy:$trophy) {
    email
    username
    name
    diamond
    gold
    trophy
    iconNum
    cbg {
      name
      description
      number
      gold
      diamond
      trophy
    }
    sword {
      name
      description
      number
      gold
      diamond
      trophy
    }
    shield {
      name
      description
      number
      gold
      diamond
      trophy
    }
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
      all_sword: [],
      all_shield: [],
      all_cbg: [],
      modal_item: null,
      modal_dia: null,
      modal_gold: null,
      modal_trophy: null,
      modal_name: null,
      modal_desc: null
    }
    this.handlePurchase = this.handlePurchase.bind(this) // 구매버튼
    this.handleModal = this.handleModal.bind(this) // 아이템선택
  }
  handlePurchase() {
    const modalItem = this.state.modal_item.split('/') // 구매할 아이템 종류 modalItem[0]
    const modalNumber = modalItem[1].split('_') // 구매할 아이템 번호 modalNumber[1]
    this.props.itemPurchase({ variables: { email: localStorage.getItem('email'), number: modalNumber[1], item: modalItem[0], name: this.state.modal_name, description: this.state.modal_desc, diamond: this.state.modal_dia, gold: this.state.modal_gold, trophy: this.state.modal_trophy } })
      .then((res) => {
        this.setState({ redirect: true })
        console.log(res)
      })
      .catch((errors) => {
        console.log('errors: ', errors)
      })
  }
  handleModal(choiceItem, choiceDiamond, choiceGold, choiceTrophy, choiceName, choiceDesc) {
    this.setState({
      modal_item: choiceItem,
      modal_dia: choiceDiamond,
      modal_gold: choiceGold,
      modal_trophy: choiceTrophy,
      modal_name: choiceName,
      modal_desc: choiceDesc
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
      for (let x = 0; x < this.props.finduser.finduser.sword.length; x += 1) {
        this.state.user_sword[x] = this.props.finduser.finduser.sword[x].number
      }
      for (let y = 0; y < this.props.finduser.finduser.shield.length; y += 1) {
        this.state.user_shield[y] = this.props.finduser.finduser.shield[y].number
      }
      for (let z = 0; z < this.props.finduser.finduser.cbg.length; z += 1) {
        this.state.user_cbg[z] = this.props.finduser.finduser.cbg[z].number
      }
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
            <h3>{this.state.modal_name}</h3>
            <h3>{this.state.modal_desc}</h3>
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
                              <img src={`${process.env.PUBLIC_URL}/images/item/sword/sword_${item.number}.png`} onClick={ () => this.handleModal(`sword/sword_${item.number}`, item.diamond, item.gold, item.trophy, item.name, item.description)}/>
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
                            <h6>{item.name}</h6>
                            <h6>{item.description}</h6>
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
                              <img src={`${process.env.PUBLIC_URL}/images/item/shield/shield_${item.number}.png`} onClick={ () => this.handleModal(`shield/shield_${item.number}`, item.diamond, item.gold, item.trophy, item.name, item.description)}/>
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
                            <h6>{item.name}</h6>
                            <h6>{item.description}</h6>
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
                              <img src={`${process.env.PUBLIC_URL}/images/item/custom_bg/cbg_${item.number}.png`} onClick={ () => this.handleModal(`custom_bg/cbg_${item.number}`, item.diamond, item.gold, item.trophy, item.name, item.description)}/>
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
                            <h6>{item.name}</h6>
                            <h6>{item.description}</h6>
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
