import React, { Component } from 'react'
import { graphql } from 'react-apollo'
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

class MyItem extends Component {
  constructor(props) {
    super(props)
    this.state = {
      sword: [],
      shield: []
    }
  }
  render() {
    if (!this.props.data.loading) {
      this.state.sword = this.props.data.finduser.sword
      this.state.shield = this.props.data.finduser.shield
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
          <h4>Shield</h4>
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

