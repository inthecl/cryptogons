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

class MyAcce extends Component {
  constructor(props) {
    super(props)
    this.state = {
      custom_bg: []
    }
  }
  render() {
    if (!this.props.data.loading) {
      this.state.custom_bg = this.props.data.finduser.cbg
      console.log('this.state.custom_bg', this.state.custom_bg)
    }
    const { pagenum } = this.props.match.params
    const lastItem = this.state.custom_bg.length
    const lastPage = lastItem / 12
    const startItem = (pagenum - 1) * 12
    let endItem = pagenum * 12
    if (pagenum < 1) return <Redirect to="/MyCbg/1"/>
    if (pagenum > lastPage + 1) return <Redirect to="/MyCbg/1"/>
    if (endItem > lastItem) endItem = lastItem
    const pages = this.state.custom_bg.slice(startItem, endItem)
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
            <div className='center'>
              <div className="row">
                {pages.map(item =>
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
              <MaterialPagination linkPath="MyCbg" pageNum={pagenum} lastPage={lastPage} />
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

export default graphql(finduser, queryOptions)(MyAcce)
