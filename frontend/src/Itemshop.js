import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom'
import _ from 'underscore'
import Layout from './Layout'
import MaterialPagination from './MaterialPagination'

export default class Itemshop extends Component {
  constructor(props) {
    super(props)
    this.state = {
      dia: null,
      point: null,
      trophy: null,
      sword: ['01', '02', '03'],
      shield: ['01', '02', '03'],
      cbg: ['01', '02', '03', '04']
    }
  }

  render() {
    return (
      <Layout>
        <div className='container'>
          <div className="row">

            <div className="col l12 m12 s12 margin-bottom-30">
              <div className="col s12 m6 l6 left left-align">
                <h2>Item</h2>
              </div>
              <div className="col s12 m6 l6 right right-align">
                <h5>다이아 111 포인트 111 트로피 111</h5>
              </div>
            </div>
      
            <h5 className="">Sword</h5>
            <div class="col s12">
              <div className='center'>
                <div className="row">
                  {this.state.sword.map(item =>
                    <div key={item.id}>
                      <div className="col s12 m6 l3">
                        <div className="card">
                          <div className="card-image">
                            <img src={`${process.env.PUBLIC_URL}/images/item/sword/sword_${item}.png`}/>
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

            <h5 className="">Shield</h5>
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

            <h5 className="">Cbg</h5>
            <div class="col s12">
              <div className='center'>
                <div className="row">
                  {this.state.cbg.map(item =>
                    <div key={item.id}>
                      <div className="col s12 m6 l3">
                        <div className="card">
                          <div className="card-image">
                            <img src={`${process.env.PUBLIC_URL}/images/custom_bg/cbg_${item}.png`}/>
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
        </div>
      </Layout>
    )
  }
}
