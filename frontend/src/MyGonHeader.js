import React, { Component } from 'react'
import _ from 'underscore'
import { Link, Redirect } from 'react-router-dom'
import './App.css'
import Layout from './Layout'
import imgDia from './image/icon_dia.png'
import imgPoint from './image/icon_point.png'

export default class MyGonHeader extends Component {
  render() {
    return (
      <div class="row container">
        <br/>
        <div class="left">
          <div class="valign-wrapper">
            <div class="col s6 m6 l12">
              <img src={`${process.env.PUBLIC_URL}/images/img_Rectangle.png`} alt="" class="circle responsive-img"/>
            </div>
            <div class="col">
              <span class="black-text">
                <h5>IntheCL</h5>
                <p>zangon88@gmail.com</p>
              </span>
            </div>
          </div>
        </div>
        <div class="right">
          <div>
            <p><img src={imgDia}/>&nbsp;1200&nbsp;&nbsp;<img src={imgPoint}/>&nbsp;200</p>
            <p align="right"><Link to={'/Myinfo'}>내 정보 관리</Link></p>
          </div>
        </div>
      </div>
    )
  }
}
