import React, { Component } from 'react'
import './App.css'
import Layout from './Layout'
import BattleHeader from './BattleHeader'

export default class rank extends Component {
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
            <table className="highlight">
              <thead>
                <tr>
                  <th>Rank</th>
                  <th>username</th>
                  <th>total</th>
                  <th>wins</th>
                  <th>losees</th>
                  <th>rate</th>
                </tr>
              </thead>

              <tbody>
                <tr>
                  <td>1</td>
                  <td>Eclair</td>
                  <td>$0.87</td>
                  <td>Alvin</td>
                  <td>Eclair</td>
                  <td>$0.87</td>
                </tr>
                <tr>
                  <td>2</td>
                  <td>Jellybean</td>
                  <td>$3.76</td>
                  <td>Alvin</td>
                  <td>Eclair</td>
                  <td>$0.87</td>
                </tr>
                <tr>
                  <td>3</td>
                  <td>Lollipop</td>
                  <td>$7.00</td>
                  <td>Alvin</td>
                  <td>Eclair</td>
                  <td>$0.87</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </Layout>
    )
  }
}
