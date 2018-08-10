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
  dragons {
    name
    combination
    birthday
    price
    serial
  }
 }
}
`

class MyAcce extends Component {
  constructor(props) {
    super(props)
    this.state = {
      acce: ['01', '02', '03', '04']
    }
  }
  render() {
    return (
      <Layout>
        <MyGonHeader/>
        <div class="row container">

          <div class="col s6">
            <br/>
            <form action="#">
              <span className="margin-right-10">
                <label>
                  <input name="group1" type="radio" checked/>
                  <span>all</span>
                </label>
              </span>
              <span className="margin-right-10">
                <label>
                  <input name="group1" type="radio"/>
                  <span>for sale</span>
                </label>
              </span>
              <span>
                <label>
                  <input name="group1" type="radio"/>
                  <span>siring</span>
                </label>
              </span>
            </form>
          </div>
          <div class="col s6">
            <br/>
            <div class="input-field col l6 s12 right">
              <select>
                <option value="" disabled selected>Choose your option</option>
                <option value="1">Option 1</option>
                <option value="2">Option 2</option>
                <option value="3">Option 3</option>
              </select>
              <label>Materialize Select</label>
              <br/>
            </div>
          </div>

          <div class="col s12">
            장신구
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

export default graphql(finduser, queryOptions)(MyAcce)
