import React, { Component } from 'react';
import './App.css';
import { Row, Input, Col, Card } from 'react-materialize'
import { Redirect } from 'react-router-dom'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

const query = gql`
mutation login($email: String!, $password: String!) {
  login(email:$email,  password:$password)  
}
`

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
        .then((data) => {
          console.log('data: ' + data);
          this.setState({ redirect: true })
        })
        .catch((errors) => {
          console.log('errors: ', errors);
        })    
      }

    render() {
      const { redirect } = this.state
      if (redirect) {
        return <Redirect to='/'/>
      }
      return (
        <div align="center">
          <div className="Login-div">
          Login
            <Col m={6} s={12}>
                <Card>
                <br/>
                <Row>
                  <Input type="email" label="Email" s={12} label="Email" onChange={this.handleEmail}/>
                  <Input type="password" label="password" s={12} label="Password" onChange={this.handlePassword}/>
                </Row>
                <Row>
                <div class="input-field col s12">
                  <a class="btn waves-effect waves-light col s12" onClick={this.handleSubmit}>Login</a>
                </div>
                </Row>
                <Row>
                <div class="input-field col s6 m6 l6">
                  <p class="margin medium-small"><a href="/Register">Register Now!</a></p>
                </div>
                <div class="input-field col s6 m6 l6">
                    <p class="margin right-align medium-small"><a href="#">Forgot password?</a></p>
                </div>          
                </Row>
                </Card>
            </Col>
          </div>
        </div>
      );
    }
  }

  export default graphql(query)(Login)