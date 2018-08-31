import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import { Link, Redirect } from 'react-router-dom'
import { finduser } from './queries'
import './App.css'
import Layout from './Layout'
import MyGonHeader from './MyGonHeader'
import MaterialPagination from './MaterialPagination'

class MyAcce extends Component {
  constructor(props) {
    super(props)
    this.state = {
      all_cbg: []
    }
  }
  render() {
    if (!this.props.data.loading) {
      for (let z = 0; z < this.props.data.finduser.cbg.length; z += 1) {
        this.state.all_cbg[z] = this.props.data.finduser.cbg[z]
      }
      console.log('this.state.custom_bg', this.state.custom_bg)
    }
    const { pagenum } = this.props.match.params
    const lastItem = this.state.all_cbg.length
    const lastPage = lastItem / 12
    const startItem = (pagenum - 1) * 12
    let endItem = pagenum * 12
    if (pagenum < 1) return <Redirect to="/MyCbg/1"/>
    if (pagenum > lastPage + 1) return <Redirect to="/MyCbg/1"/>
    if (endItem > lastItem) endItem = lastItem
    const pages = this.state.all_cbg.slice(startItem, endItem)
    return (
      <Layout>
        <MyGonHeader/>
        <div class="row container margin-top-50">
          <h4>배경</h4>
          <div class="col s12">
            <div className='center'>
              <div className="row">
                {pages.map(item =>
                  <div key={item.id}>
                    <div className="col s12 m6 l3">
                      <div className="card">
                        <div className="card-image">
                          <img src={`${process.env.PUBLIC_URL}/images/item/custom_bg/cbg_${item.number}.png`}/>
                        </div>
                        <div className="card-content">
                          <p>{item.name}</p>
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
