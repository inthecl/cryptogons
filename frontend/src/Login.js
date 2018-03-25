import React, { Component } from 'react';
import './App.css';
import { Row, Input, Col, Card, Button } from 'react-materialize'

export default class Login extends Component {

    render() {
      return (
        <div align="center">
          <div className="Login-div">
            <Col m={6} s={12}>
                <Card textClassName='white-text'>
                <br/>
                <Row>
                  <Input type="email" label="Email" s={12} />
                  <Input type="password" label="password" s={12} />
                </Row>
                <Row>
                <div class="input-field col s12">
                  <a href="#" class="btn waves-effect waves-light col s12">Login</a>
                </div>
                </Row>
                <Row>
                <div class="input-field col s6 m6 l6">
                  <p class="margin medium-small"><a href="#">Register Now!</a></p>
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