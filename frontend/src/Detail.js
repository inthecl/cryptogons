import React, { Component } from 'react';
import './App.css';
import Layout from './Layout';

export default class Detail extends Component {

    render() {
      return (
        <Layout>
            Detail of {this.props.match.params.username}
        </Layout>
      );
    }
  }
  