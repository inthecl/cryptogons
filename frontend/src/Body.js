import React, { Component } from 'react'
import M from 'materialize-css'
import './App.css'
import Layout from './Layout'
import imgSky from './image/img_sky.png'

export default class Body extends Component {
  componentDidMount() {
    M.AutoInit()
  }
  render() {
    return (
      <Layout>
        <div id="index-banner" class="parallax-container">
          <div class="section no-pad-bot">
            <div class="container">
              <br/><br/>
              <h1 class="header center teal-text text-lighten-2">Parallax Template</h1>
              <div class="row center">
                <h5 class="header col s12 light">A modern responsive front-end framework based on Material Design</h5>
              </div>
              <div class="row center">
                <a href="/Login" id="download-button" class="btn-large waves-effect waves-light teal lighten-1">Get Started</a>
              </div>
              <br/><br/>
            </div>
          </div>
          <div class="parallax"><img src={imgSky} alt="Unsplashed background img 1"/></div>
        </div>
     
        <div class="container">
          <div class="section">

            <div class="row">
              <div class="col s12 m4">
                <div class="icon-block">
                  <h2 class="center brown-text"><i class="material-icons">flash_on</i></h2>
                  <h5 class="center">Speeds up development</h5>

                  <p class="light">We did most of the heavy lifting for you to provide a default stylings that incorporate our custom components. Additionally, we refined animations and transitions to provide a smoother experience for developers.</p>
                </div>
              </div>

              <div class="col s12 m4">
                <div class="icon-block">
                  <h2 class="center brown-text"><i class="material-icons">group</i></h2>
                  <h5 class="center">User Experience Focused</h5>

                  <p class="light">By utilizing elements and principles of Material Design, we were able to create a framework that incorporates components and animations that provide more feedback to users. Additionally, a single underlying responsive system across all platforms allow for a more unified user experience.</p>
                </div>
              </div>

              <div class="col s12 m4">
                <div class="icon-block">
                  <h2 class="center brown-text"><i class="material-icons">settings</i></h2>
                  <h5 class="center">Easy to work with</h5>

                  <p class="light">We have provided detailed documentation as well as specific code examples to help new users get started. We are also always open to feedback and can answer any questions a user may have about Materialize.</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </Layout>
    )
  }
}