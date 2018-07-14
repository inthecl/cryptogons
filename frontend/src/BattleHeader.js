import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Progress } from 'react-sweet-progress'
import 'react-sweet-progress/lib/style.css'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import './App.css'

const CheckEmailquery = gql`
query CheckEmail($email: String!){
  checkemail(email:$email) {
    email
    username
    iconNum
    diamond
    gold
  } 
}
`

class BattleHeader extends Component {
  render() {
    return (
      <div class="row container">
        {this.props.data.loading ? (
          <h1>loading</h1>
        ) : (
          <div className="margin-top-20">
            <div class="left valign-wrapper">
              <div class="col s6 m6 l12">
                <img src={`${process.env.PUBLIC_URL}/images/usericon_1.png`} alt="" class="circle responsive-img"/>
              </div>
              <div class="col">
                <span class="black-text">
                  <h5>{this.props.data.checkemail.username}</h5>
                  <p>{this.props.data.checkemail.email}</p>
                </span>
              </div>
            </div>
            <div class="right margin-top-15">
              <div className="col">
                <Progress
                  type="circle"
                  width={70}
                  percent={70}
                />
              </div>
              <div class="col">
                <span class="black-text">
                  <ul margin-top>
                    <li>total 10</li>
                    <li>wins 7 losees 3</li>
                  </ul>
                </span>
              </div>
              <div class="col margin-top-15">
                <Link to={'/'}><a class="waves-effect waves-light btn-small"><i class="material-icons left">account_circle</i>내유닛관리</a></Link>
              </div>
            </div>
          </div>
        )}
      </div>
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

export default graphql(CheckEmailquery, queryOptions)(BattleHeader)
