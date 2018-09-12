import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import { CheckEmailquery } from './queries'
import './App.css'
import Layout from './Layout'

class Myinfo extends Component {
  constructor(props) {
    super(props)
    this.handleChangePassword = this.handleChangePassword.bind(this)
  }

  handleChangePassword(event) {
    console.log(this.props.data)
  }

  render() {
    return (
      <Layout>
        {this.props.data.loading ? (
          <h1>loading</h1>
        ) : (
          <div className="detail-Explanation">
            <div className="row">
              <h3>내 정보 관리</h3>
              <table class="striped" margin="30">
                <thead>
                  <tr>
                    <th></th>
                    <th></th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td height="80px">Icon</td>
                    <td><img src={`${process.env.PUBLIC_URL}/images/usericon_1.png`} class="circle responsive-img" width="45px"/></td>
                    <td><i class="Medium material-icons right margin-right-10">edit</i></td>
                  </tr>
                  <tr>
                    <td height="80px" >User name</td>
                    <td>{this.props.data.checkemail.username}</td>
                    <td></td>
                  </tr>
                  <tr>
                    <td height="80px">E-Mail</td>
                    <td>{this.props.data.checkemail.email}</td>
                    <td></td>
                  </tr>
                  <tr>
                    <td height="80px">Diamond</td>
                    <td>{this.props.data.checkemail.diamond}</td>
                    <td></td>
                  </tr>
                  <tr>
                    <td height="80px">Gold</td>
                    <td>{this.props.data.checkemail.gold}</td>
                    <td></td>
                  </tr>
                  <tr>
                    <td height="80px">Trophy</td>
                    <td>{this.props.data.checkemail.trophy}</td>
                    <td></td>
                  </tr>
                </tbody>
              </table>
              <h5>비밀번호 변경하기</h5>
              <p>비밀번호를 변경하시려면 아래 버튼을 눌러주세요. 그리고 등록하신 이메일을 확인하시고 비밀번호를 변경해주세요.</p>
              <a class="waves-effect waves-light btn-large col s12" onClick={this.handleChangePassword}>비밀번호 변경하기</a>
            </div>
          </div>
        )}
      </Layout>
    )
  }
}

const queryOptions = {
  options: props => ({
    variables: {
      email: localStorage.getItem('email')
    }
  })
}

export default graphql(CheckEmailquery, queryOptions)(Myinfo)

