import React, { Component } from 'react'
import './App.css'
import Layout from './Layout'
import BattleHeader from './BattleHeader'

export default class record extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  render() {
    return (
      <Layout>
        <BattleHeader/>
        <div class="container" >
          <div class="row">
            record
          </div>
        </div>
      </Layout>
    )
  }
}
