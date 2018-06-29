import React, { Component } from 'react'
import './App.css'
import Layout from './Layout'

export default class Myinfo extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username: 'JaeDragon',
      email: 'zangon88@gmail.com'
    }
  }
  btnSelectGon
  render() {
    return (
      <Layout>
        <div class="detail-Explanation">
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
                  <td><img src={`${process.env.PUBLIC_URL}/images/img_Rectangle.png`} class="circle responsive-img" width="45px"/></td>
                  <td><i class="Medium material-icons">edit</i></td>
                </tr>
                <tr>
                  <td height="80px" >NickName</td>
                  <td>Jellybean</td>
                  <td></td>
                </tr>
                <tr>
                  <td height="80px">E-Mail</td>
                  <td>Lollipop@gmail.com</td>
                  <td></td>
                </tr>
                <tr>
                  <td height="80px">Diamond</td>
                  <td>300</td>
                  <td></td>
                </tr>
                <tr>
                  <td height="80px">Point</td>
                  <td>25</td>
                  <td></td>
                </tr>
              </tbody>
            </table>
            <h5>비밀번호 변경하기</h5>
            <p>비밀번호를 변경하시려면 아래 버튼을 눌러주세요. 그리고 등록하신 이메일을 확인하시고 비밀번호를 변경해주세요.</p>
            <a class="waves-effect waves-light btn-large col s12">비밀번호 변경하기</a>
          </div>
        </div>
      </Layout>
    )
  }
}
