import React, { Component } from 'react';
import './App.css';
import {Navbar, NavItem} from 'react-materialize'

export default class Header extends Component {
    render() {
      return (
        <Navbar brand='logo' right>
          <NavItem href='/Login'>Login</NavItem>
          <NavItem href='/Market/1'>Market</NavItem>
          <NavItem href='/FAQs'>FAQs</NavItem>
        </Navbar>
      );
    }
  }