import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import './App.css'
import imgDia from './image/icon_dia.png'
import imgPoint from './image/icon_point.png'

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

class MyGonHeader extends Component {
  render() {
    return (
      <div class="row container">
        {this.props.data.loading ? (
          <h1>loading</h1>
        ) : (
          <div className="margin-top-20">
            <div class="left">
              <div class="valign-wrapper">
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
            </div>
            <div class="right">
              <div>
                <p><img src={imgDia}/>&nbsp;{this.props.data.checkemail.diamond}&nbsp;&nbsp;<img src={imgPoint}/>&nbsp;{this.props.data.checkemail.gold}</p>
                <p align="right"><Link to={'/Myinfo'}>내 정보 관리</Link></p>
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

export default graphql(CheckEmailquery, queryOptions)(MyGonHeader)