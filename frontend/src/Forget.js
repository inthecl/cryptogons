import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom'
import './App.css'
import imgTestLogo from './image/img_test_logo.png'

export default class Forget extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: 'state_email'
    }
    this.handleEmail = this.handleEmail.bind(this)
  }

  handleEmail(event) {
    console.log(event.target.value)
    this.setState({ email: event.target.value })
  }

  render() {
    return (
      <div class="container" id="login-page">
        <a href="/"><img src={imgTestLogo} width="390px"/></a>
        <br/><br/>
        <div class="s12 m4 l8">
          <div class="card blue-grey darken-1">
            <div class="card-content white-text">
              <span class="card-title">Card Title</span>
              <p>I am a very simple card.</p>
              <br/>
              <div class="row">
                <form class="col s12">
                  <div class="row">
                    <div class="input-field col s12">
                      <input id="Email" type="email" class="validate" onChange={this.handleEmail}/>
                      <label for="Email">Email</label>
                    </div>
                  </div>
                </form>
              </div>
              <div class="row">
                <a class="col s12 waves-effect waves-light btn-large"><Link to={`/CheckForget/${this.state.email}`}>SUBMIT</Link></a>
              </div>
            </div>
            <div class="card-action" align="center">
              <a href="/Forget">&nbsp;&nbsp;&nbsp;&nbsp;Forgot your email address?</a>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
