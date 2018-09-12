import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { graphql } from 'react-apollo'
import { CheckEmailquery } from './queries'
import './App.css'

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
                    <img src={`${process.env.PUBLIC_URL}/images/brief_info/dia.png`}/><span class="blue-text text-darken-2">{this.props.data.checkemail.diamond}</span>
                  </div>
                </div>
                <div class="col">
                  <div class="valign-wrapper">
                    <img src={`${process.env.PUBLIC_URL}/images/brief_info/gold.png`}/><span class="blue-text text-darken-2">{this.props.data.checkemail.gold}</span>
                  </div>
                </div>
                <div class="col">
                  <div class="valign-wrapper">
                    <img src={`${process.env.PUBLIC_URL}/images/brief_info/trophy2.png`}/><span class="blue-text text-darken-2">{this.props.data.checkemail.trophy}</span>
                  </div>
                </div>
                <div class="col">
                  <Link to={'/Myinfo'}><a class="waves-effect waves-light btn-small"><i class="material-icons left">account_circle</i>내정보관리</a></Link>
                </div>
              </div>
            </div>

            <div className='col l12 m12 s12'>
              <a href={'/MyGons/1'} class="waves-effect waves-light btn-large margin-top-15 margin-right-10"><i class="material-icons left">cloud</i>GONS</a>
              <a href={'/MyItem/1'} class="waves-effect waves-light btn-large margin-top-15 margin-right-10"><i class="material-icons left">cloud</i>Item</a>
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
