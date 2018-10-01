import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { graphql } from 'react-apollo'
import { registerUser } from './queries'
import './App.css'

class Register extends Component {
  constructor(props) {
    super(props)
    this.state = {
      redirect: false,
      username: 'state_uesrname',
      email: 'state_email',
      password: 'state_password',
      passwordConfirm: 'state_password_confirm'
    }
    this.handleUsername = this.handleUsername.bind(this)
    this.handleEmail = this.handleEmail.bind(this)
    this.handlePassword = this.handlePassword.bind(this)
    this.handlePasswordConfirm = this.handlePasswordConfirm.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleUsername(event) {
    console.log(event.target.value)
    this.setState({ username: event.target.value })
  }

  handleEmail(event) {
    console.log(event.target.value)
    this.setState({ email: event.target.value })
  }

  handlePassword(event) {
    console.log(event.target.value)
    this.setState({ password: event.target.value })
  }

  handlePasswordConfirm(event) {
    this.setState({ passwordConfirm: event.target.value })
  }

  handleSubmit(event) {
    if (this.state.password === this.state.passwordConfirm) {
      event.preventDefault()
      this.props.mutate({ variables: { email: this.state.email, username: this.state.username, password: this.state.password } })
        .then((res) => {
          console.log(res)
          this.setState({ redirect: true })
        })
        .catch((errors) => {
          console.log('errors: ', errors)
        })
    }
  }

  render() {
    const { redirect } = this.state
    if (redirect) {
      return <Redirect to='/'/>
    }
    return (
      <div class="container" id="login-page">
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
                      <input id="Username" type="email" class="validate" onChange={this.handleUsername}/>
                      <label for="Username">Username</label>
                    </div>
                  </div>
                  <div class="row">
                    <div class="input-field col s12">
                      <input id="Email" type="email" class="validate" onChange={this.handleEmail}/>
                      <label for="Email">Email</label>
                    </div>
                  </div>
                  <div class="row">
                    <div class="input-field col s12">
                      <input id="Password" type="password" class="validate" onChange={this.handlePassword}/>
                      <label for="Password">Password</label>
                    </div>
                  </div>
                  <div class="row">
                    <div class="input-field col s12">
                      <input id="Password" type="password" class="validate" onChange={this.handlePasswordConfirm}/>
                      <label for="Password">Confirm Password</label>
                    </div>
                  </div>
                </form>
              </div>
              <div class="row">
                <a class="col s12 waves-effect waves-light btn-large" onClick={this.handleSubmit}>REGISTER</a>
              </div>
            </div>
            <div class="card-action" align="center">
            Already have an account?
              <a href="/LOGIN">&nbsp;&nbsp;LOGIN</a>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default graphql(registerUser)(Register)
