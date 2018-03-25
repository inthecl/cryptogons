import React, { Component } from 'react';
import './App.css';
import { Row, Input, Col, Card } from 'react-materialize'
import { Redirect } from 'react-router-dom'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

const query = gql`
mutation registerUser($email: String!, $username: String!, $password: String!) {
  registerUser(email:$email, username: $username, password: $password) {
    email
    username
  }
}
`

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
      if(this.state.password===this.state.passwordConfirm){
        event.preventDefault()
        this.props.mutate({ variables: { email: this.state.email, username: this.state.username, password: this.state.password } })
          .then(() => this.setState({ redirect: true }))
      } else {
        console.log("Password Confirm fail")
      }

    }

    render() {
      const { redirect } = this.state
      if (redirect) {
        return <Redirect to='/'/>
        console.log(this.props)
      }
      return (
        <div align="center">
          <div className="Login-div">
          Register
            <Col m={6} s={12}>
                <Card>
                  <br/>
                  <Row>
                    <Input type="text" label="Username" s={12} label="Username" onChange={this.handleUsername}/>  
                    <Input type="email" label="Email" s={12} label="Email address" onChange={this.handleEmail}/>
                    <Input type="password" label="password" s={12} label="Password" onChange={this.handlePassword}/>
                    <Input type="password" label="password" s={12} label="Confirm Password" onChange={this.handlePasswordConfirm}/>
                  </Row>
                  <Row>
                    <div class="input-field col s12">
                      <a class="btn waves-effect waves-light col s12" onClick={this.handleSubmit}>Register </a>
                    </div>
                  </Row>
                </Card>
            </Col>
          </div>
        </div>
      );
    }
  }

  export default graphql(query)(Register)