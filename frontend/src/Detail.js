import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import { Link, Redirect } from 'react-router-dom'
import './App.css'
import Layout from './Layout'
import MyGonHeader from './MyGonHeader'
import MaterialPagination from './MaterialPagination'

const finddragon = gql`
query finddragon($serial: String!){
  finddragon(serial:$serial) {
  name
  combination
  birthday
  price
  serial
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
      // custom_bg를 서버에서 받고 다른용이 사용중인 custom_bg는 제외해야함( ex)04는 사용중 )
      custom_bg: ['01', '02', '03'],
      choice_cbg: null
    }
    this.handleChoiceCbg = this.handleChoiceCbg.bind(this)
    this.handleReleaseCbg = this.handleReleaseCbg.bind(this)
  }
  handleChoiceCbg(event) {
    this.setState({ choice_cbg: event })
    // 서버에 현재용의 serial, choice_cbg(event) 보내야함
  }
  handleReleaseCbg() {
    this.setState({ choice_cbg: null })
    // 서버에 현재용의 serial, choice_cbg(null) 보내야함
  }
  render() {
    if (!this.props.data.loading) {
      this.state.name = this.props.data.finddragon.name
      this.state.birthday = this.props.data.finddragon.birthday
      this.state.price = this.props.data.finddragon.price
      this.state.serial = this.props.data.finddragon.serial
      this.state.comb = this.props.data.finddragon.combination
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
      console.log(this.state.name)
    }
    // cbg pagination
    const { pagenum } = {pagenum: '1'} 
    console.log('test', pages)
    const lastItem = this.state.custom_bg.length
    const lastPage = lastItem / 12
    const startItem = (pagenum - 1) * 12
    let endItem = pagenum * 12
    if (pagenum < 1) return <Redirect to="/MyCbg/1"/>
    if (pagenum > lastPage + 1) return <Redirect to="/MyCbg/1"/>
    if (endItem > lastItem) endItem = lastItem
    const pages = this.state.custom_bg.slice(startItem, endItem)
    console.log('choice_cbg: ', this.state.choice_cbg)
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
                    {this.state.choice_cbg === null &&
                      <img src={`${process.env.PUBLIC_URL}/images/gonImages/1_property/property_${this.state.property}.png`}/>
                    }
                    {this.state.choice_cbg !== null &&
                      <img src={`${process.env.PUBLIC_URL}/images/custom_bg/cbg_${this.state.choice_cbg}.png`}/>
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
            <div class="s12 left">
              <font size="7">{this.state.name}</font>&nbsp;&nbsp;&nbsp;&nbsp;<font size="6">{this.state.serial}</font>
            </div>
            <div class="s12 right">
              <span><a class="waves-effect waves-light btn-large modal-trigger margin-right-10" href="#modal2">장신구</a></span>
              <div id="modal2" class="modal">
                <div class="modal-content">
                  <h4>Modal Header</h4>
                  장신구
                </div>
                <div class="modal-footer">
                  <a href="#!" class="modal-close waves-effect waves-green btn-flat">Agree</a>
                </div>
              </div>
              <span><a class="waves-effect waves-light btn-large modal-trigger" href="#modal1">배경</a></span>
              <div id="modal1" class="modal">
                <div class="modal-content">
                  <h4>Modal Header</h4>
                  배경
                  <div className='center'>
                    <div className="row">
                      {pages.map(item =>
                        <div key={item.id}>
                          <div className="col s12 m6 l3">
                            <div className="card">
                              <div className="card-image">
                                <img src={`${process.env.PUBLIC_URL}/images/custom_bg/cbg_${item}.png`} onClick={ () => this.handleChoiceCbg(item)}/>
                                {this.state.choice_cbg === item &&
                                  <div class="absolute">
                                    <img src={`${process.env.PUBLIC_URL}/images/custom_bg/cbg_choice.png`} onClick={this.handleReleaseCbg}/>
                                  </div>
                                }
                              </div>
                            </div>
                          </div>
                        </div>)}
                    </div>
                    <MaterialPagination linkPath="Detail" pageNum={pagenum} lastPage={lastPage} />
                  </div>
                </div>
                <div class="modal-footer">
                  <a href="#!" class="modal-close waves-effect waves-green btn-flat">Agree</a>
                </div>
              </div>
            </div>
          </div>
          - win 70%&nbsp;&nbsp;&nbsp;- gen {this.state.generation}&nbsp;&nbsp;&nbsp;- cooldown {this.state.cooldown}
              &nbsp;&nbsp;&nbsp;- price {this.state.price}&nbsp;&nbsp;&nbsp;- birthday {this.state.birthday}
          <br/><br/><br/>
          <span><Link to={`/Breed/${this.state.serial}`}><a class="waves-effect waves-light btn-large margin-right-10"><i class="material-icons left">cloud</i>Breed</a></Link></span>
          <span><Link to={`/Sell/${this.state.serial}`}><a class="waves-effect waves-light btn-large margin-right-10"><i class="material-icons left">cloud</i>Sell</a></Link></span>
          <span><Link to={`/Gift/${this.state.serial}`}><a class="waves-effect waves-light btn-large"><i class="material-icons left">cloud</i>Gift</a></Link></span>
          <br/><br/><br/>
          <h5>lineament</h5>
          {this.state.combination}
          <br/><br/><br/>
          <h5>parents</h5>
          {this.state.parents}
          <br/><br/><br/>
          <h5>children</h5>
          {this.state.children}
        </div>
      </Layout>
    )
  }
}

const queryOptions = {
  options: props => ({
    variables: {
      serial: props.match.params.serialnumber
    }
  })
}

export default graphql(finddragon, queryOptions)(Detail)

