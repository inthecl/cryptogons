import React, { Component } from 'react'
import { graphql, compose } from 'react-apollo'
import { finduser, dragons, addUserIcon } from './queries'
import './App.css'
import Layout from './Layout'

class Activity extends Component {
  constructor(props) {
    super(props)
    this.state = {
      activity: [],
      username: null,
      myicon: []
    }
    this.handleAddIcon = this.handleAddIcon.bind(this)
  }
  handleAddIcon(e) {
    this.props.addUserIcon({ variables: { email: localStorage.getItem('email'), number: e } })
      .then((res) => {
        console.log(res)
      })
      .catch((errors) => {
        console.log('errors: ', errors)
      })
  }
  render() {
    if (!this.props.finduser.loading && !this.props.data.loading) {
      console.log('this.props', this.props)
      for (let al = 0; al < this.props.finduser.finduser.activity.length; al += 1) {
        this.state.activity[al] = this.props.finduser.finduser.activity[al]
      }
      this.state.activity.reverse() // 최신순으로 정렬
      this.state.username = this.props.finduser.finduser.username

      // 나의 아이콘 유무 확인
      let level1 = false // 최초 1단계용 획득
      let level2 = false // 최초 2단계용 획득
      let level3 = false // 최초 3단계용 획득
      let gons10 = false // 10개용 획득
      let gons50 = false // 50개용 획득
      let gons100 = false // 100개용 획득
      let gons300 = false // 300개용 획득
      let gons500 = false // 500개용 획득
      let gons1000 = false // 1000개용 획득
      let mutant = false // 돌연변이용 획득
      for (let il = 0; il < this.props.finduser.finduser.icon.length; il += 1) {
        if (this.props.finduser.finduser.icon[il].number === '02') {
          level1 = true
        }
        if (this.props.finduser.finduser.icon[il].number === '03') {
          level2 = true
        }
        if (this.props.finduser.finduser.icon[il].number === '04') {
          level3 = true
        }
        if (this.props.finduser.finduser.icon[il].number === '05') {
          gons10 = true
        }
        if (this.props.finduser.finduser.icon[il].number === '06') {
          gons50 = true
        }
        if (this.props.finduser.finduser.icon[il].number === '07') {
          gons100 = true
        }
        if (this.props.finduser.finduser.icon[il].number === '08') {
          gons300 = true
        }
        if (this.props.finduser.finduser.icon[il].number === '09') {
          gons500 = true
        }
        if (this.props.finduser.finduser.icon[il].number === '10') {
          gons1000 = true
        }
        if (this.props.finduser.finduser.icon[il].number === '11') {
          mutant = true
        }
      }
      // 최초 1,2,3단계, 돌연변이 획득시 아이콘추가
      for (let mdl = 0; mdl < this.props.finduser.finduser.myDragons.length; mdl += 1) {
        for (let dl = 0; dl < this.props.data.dragons.length; dl += 1) {
          if (this.props.finduser.finduser.myDragons[mdl] === this.props.data.dragons[dl].serial) {
            if (level1 === false && this.props.data.dragons[dl].combination.substring(0, 2) === '01') {
              this.handleAddIcon('02')
              level1 = true
            }
            if (level2 === false && this.props.data.dragons[dl].combination.substring(0, 2) === '02') {
              this.handleAddIcon('03')
              level2 = true
            }
            if (level3 === false && this.props.data.dragons[dl].combination.substring(0, 2) === '03') {
              this.handleAddIcon('04')
              level3 = true
            }
            if (mutant === false && this.props.data.dragons[dl].combination.substring(0, 2) === '04') {
              this.handleAddIcon('11')
              mutant = true
            }
          }
        }
      }
      // 용개수 충족시 아이콘추가
      const gl = this.props.finduser.finduser.myDragons.length
      if (gons10 === false && gl >= 10 && gl < 50) {
        this.handleAddIcon('05')
        gons10 = true
      }
      if (gons50 === false && gl >= 50 && gl < 100) {
        this.handleAddIcon('06')
        gons50 = true
      }
      if (gons100 === false && gl >= 100 && gl < 300) {
        this.handleAddIcon('07')
        gons100 = true
      }
      if (gons300 === false && gl >= 300 && gl < 500) {
        this.handleAddIcon('08')
        gons300 = true
      }
      if (gons500 === false && gl >= 500 && gl < 1000) {
        this.handleAddIcon('09')
        gons500 = true
      }
      if (gons1000 === false && gl >= 1000) {
        this.handleAddIcon('10')
        gons1000 = true
      }
    }
    return (
      <Layout>
        <div className="container">
          <h2>Activity</h2>
          <p>Here’s a list of your requested transactions.
            it may take a couple of minutes for the app to receive the updates, so keep checking!</p>

          <div class="row">
            <div class="col s12 m6 l6 left">
              <a class="waves-effect waves-light btn margin-right-5 margin-top-5">오늘</a>
              <a class="waves-effect waves-light btn margin-right-5 margin-top-5">1주일</a>
              <a class="waves-effect waves-light btn margin-right-5 margin-top-5">1개월</a>
              <a class="waves-effect waves-light btn margin-right-5 margin-top-5">6개월</a>
            </div>
            <div class="col s12 m12 l6">
              <div class="col s12 m5 l5">
                <input type="text" class="datepicker" placeholder="Jul 16, 2018"/>
              </div>
              <div class="col s12 m2 l2 margin-top-15 center">
               ~
              </div>
              <div class="col s12 m5 l5">
                <input type="text" class="datepicker" placeholder="Jul 16, 2018"/>
              </div>
            </div>
          </div>

          <div className="activity-div-scroll margin-top-15 margin-bottom-50">
            <ul class="collection">
              {this.state.activity.map(item =>
                <div key={item.id}>

                  {item.type === 'breed' &&
                    <li class="collection-item avatar">
                      <i class="material-icons circle red">favorite</i>
                      <span class="title">{item.date}</span>
                      <p>{item.type} <br/>
                        <a href={`/gons/${item.contents[0]}`}>{item.contents[0]}</a>용과 <a href={`/gons/${item.contents[1]}`}>{item.contents[1]}</a>용에게서 <a href={`/gons/${item.contents[2]}`}>{item.contents[2]}</a>이 탄생했습니다.
                      </p>
                      <a href="#!" class="secondary-content"><i class="material-icons">grade</i></a>
                      <hr/>
                    </li>
                  }
                  {item.type === 'item' &&
                    <li class="collection-item avatar">
                      <i class="material-icons circle orange">shopping_cart</i>
                      <span class="title">{item.date}</span>
                      <p>{item.type} <br/>
                        {item.contents[2] === 'diamond' &&
                          <span>
                            {item.contents[0]} {item.contents[1]}을 <img src={`${process.env.PUBLIC_URL}/images/brief_info/dia.png`}/>{item.contents[3]}으로 구매했습니다.
                          </span>
                        }
                        {item.contents[2] === 'gold' &&
                          <span>
                            {item.contents[0]} {item.contents[1]}을 <img src={`${process.env.PUBLIC_URL}/images/brief_info/gold.png`}/>{item.contents[3]}으로 구매했습니다.
                          </span>
                        }
                        {item.contents[2] === 'trophy' &&
                          <span>
                            {item.contents[0]} {item.contents[1]}을 <img src={`${process.env.PUBLIC_URL}/images/brief_info/trophy.png`}/>{item.contents[3]}으로 구매했습니다.
                          </span>
                        }
                      </p>
                      <a href="#!" class="secondary-content"><i class="material-icons">grade</i></a>
                      <hr/>
                    </li>
                  }
                  {item.type === 'eitem' &&
                    <li class="collection-item avatar">
                      <i class="material-icons circle green">shopping_cart</i>
                      <span class="title">{item.date}</span>
                      <p>{item.type} <br/>
                        {item.contents[2] === 'diamond' &&
                          <span>
                            {item.contents[0]} {item.contents[1]}을 <img src={`${process.env.PUBLIC_URL}/images/brief_info/dia.png`}/>{item.contents[3]}으로 구매했습니다.
                          </span>
                        }
                        {item.contents[2] === 'gold' &&
                          <span>
                            {item.contents[0]} {item.contents[1]}을 <img src={`${process.env.PUBLIC_URL}/images/brief_info/gold.png`}/>{item.contents[3]}으로 구매했습니다.
                          </span>
                        }
                        {item.contents[2] === 'trophy' &&
                          <span>
                            {item.contents[0]} {item.contents[1]}을 <img src={`${process.env.PUBLIC_URL}/images/brief_info/trophy.png`}/>{item.contents[3]}으로 구매했습니다.
                          </span>
                        }
                      </p>
                      <a href="#!" class="secondary-content"><i class="material-icons">grade</i></a>
                      <hr/>
                    </li>
                  }
                  {item.type === 'dragonPurchase' && this.state.username === item.contents[0] &&
                    <li class="collection-item avatar">
                      <i class="material-icons circle blue">child_friendly</i>
                      <span class="title">{item.date}</span>
                      <p>{item.type} <br/>
                        마켓에 올린 <a href={`/gons/${item.contents[2]}`}>{item.contents[2]}</a>을 <a href={`/profile/${item.contents[1]}/1`}>{item.contents[1]}</a>에게 <img src={`${process.env.PUBLIC_URL}/images/brief_info/dia.png`}/>{item.contents[3]}에 판매하였습니다.
                      </p>
                      <a href="#!" class="secondary-content"><i class="material-icons">grade</i></a>
                      <hr/>
                    </li>
                  }
                  {item.type === 'dragonPurchase' && this.state.username !== item.contents[0] &&
                    <li class="collection-item avatar">
                      <i class="material-icons circle blue">child_friendly</i>
                      <span class="title">{item.date}</span>
                      <p>{item.type} <br/>
                        마켓에서 <a href={`/profile/${item.contents[0]}/1`}>{item.contents[0]}</a>이 올린 <a href={`/gons/${item.contents[2]}`}>{item.contents[2]}</a>을 <img src={`${process.env.PUBLIC_URL}/images/brief_info/dia.png`}/>{item.contents[3]}에 구매하였습니다.
                      </p>
                      <a href="#!" class="secondary-content"><i class="material-icons">grade</i></a>
                      <hr/>
                    </li>
                  }
                  {item.type === 'edragonPurchase' &&
                    <li class="collection-item avatar">
                      <i class="material-icons circle purple">stars</i>
                      <span class="title">{item.date}</span>
                      <p>{item.type} <br/>
                        이벤트마켓에서 <a href={'/profile/devman/1'}>devman</a>이 올린 <a href={`/gons/${item.contents[0]}`}>{item.contents[0]}</a>을 <img src={`${process.env.PUBLIC_URL}/images/brief_info/${item.contents[1]}.png`}/>{item.contents[2]}에 구매하였습니다.
                      </p>
                      <a href="#!" class="secondary-content"><i class="material-icons">grade</i></a>
                      <hr/>
                    </li>
                  }
                  {item.type === 'siringPurchase' && this.state.username === item.contents[0] &&
                    <li class="collection-item avatar">
                      <i class="material-icons circle pink">favorite_border</i>
                      <span class="title">{item.date}</span>
                      <p>{item.type} <br/>
                        마켓에 올린 <a href={`/gons/${item.contents[2]}`}>{item.contents[2]}</a>을 <a href={`/profile/${item.contents[1]}/1`}>{item.contents[1]}</a>가 <a href={`/gons/${item.contents[3]}`}>{item.contents[3]}</a>와 <img src={`${process.env.PUBLIC_URL}/images/brief_info/dia.png`}/>{item.contents[5]}에 교배하여 <a href={`/gons/${item.contents[4]}`}>{item.contents[4]}</a>가 탄생하였습니다.
                      </p>
                      <a href="#!" class="secondary-content"><i class="material-icons">grade</i></a>
                      <hr/>
                    </li>
                  }
                  {item.type === 'siringPurchase' && this.state.username !== item.contents[0] &&
                    <li class="collection-item avatar">
                      <i class="material-icons circle pink">favorite_border</i>
                      <span class="title">{item.date}</span>
                      <p>{item.type} <br/>
                        마켓에서 <a href={`/profile/${item.contents[0]}/1`}>{item.contents[0]}</a>가 올린 <a href={`/gons/${item.contents[2]}`}>{item.contents[2]}</a>와 나의 <a href={`/gons/${item.contents[3]}`}>{item.contents[3]}</a>을 <img src={`${process.env.PUBLIC_URL}/images/brief_info/dia.png`}/>{item.contents[5]}에 교배하여 <a href={`/gons/${item.contents[4]}`}>{item.contents[4]}</a>가 탄생하였습니다.
                      </p>
                      <a href="#!" class="secondary-content"><i class="material-icons">grade</i></a>
                      <hr/>
                    </li>
                  }
                  {item.type === 'gift' && this.state.username === item.contents[0] &&
                    <li class="collection-item avatar">
                      <i class="material-icons circle yellow">cake</i>
                      <span class="title">{item.date}</span>
                      <p>{item.type} <br/>
                        나의 <a href={`/gons/${item.contents[2]}`}>{item.contents[2]}</a>을 <a href={`/profile/${item.contents[1]}/1`}>{item.contents[1]}</a>에게 선물하였습니다.
                      </p>
                      <a href="#!" class="secondary-content"><i class="material-icons">grade</i></a>
                      <hr/>
                    </li>
                  }
                  {item.type === 'gift' && this.state.username !== item.contents[0] &&
                    <li class="collection-item avatar">
                      <i class="material-icons circle yellow">cake</i>
                      <span class="title">{item.date}</span>
                      <p>{item.type} <br/>
                        <a href={`/profile/${item.contents[0]}/1`}>{item.contents[0]}</a>가 <a href={`/gons/${item.contents[2]}`}>{item.contents[2]}</a>을 나에게 선물하였습니다.
                      </p>
                      <a href="#!" class="secondary-content"><i class="material-icons">grade</i></a>
                      <hr/>
                    </li>
                  }

                </div>
              )}
            </ul>
          </div>

        </div>
      </Layout>
    )
  }
}

export default compose(
  graphql(finduser, {
    name: 'finduser',
    options: props => ({
      variables: {
        email: localStorage.getItem('email')
      }
    })
  }),
  graphql(dragons),
  graphql(addUserIcon, { name: 'addUserIcon' })
)(Activity)
