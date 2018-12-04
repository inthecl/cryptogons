import React, { Component } from 'react'
import { graphql, compose } from 'react-apollo'
import { finduser, edragons, finditem, itemPurchase, edragonPurchase } from './queries'
import Layout from './Layout'

class event extends Component {
  constructor(props) {
    super(props)
    this.state = {
      redirect: false,
      user_dia: null,
      user_gold: null,
      user_trophy: null,
      edragons: [],
      modal_gon_name: null,
      modal_gon_desc: null,
      modal_gon_dia: null,
      modal_gon_gold: null,
      modal_gon_trophy: null,
      modal_gon_comb: null,
      modal_gon_serial: null,
      modal_item_type: null,
      modal_item_dia: null,
      modal_item_gold: null,
      modal_item_trophy: null,
      modal_item_name: null,
      modal_item_desc: null,
      user_sword: [],
      user_shield: [],
      user_cbg: [],
      all_sword: [],
      all_shield: [],
      all_cbg: []
    }
    this.handleGonModal = this.handleGonModal.bind(this)
    this.handleGonPurchase = this.handleGonPurchase.bind(this)
    this.handleItemModal = this.handleItemModal.bind(this)
    this.handleItemPurchase = this.handleItemPurchase.bind(this)
  }
  handleGonModal(name, desc, dia, gold, trophy, comb, serial) {
    this.setState({
      modal_gon_name: name,
      modal_gon_desc: desc,
      modal_gon_dia: dia,
      modal_gon_gold: gold,
      modal_gon_trophy: trophy,
      modal_gon_comb: comb,
      modal_gon_serial: serial
    })
  }
  handleItemModal(item, diamond, gold, trophy, name, desc) {
    this.setState({
      modal_item_type: item,
      modal_item_dia: diamond,
      modal_item_gold: gold,
      modal_item_trophy: trophy,
      modal_item_name: name,
      modal_item_desc: desc
    })
  }
  handleGonPurchase(e) {
    this.props.edragonPurchase({ variables: { email: localStorage.getItem('email'), serial: this.state.modal_gon_serial, currency: e } })
      .then((res) => {
        this.setState({ redirect: true })
        console.log(res)
      })
      .catch((errors) => {
        console.log('errors: ', errors)
      })
  }
  handleItemPurchase(e) {
    const modalItem = this.state.modal_item_type.split('/') // 구매할 아이템 종류 modalItem[0]
    const modalNumber = modalItem[1].split('_') // 구매할 아이템 번호 modalNumber[1]+
    console.log('modalNumber: ', modalNumber)

    this.props.itemPurchase({ variables: { email: localStorage.getItem('email'), item: modalItem[0], number: modalNumber[1], currency: e } })
      .then((res) => {
        this.setState({ redirect: true })
        console.log(res)
      })
      .catch((errors) => {
        console.log('errors: ', errors)
        console.log('item: ', modalItem[0])
        console.log('number: ', modalNumber[1])
        console.log('currency: ', e)
      })
  }
  render() {
    if (this.state.redirect) {
      window.location.replace('/Activity')
    }
    if (!this.props.data.loading && !this.props.finduser.loading && !this.props.finditem.loading) {
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
      let asword = 0
      for (let sw = 0; sw < this.props.finditem.finditem.sword.length; sw += 1) {
        if (this.props.finditem.finditem.sword[sw].eicon !== null && Date.now() <= this.props.finditem.finditem.sword[sw].eperiod) {
          this.state.all_sword[asword] = this.props.finditem.finditem.sword[sw]
          asword += 1
        }
      }
      let ashield = 0
      for (let sh = 0; sh < this.props.finditem.finditem.shield.length; sh += 1) {
        if (this.props.finditem.finditem.shield[sh].eicon !== null && Date.now() <= this.props.finditem.finditem.shield[sh].eperiod) {
          this.state.all_shield[ashield] = this.props.finditem.finditem.shield[sh]
          ashield += 1
        }
      }
      let acbg = 0
      for (let cb = 0; cb < this.props.finditem.finditem.cbg.length; cb += 1) {
        if (this.props.finditem.finditem.cbg[cb].eicon !== null && Date.now() <= this.props.finditem.finditem.cbg[cb].eperiod) {
          this.state.all_cbg[acbg] = this.props.finditem.finditem.cbg[cb]
          acbg += 1
        }
      }

      let dcx = 0
      for (let dl = 0; dl < this.props.data.edragons.length; dl += 1) {
        if (Date.now() <= this.props.data.edragons[dl].eperiod) { // 이벤트기간
          this.state.edragons[dcx] = {
            ename: this.props.data.edragons[dl].ename,
            edesc: this.props.data.edragons[dl].edesc,
            enumber: this.props.data.edragons[dl].enumber,
            eicon: this.props.data.edragons[dl].eicon,
            egold: this.props.data.edragons[dl].egold,
            ediamond: this.props.data.edragons[dl].ediamond,
            etrophy: this.props.data.edragons[dl].etrophy,
            eperiod: this.props.data.edragons[dl].eperiod,
            comb: this.props.data.edragons[dl].combination,
            release_date: this.props.data.edragons[dl].release_date,
            serial: this.props.data.edragons[dl].serial
          }
          dcx += 1
        }
      }
      this.state.edragons.sort((a, b) => { // 최신순으로 정렬
        return b['release_date'] - a['release_date']
      })
      console.log('edragons : ', this.state.edragons)
    }
    return (
      <Layout>
        <div id="edragon_modal" class="modal">
          <div class="modal-content">
            <h4>Modal Header</h4>
            {this.state.modal_gon_comb !== null &&
              <div class="card card-small">
                <div class="card-image">
                  <img src={`${process.env.PUBLIC_URL}/images/gonImages/1_property/property_${this.state.modal_gon_comb.substring(2, 4)}.png`}/>
                  <div class="absolute">
                    <img src={`${process.env.PUBLIC_URL}/images/gonImages/step5/step5_05${this.state.modal_gon_comb.substring(4, 6)}${this.state.modal_gon_comb.substring(6, 8)}.png`}/>
                  </div>
                </div>
              </div>
            }
            <h5>{this.state.modal_gon_name}</h5>
            <h5>{this.state.modal_gon_desc}</h5>
            {this.state.modal_gon_dia !== null &&
              <span>
                <img src={`${process.env.PUBLIC_URL}/images/brief_info/dia.png`}/>
                <font size="5">{this.state.modal_gon_dia}</font><br/>
                { this.state.modal_gon_dia <= this.state.user_dia &&
                  <a class="waves-effect waves-light btn-large" onClick={ () => this.handleGonPurchase('dia')}>구매하기</a>
                }
                { this.state.modal_gon_dia > this.state.user_dia &&
                  <a class="waves-effect waves-light btn-large red accent-4">잔액부족</a>
                }
                <br/>
              </span>
            }
            {this.state.modal_gon_gold !== null &&
              <span>
                <img src={`${process.env.PUBLIC_URL}/images/brief_info/gold.png`}/>
                <font size="5">{this.state.modal_gon_gold}</font><br/>
                { this.state.modal_gon_gold <= this.state.user_gold &&
                  <a class="waves-effect waves-light btn-large" onClick={ () => this.handleGonPurchase('gold')}>구매하기</a>
                }
                { this.state.modal_gon_gold > this.state.user_gold &&
                  <a class="waves-effect waves-light btn-large red accent-4">잔액부족</a>
                }
                <br/>
              </span>
            }
            {this.state.modal_gon_trophy !== null &&
              <span>
                <img src={`${process.env.PUBLIC_URL}/images/brief_info/trophy2.png`}/>
                <font size="5">{this.state.modal_gon_trophy}</font><br/>
                { this.state.modal_gon_trophy <= this.state.user_trophy &&
                  <a class="waves-effect waves-light btn-large" onClick={ () => this.handleGonPurchase('trophy')}>구매하기</a>
                }
                { this.state.modal_gon_trophy > this.state.user_trophy &&
                  <a class="waves-effect waves-light btn-large red accent-4">잔액부족</a>
                }
                <br/>
              </span>
            }
          </div>
          <div class="modal-footer">
            <a href="#!" class="modal-close waves-effect waves-green btn-flat">Agree</a>
          </div>
        </div>

        <div id="buyitem_modal" class="modal">
          <div class="modal-content">
            <h4>Modal Header</h4>
            <p>{this.state.modal_item_type}</p>
            <img class="responsive-img" src={`${process.env.PUBLIC_URL}/images/item/${this.state.modal_item_type}.png`} width='200px' height='200px'/>
            <h5>{this.state.modal_item_name}</h5>
            <h5>{this.state.modal_item_desc}</h5>
            {this.state.modal_item_dia !== 0 &&
              <span>
                <img src={`${process.env.PUBLIC_URL}/images/brief_info/dia.png`}/>
                <font size="5">{this.state.modal_item_dia}</font><br/>
                { this.state.modal_item_dia <= this.state.user_dia &&
                  <a class="waves-effect waves-light btn-large" onClick={ () => this.handleItemPurchase('diamond')}>구매하기</a>
                }
                { this.state.modal_item_dia > this.state.user_dia &&
                  <a class="waves-effect waves-light btn-large red accent-4">잔액부족</a>
                }
                <br/>
              </span>
            }
            {this.state.modal_item_gold !== 0 &&
              <span>
                <img src={`${process.env.PUBLIC_URL}/images/brief_info/gold.png`}/>
                <font size="5">{this.state.modal_item_gold}</font><br/>
                { this.state.modal_item_gold <= this.state.user_gold &&
                  <a class="waves-effect waves-light btn-large" onClick={ () => this.handleItemPurchase('gold')}>구매하기</a>
                }
                { this.state.modal_item_gold > this.state.user_gold &&
                  <a class="waves-effect waves-light btn-large red accent-4">잔액부족</a>
                }
                <br/>
              </span>
            }
            {this.state.modal_item_trophy !== 0 &&
              <span>
                <img src={`${process.env.PUBLIC_URL}/images/brief_info/trophy2.png`}/>
                <font size="5">{this.state.modal_item_trophy}</font><br/>
                { this.state.modal_item_trophy <= this.state.user_trophy &&
                  <a class="waves-effect waves-light btn-large" onClick={ () => this.handleItemPurchase('trophy')}>구매하기</a>
                }
                { this.state.modal_item_trophy > this.state.user_trophy &&
                  <a class="waves-effect waves-light btn-large red accent-4">잔액부족</a>
                }
                <br/>
              </span>
            }
          </div>
          <div class="modal-footer">
            <a href="#!" class="modal-close waves-effect waves-green btn-flat">Agree</a>
          </div>
        </div>

        <div className='container'>
          <div className="row">

            <div className="col l12 m12 s12 margin-bottom-30">
              <div className="col s12 m6 l6 left left-align">
                <h2>Event Shop</h2>
              </div>
              <div className="col s12 m6 l6 right right-align">
                <h5><img src={`${process.env.PUBLIC_URL}/images/brief_info/dia.png`}/> {this.state.user_dia}
                  <img src={`${process.env.PUBLIC_URL}/images/brief_info/gold.png`}/> {this.state.user_gold}
                  <img src={`${process.env.PUBLIC_URL}/images/brief_info/trophy2.png`}/> {this.state.user_trophy}</h5>
              </div>
            </div>

            {this.state.edragons !== null &&
              <h5 className="">Dragons</h5>
            }
            <div class="col s12">
              <div className='center'>
                <div className="row">

                  {this.state.edragons.map(item =>
                    <div key={item.id}>
                      <div className="col s12 m6 l3">
                        <div className="card">
                          <div className="card-image">
                            <a class="modal-trigger" href="#edragon_modal">
                              <img src={`${process.env.PUBLIC_URL}/images/gonImages/1_property/property_${item.comb.substring(2, 4)}.png`}/>
                              <div class="absolute">
                                <img src={`${process.env.PUBLIC_URL}/images/gonImages/step5/step5_05${item.comb.substring(4, 6)}${item.comb.substring(6, 8)}.png`} onClick={ () => this.handleGonModal(item.ename, item.edesc, item.ediamond, item.egold, item.etrophy, item.comb, item.serial)}/>
                              </div>
                            </a>
                          </div>
                          <div className="card-content">
                            {item.ename}
                          </div>
                          <div className="card-action">
                            {item.ediamond !== null &&
                              <span>
                                <img src={`${process.env.PUBLIC_URL}/images/brief_info/dia.png`}/>{item.ediamond}
                              </span>
                            }
                            {item.egold !== null &&
                              <span>
                                <img src={`${process.env.PUBLIC_URL}/images/brief_info/gold.png`}/>{item.egold}
                              </span>
                            }
                            {item.etrophy !== null &&
                              <span>
                                <img src={`${process.env.PUBLIC_URL}/images/brief_info/trophy2.png`}/>{item.etrophy}
                              </span>
                            }
                          </div>
                        </div>
                      </div>
                    </div>)}

                </div>
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
                              <img src={`${process.env.PUBLIC_URL}/images/item/sword/sword_${item.number}.png`} onClick={ () => this.handleItemModal(`sword/sword_${item.number}`, item.diamond, item.gold, item.trophy, item.name, item.description)}/>
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
                              <img src={`${process.env.PUBLIC_URL}/images/item/shield/shield_${item.number}.png`} onClick={ () => this.handleItemModal(`shield/shield_${item.number}`, item.diamond, item.gold, item.trophy, item.name, item.description)}/>
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

            {!this.state.all_cbg &&
              <h5 className="">Cbg</h5>
            }
            <div class="col s12">
              <div className='center'>
                <div className="row">
                  {this.state.all_cbg.map(item =>
                    <div key={item.id}>
                      <div className="col s12 m6 l3">
                        <div className="card">
                          <div className="card-image">
                            <a class="modal-trigger" href="#buyitem_modal">
                              <img src={`${process.env.PUBLIC_URL}/images/item/custom_bg/cbg_${item.number}.png`} onClick={ () => this.handleItemModal(`custom_bg/cbg_${item.number}`, item.diamond, item.gold, item.trophy, item.name, item.description)}/>
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
  graphql(edragons),
  graphql(itemPurchase, { name: 'itemPurchase' }),
  graphql(edragonPurchase, { name: 'edragonPurchase' })
)(event)
