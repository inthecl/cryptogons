import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { graphql } from 'react-apollo'
import { login } from './queries'
import './App.css'
import imgTestLogo from './image/img_test_logo.png'

class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      redirect: false,
      email: 'state_email',
      password: 'state_password'
    }
    this.handleEmail = this.handleEmail.bind(this)
    this.handlePassword = this.handlePassword.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleEmail(event) {
    console.log(event.target.value)
    this.setState({ email: event.target.value })
  }

  handlePassword(event) {
    console.log(event.target.value)
    this.setState({ password: event.target.value })
  }

  handleSubmit(event) {
    event.preventDefault()
    this.props.mutate({ variables: { email: this.state.email, password: this.state.password } })
      .then((res) => {
        console.log(res)
        const { token, refreshToken } = res.data.login
        localStorage.setItem('token', token)
        localStorage.setItem('refreshToken', refreshToken)
        localStorage.setItem('email', this.state.email)
        this.setState({ redirect: true })
      })
      .catch((errors) => {
        console.log('errors: ', errors)
      })
  }

  render() {
    const { redirect } = this.state
    if (redirect) {
      return <Redirect to='/'/>
    }
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
                  <div class="row">
                    <div class="input-field col s12">
                      <input id="Password" type="password" class="validate" onChange={this.handlePassword}/>
                      <label for="Password">Password</label>
                    </div>
                  </div>
                  <form action="#">
                    <p>
                      <label>
                        <input type="checkbox" class="filled-in"/>
                        <span>Filled in</span>
                      </label>
                    </p>
                  </form>
                </form>
              </div>
              <div class="row">
                <a class="col s12 waves-effect waves-light btn-large" onClick={this.handleSubmit}>LOGIN</a>
              </div>
            </div>
            <div class="card-action">
              <a href="/Register">Register Now!</a>
              <a href="/Forget">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Forgot password?</a>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default graphql(login)(Login)
