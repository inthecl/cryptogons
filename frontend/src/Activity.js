import React, { Component } from 'react'
import { graphql, compose } from 'react-apollo'
import { finduser } from './queries'
import './App.css'
import Layout from './Layout'

class Activity extends Component {
  constructor(props) {
    super(props)
    this.state = {
      activity: [],
      username: null
    }
  }
  render() {
    if (!this.props.finduser.loading) {
      for (let al = 0; al < this.props.finduser.finduser.activity.length; al += 1) {
        this.state.activity[al] = this.props.finduser.finduser.activity[al]
      }
      this.state.activity.reverse() // 최신순으로 정렬
      this.state.username = this.props.finduser.finduser.username
      console.log('activity', this.state.activity)
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
  })
)(Activity)

