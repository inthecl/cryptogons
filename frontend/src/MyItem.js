import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import { finduser } from './queries'
import './App.css'
import Layout from './Layout'
import MyGonHeader from './MyGonHeader'

class MyItem extends Component {
  constructor(props) {
    super(props)
    this.state = {
      all_sword: [],
      all_shield: []
    }
  }
  render() {
    if (!this.props.data.loading) {
      for (let x = 0; x < this.props.data.finduser.sword.length; x += 1) {
        this.state.all_sword[x] = this.props.data.finduser.sword[x]
      }
      for (let y = 0; y < this.props.data.finduser.shield.length; y += 1) {
        this.state.all_shield[y] = this.props.data.finduser.shield[y]
      }
      console.log('this.props', this.props)
    }
    return (
      <Layout>
        <MyGonHeader/>
        <div className="row container margin-top-50">
          <h4>Sword</h4>
          <div class="col s12">
            <div className='center'>
              <div className="row">
                {this.state.all_sword.map(item =>
                  <div key={item.id}>
                    <div className="col s12 m6 l3">
                      <div className="card">
                        <div className="card-image">
                          <img src={`${process.env.PUBLIC_URL}/images/item/sword/sword_${item.number}.png`}/>
                        </div>
                        <div className="card-content">
                          <p>{item.name}</p>
                        </div>
                      </div>
                    </div>
                  </div>)}
              </div>
            </div>
          </div>
          <h4>Shield</h4>
          <div class="col s12">
            <div className='center'>
              <div className="row">
                {this.state.all_shield.map(item =>
                  <div key={item.id}>
                    <div className="col s12 m6 l3">
                      <div className="card">
                        <div className="card-image">
                          <img src={`${process.env.PUBLIC_URL}/images/item/shield/shield_${item.number}.png`}/>
                        </div>
                        <div className="card-content">
                          <p>{item.name}</p>
                        </div>
                      </div>
                    </div>
                  </div>)}
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

export default graphql(finduser, queryOptions)(MyItem)

