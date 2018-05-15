import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import './App.css'
import Layout from './Layout'

const query = gql`
query CheckEmail($email: String!){
  checkemail(email:$email) {
    email
    username
    name
  } 
}
`

class CheckForget extends Component {
  constructor(props) {
    super(props)
    this.state = {
      existenceEmail: 'state_email'
    }
  }
  render() {
    const { data } = this.props
    if (data.checkemail) {
      this.state.existenceEmail = '이메일을 확인해 주세요.'
    } else {
      this.state.existenceEmail = '잘못된 이메일입니다.'
    }
    return (
      <Layout>
        {this.state.existenceEmail}
      </Layout>
    )
  }
}

const queryOptions = {
  options: props => ({
    variables: {
      email: props.match.params.checkForget
    }
  })
}

export default graphql(query, queryOptions)(CheckForget)
