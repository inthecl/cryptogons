import React, { Component } from 'react'
import { graphql, compose } from 'react-apollo'
import { CheckEmailquery, editChoiceIcon } from './queries'
import './App.css'
import Layout from './Layout'

class Myinfo extends Component {
  constructor(props) {
    super(props)
    this.state = {
      icon: [],
      choice_icon: null,
      change_icon: 'doNotClick'
    }
    this.handleChangePassword = this.handleChangePassword.bind(this)
    this.handleChoiceIcon = this.handleChoiceIcon.bind(this)
  }
  handleChangePassword(event) {
    console.log(this.props)
  }
  handleChoiceIcon(event) {
    this.setState({ change_icon: event })
    this.props.editChoiceIcon({ variables: { email: localStorage.getItem('email'), number: event } })
      .then((res) => {
        console.log(res)
      })
      .catch((errors) => {
        console.log('errors: ', errors)
      })
  }
  render() {
    console.log('this.props : ', this.props)
    if (!this.props.CheckEmailquery.loading) {
      console.log('this.props.CheckEmailquery.checkemail.icon : ', this.props.CheckEmailquery.checkemail.icon)
      this.state.icon = this.props.CheckEmailquery.checkemail.icon
      this.state.choice_icon = this.props.CheckEmailquery.checkemail.choice_icon
    }
    return (
      <Layout>
        <div id="modal_icon" class="modal">
          <div class="modal-content">
            <h4>Modal Header</h4>
            <div class="col s12">
              <div className='center'>
                <div className="row">
                  {this.state.icon.map(item =>
                    <div key={item.id}>
                      <div className="col s6 m2 l2">
                        <div className="card">
                          <div className="card-image">
                            <img src={`${process.env.PUBLIC_URL}/images/icon/icon_${item.number}.png`} onClick={ () => this.handleChoiceIcon(item.number)}/>
                            {this.state.choice_icon === item.number && this.state.change_icon === 'doNotClick' &&
                              <div class="absolute">
                                <img src={`${process.env.PUBLIC_URL}/images/icon/icon_choice.png`} onClick={this.handleReleaseSword}/>
                              </div>
                            }
                            {this.state.change_icon === item.number &&
                              <div class="absolute">
                                <img src={`${process.env.PUBLIC_URL}/images/icon/icon_choice.png`} onClick={this.handleReleaseSword}/>
                              </div>
                            }
                          </div>
                        </div>
                      </div>
                    </div>)}
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <a href="#!" class="modal-close waves-effect waves-green btn-flat">Agree</a>
          </div>
        </div>
        {this.props.CheckEmailquery.loading ? (
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
                    {this.state.change_icon === 'doNotClick' &&
                      <td><img src={`${process.env.PUBLIC_URL}/images/icon/icon_${this.props.CheckEmailquery.checkemail.choice_icon}.png`} class="circle responsive-img" width="45px"/></td>
                    }
                    {this.state.change_icon !== null && this.state.change_icon !== 'doNotClick' &&
                      <td><img src={`${process.env.PUBLIC_URL}/images/icon/icon_${this.state.change_icon}.png`} class="circle responsive-img" width="45px"/></td>
                    }
                    <td><a class="modal-trigger" href="#modal_icon"><i class="Medium material-icons right margin-right-10">edit</i></a></td>
                  </tr>
                  <tr>
                    <td height="80px" >User name</td>
                    <td>{this.props.CheckEmailquery.checkemail.username}</td>
                    <td></td>
                  </tr>
                  <tr>
                    <td height="80px">E-Mail</td>
                    <td>{this.props.CheckEmailquery.checkemail.email}</td>
                    <td></td>
                  </tr>
                  <tr>
                    <td height="80px">Diamond</td>
                    <td>{this.props.CheckEmailquery.checkemail.diamond}</td>
                    <td></td>
                  </tr>
                  <tr>
                    <td height="80px">Gold</td>
                    <td>{this.props.CheckEmailquery.checkemail.gold}</td>
                    <td></td>
                  </tr>
                  <tr>
                    <td height="80px">Trophy</td>
                    <td>{this.props.CheckEmailquery.checkemail.trophy}</td>
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

export default compose(
  graphql(CheckEmailquery, {
    name: 'CheckEmailquery',
    options: props => ({
      variables: {
        email: localStorage.getItem('email')
      }
    })
  }),
  graphql(editChoiceIcon, { name: 'editChoiceIcon' })
)(Myinfo)
