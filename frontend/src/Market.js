import React, { Component } from 'react'
import './App.css'
import Layout from './Layout'
import PaginationView from './PaginationView'

export default class Market extends Component {
  render() {
    return (
      <Layout>
        <PaginationView/>
      </Layout>
    )
  }
}
