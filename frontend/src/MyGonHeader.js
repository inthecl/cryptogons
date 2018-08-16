import React, { Component } from 'react'
import { Link } from 'react-router-dom'
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

class MyGonHeader extends Component {
  render() {
    return (
      <div class="row container">
        {this.props.data.loading ? (
          <h1>loading</h1>
        ) : (
          <div>

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
              <div class="right valign-wrapper margin-top-15">
                <div class="col">
                  <div class="valign-wrapper">
                    <i class="material-icons margin-right-5">details</i><span class="blue-text text-darken-2">{this.props.data.checkemail.diamond}</span>
                  </div>
                </div>
                <div class="col">
                  <div class="valign-wrapper">
                    <i class="material-icons margin-right-5">attach_money</i><span class="blue-text text-darken-2">{this.props.data.checkemail.gold}</span>
                  </div>
                </div>
                <div class="col">
                  <Link to={'/Myinfo'}><a class="waves-effect waves-light btn-small"><i class="material-icons left">account_circle</i>내정보관리</a></Link>
                </div>
              </div>
            </div>

            <div className='col l12 m12 s12'>
              <a href={'/Mygons/1'} class="waves-effect waves-light btn-large margin-top-15 margin-right-10"><i class="material-icons left">cloud</i>GONS</a>
              <a href={'/MyAcce/1'} class="waves-effect waves-light btn-large margin-top-15 margin-right-10"><i class="material-icons left">cloud</i>장신구</a>
              <a href={'/MyCbg/1'} class="waves-effect waves-light btn-large margin-top-15"><i class="material-icons left">cloud</i>배경</a>
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
