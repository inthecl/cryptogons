import React, { Component } from 'react'
import M from 'materialize-css'
import './App.css'
import imgTestLogo from './image/img_test_logo.png'

export default class Header extends Component {
  componentDidMount() {
    M.AutoInit()
  }
  render() {
    return (
      <div>
        <nav class="teal lighten-1" role="navigation">
          <div class="nav-wrapper container">
            <a id="logo-container" href="/" class="brand-logo"><img src={imgTestLogo}/></a>
            <ul class="right hide-on-med-and-down">
              <li><a href='/MyGons/1'>MyGons</a></li>
              <li><a href='/Login'>Login</a></li>
              <li><a href='/Market/1'>Market</a></li>
              <li><a href='/Items'>Items</a></li>
              <li><a href='/Battles'>Battles</a></li>
              <li><a href='/Activity'>Activity</a></li>
            </ul>
            <ul id="nav-mobile" class="sidenav">
              <li><a href='/MyGons/1'>MyGons</a></li>
              <li><a href='/Login'>Login</a></li>
              <li><a href='/Market/1'>Market</a></li>
              <li><a href='/Items'>Items</a></li>
              <li><a href='/Battles'>Battles</a></li>
              <li><a href='/Activity'>Activity</a></li>
            </ul>
            <a href="#" data-target="nav-mobile" class="sidenav-trigger"><i class="material-icons">menu</i></a>
          </div>
        </nav>
      </div>
    )
  }
}
