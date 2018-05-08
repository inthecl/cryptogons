import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import swal from 'sweetalert2'
import './App.css'
import imgTestLogo from './image/img_test_logo.png'

const query = gql`
mutation registerUser($email: String!, $username: String!, $password: String!) {
  registerUser(email:$email, username: $username, password: $password) {
    email
    username
  }
}
`
class Forget extends Component {
  constructor(props) {
    super(props)
    this.state = {
      redirect: false,
      email: 'state_email'
    }
    this.handleEmail = this.handleEmail.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleEmail(event) {
    console.log(event.target.value)
    this.setState({ email: event.target.value })
  }

  handleSubmit(event) {
    /*
    if (this.state.password === this.state.passwordConfirm) {
      event.preventDefault()
      this.props.mutate({ variables: { email: this.state.email, username: this.state.username, password: this.state.password } })
        .then(() => this.setState({ redirect: true }))
    } else {
      console.log('Password Confirm fail')
    }
    */
    if (this.state.email === 'test') {
      swal({
        type: 'success',
        title: 'success',
        text: 'Please check your email.'
      })
      this.setState({ redirect: true })
    } else {
      swal({
        type: 'error',
        title: 'error',
        text: 'Cant find that email, sorry.'
      })
    }
  }
  render() {
    const { redirect } = this.state
    if (redirect) {
      return <Redirect to='/Login'/>
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
                </form>
              </div>
              <div class="row">
                <a class="col s12 waves-effect waves-light btn-large" onClick={this.handleSubmit}>SUBMIT</a>
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

export default graphql(query)(Forget)
