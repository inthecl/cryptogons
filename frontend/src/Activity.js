import React, { Component } from 'react'
import './App.css'
import Layout from './Layout'

export default class Activity extends Component {
  render() {
    return (
      <Layout>
        <div className="detail-Explanation">
          <h1>Activity</h1>
          <p>Here’s a list of your requested transactions.
            it may take a couple of minutes for the app to receive the updates, so keep checking!</p>

          <div class="row">
            <div class="col s12 m6 l6 left">
              <a class="waves-effect waves-light btn margin-right-5 margin-bottom-5">오늘</a>
              <a class="waves-effect waves-light btn margin-right-5 margin-bottom-5">1주일</a>
              <a class="waves-effect waves-light btn margin-right-5 margin-bottom-5">1개월</a>
              <a class="waves-effect waves-light btn margin-right-5 margin-bottom-5">6개월</a>
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

          <div className="activity-div-scroll margin-top-15">
            <ul class="collection">
              <li class="collection-item avatar">
                <i class="material-icons circle">folder</i>
                <span class="title">Title</span>
                <p>First Line <br/>
                  Second Line
                </p>
                <a href="#!" class="secondary-content"><i class="material-icons">grade</i></a>
              </li>
              <li class="collection-item avatar">
                <i class="material-icons circle green">insert_chart</i>
                <span class="title">Title</span>
                <p>First Line <br/>
                  Second Line
                </p>
                <a href="#!" class="secondary-content"><i class="material-icons">grade</i></a>
              </li>
              <li class="collection-item avatar">
                <i class="material-icons circle red">play_arrow</i>
                <span class="title">Title</span>
                <p>First Line <br/>
                  Second Line
                </p>
                <a href="#!" class="secondary-content"><i class="material-icons">grade</i></a>
              </li>
              <li class="collection-item avatar">
                <i class="material-icons circle">folder</i>
                <span class="title">Title</span>
                <p>First Line <br/>
                  Second Line
                </p>
                <a href="#!" class="secondary-content"><i class="material-icons">grade</i></a>
              </li>
              <li class="collection-item avatar">
                <i class="material-icons circle green">insert_chart</i>
                <span class="title">Title</span>
                <p>First Line <br/>
                  Second Line
                </p>
                <a href="#!" class="secondary-content"><i class="material-icons">grade</i></a>
              </li>
              <li class="collection-item avatar">
                <i class="material-icons circle red">play_arrow</i>
                <span class="title">Title</span>
                <p>First Line <br/>
                  Second Line
                </p>
                <a href="#!" class="secondary-content"><i class="material-icons">grade</i></a>
              </li>
              <li class="collection-item avatar">
                <i class="material-icons circle">folder</i>
                <span class="title">Title</span>
                <p>First Line <br/>
                  Second Line
                </p>
                <a href="#!" class="secondary-content"><i class="material-icons">grade</i></a>
              </li>
              <li class="collection-item avatar">
                <i class="material-icons circle green">insert_chart</i>
                <span class="title">Title</span>
                <p>First Line <br/>
                  Second Line
                </p>
                <a href="#!" class="secondary-content"><i class="material-icons">grade</i></a>
              </li>
              <li class="collection-item avatar">
                <i class="material-icons circle red">play_arrow</i>
                <span class="title">Title</span>
                <p>First Line <br/>
                  Second Line
                </p>
                <a href="#!" class="secondary-content"><i class="material-icons">grade</i></a>
              </li>
            </ul>
          </div>

        </div>
      </Layout>
    )
  }
}
