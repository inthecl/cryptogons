import React, { Component } from 'react'
import { graphql, compose } from 'react-apollo'
import { finduser, edragons, edragonPurchase } from './queries'
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
      choice_name: null,
      choice_desc: null,
      choice_dia: null,
      choice_gold: null,
      choice_trophy: null,
      choice_comb: null,
      choice_serial: null
    }
    this.handleModal = this.handleModal.bind(this)
    this.handlePurchase = this.handlePurchase.bind(this)
  }
  handleModal(name, desc, dia, gold, trophy, comb, serial) {
    this.setState({
      choice_name: name,
      choice_desc: desc,
      choice_dia: dia,
      choice_gold: gold,
      choice_trophy: trophy,
      choice_comb: comb,
      choice_serial: serial
    })
  }
  handlePurchase() {
    this.props.edragonPurchase({ variables: { email: localStorage.getItem('email'), serial: this.state.choice_serial } })
      .then((res) => {
        this.setState({ redirect: true })
        console.log(res)
      })
      .catch((errors) => {
        console.log('errors: ', errors)
      })
  }
  render() {
    if (this.state.redirect) {
      window.location.replace('/Activity')
    }
    if (!this.props.data.loading && !this.props.finduser.loading) {
      console.log('this.props', this.props)
      this.state.user_dia = this.props.finduser.finduser.diamond
      this.state.user_gold = this.props.finduser.finduser.gold
      this.state.user_trophy = this.props.finduser.finduser.trophy

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
            {this.state.choice_comb !== null &&
              <div class="card card-small">
                <div class="card-image">
                  <img src={`${process.env.PUBLIC_URL}/images/gonImages/1_property/property_${this.state.choice_comb.substring(2, 4)}.png`}/>
                  <div class="absolute">
                    <img src={`${process.env.PUBLIC_URL}/images/gonImages/step5/step5_05${this.state.choice_comb.substring(4, 6)}${this.state.choice_comb.substring(6, 8)}.png`}/>
                  </div>
                </div>
              </div>
            }
            <h5>{this.state.choice_name}</h5>
            <h5>{this.state.choice_desc}</h5>
            {this.state.choice_dia !== null &&
              <span>
                <img src={`${process.env.PUBLIC_URL}/images/brief_info/dia.png`}/>
                <font size="5">{this.state.choice_dia}</font><br/>
                { this.state.choice_dia <= this.state.user_dia &&
                  <a class="waves-effect waves-light btn-large" onClick={ () => this.handlePurchase('diaPayment')}>구매하기</a>
                }
                { this.state.choice_dia > this.state.user_dia &&
                  <a class="waves-effect waves-light btn-large red accent-4">잔액부족</a>
                }
                <br/>
              </span>
            }
            {this.state.choice_gold !== null &&
              <span>
                <img src={`${process.env.PUBLIC_URL}/images/brief_info/gold.png`}/>
                <font size="5">{this.state.choice_gold}</font><br/>
                { this.state.choice_gold <= this.state.user_gold &&
                  <a class="waves-effect waves-light btn-large" onClick={ () => this.handlePurchase('goldPayment')}>구매하기</a>
                }
                { this.state.choice_gold > this.state.user_gold &&
                  <a class="waves-effect waves-light btn-large red accent-4">잔액부족</a>
                }
                <br/>
              </span>
            }
            {this.state.choice_trophy !== null &&
              <span>
                <img src={`${process.env.PUBLIC_URL}/images/brief_info/trophy2.png`}/>
                <font size="5">{this.state.choice_trophy}</font><br/>
                { this.state.choice_trophy <= this.state.user_trophy &&
                  <a class="waves-effect waves-light btn-large" onClick={ () => this.handlePurchase('trophyPayment')}>구매하기</a>
                }
                { this.state.choice_trophy > this.state.user_trophy &&
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

            <h5 className="">Dragons</h5>
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
                                <img src={`${process.env.PUBLIC_URL}/images/gonImages/step5/step5_05${item.comb.substring(4, 6)}${item.comb.substring(6, 8)}.png`} onClick={ () => this.handleModal(item.ename, item.edesc, item.ediamond, item.egold, item.etrophy, item.comb, item.serial)}/>
                              </div>
                            </a>
                          </div>
                          <div className="card-content">
                            {item.ename}
                          </div>
                          {item.ediamond !== null &&
                            <div className="card-action">
                              <img src={`${process.env.PUBLIC_URL}/images/brief_info/dia.png`}/>{item.ediamond}
                            </div>
                          }
                          {item.egold !== null &&
                            <div className="card-action">
                              <img src={`${process.env.PUBLIC_URL}/images/brief_info/gold.png`}/>{item.egold}
                            </div>
                          }
                          {item.etrophy !== null &&
                            <div className="card-action">
                              <img src={`${process.env.PUBLIC_URL}/images/brief_info/trophy2.png`}/>{item.etrophy}
                            </div>
                          }
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
  graphql(edragons),
  graphql(edragonPurchase, { name: 'edragonPurchase' })
)(event)
