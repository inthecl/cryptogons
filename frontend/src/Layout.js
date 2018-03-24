import React, { Component } from 'react';
import './App.css';
import Header from './Header';
import Tail from './Tail';

export default class Layout extends Component {
    render() {
        return (
          <div>
            <Header/>
             {this.props.children}
            <Tail/>
          </div>
        )
      }
  }
  