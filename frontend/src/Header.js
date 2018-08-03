import React, { Component } from 'react'
import M from 'materialize-css'
import './App.css'
import imgTestLogo from './image/img_test_logo.png'

export default class Header extends Component {
  constructor(props) {
    super(props)
    this.state = {
      login: false
    }
    this.onClickLogout = this.onClickLogout.bind(this)
  }
  componentDidMount() {
    M.AutoInit()
  }
  onClickLogout(e) {
    localStorage.removeItem('token')
    localStorage.removeItem('email')
  }
  render() {
    if (localStorage.getItem('token') == null) {
      this.state.login = false
    } else {
      this.state.login = true
    }
    return (
      <div>
        <div className="container">
          <div className="right-align">
            {this.state.login === true &&
            <a href='/' onClick={this.onClickLogout}>Logout</a>
            }
          </div>
        </div>
        <nav class="teal lighten-1" role="navigation">
          <div class="nav-wrapper container">
            <a id="logo-container" href="/" class="brand-logo"><img src={imgTestLogo}/></a>
            <ul class="right hide-on-med-and-down">

              {this.state.login ? (
                <li><a href='/MyGons/1'>MyGons</a></li>
              ) : (
                <li><a href='/Login'>Login</a></li>
              )}

              <li><a href='/Market/1'>Market</a></li>
              <li><a href='/Items/1'>Items</a></li>
              <li><a href='/Battles'>Battles</a></li>
              <li><a href='/Activity'>Activity</a></li>
            </ul>
            <ul id="nav-mobile" class="sidenav">

              {this.state.login ? (
                <li><a href='/MyGons/1'>MyGons</a></li>
              ) : (
                <li><a href='/Login'>Login</a></li>
              )}

              <li><a href='/Market/1'>Market</a></li>
              <li><a href='/Items/1'>Items</a></li>
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
