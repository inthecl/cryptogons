import React, { Component } from 'react'
import './App.css'
import Layout from './Layout'
import imgRectangle from './image/img_Rectangle.png'
import imgDia from './image/icon_dia.png'
import imgPoint from './image/icon_point.png'

export default class MyGons extends Component {
  render() {
    return (
      <Layout>
        <div class="row container">
          <br/>
          <div class="col s6">
            <div class="valign-wrapper">
              <div class="col l2 s6">
                <img src={imgRectangle} alt="" class="circle responsive-img"/>
              </div>
              <div class="col l10 s6">
                <span class="black-text">
                  ZANGON
                </span>
              </div>
            </div>
          </div>
          <div class="col s6">
            <div>
              <div class="right"><img src={imgDia}/>&nbsp;1200&nbsp;&nbsp;<img src={imgPoint}/>&nbsp;200</div>
            </div>
          </div>
          <div class="col s12">
            <br/>
            <ul class="tabs">
              <li class="tab col s3"><a class="active" href="#test1">Gons</a></li>
              <li class="tab col s3"><a href="#test2">장신구</a></li>
              <li class="tab col s3"><a href="#test3">Test 3</a></li>
            </ul>
          </div>
          <div class="col s6">
            <br/>
            <p>
              <label>
                <input class="with-gap" name="group3" type="radio" checked />
                <span>all</span>
              </label>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <label>
                <input class="with-gap" name="group3" type="radio" checked />
                <span>for sale</span>
              </label>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <label>
                <input class="with-gap" name="group3" type="radio" checked />
                <span>siring</span>
              </label>
            </p>
          </div>
          <div class="col s6">
            <br/>
            <div class="input-field col l6 s12 right">
              <select>
                <option value="" disabled selected>Choose your option</option>
                <option value="1">Option 1</option>
                <option value="2">Option 2</option>
                <option value="3">Option 3</option>
              </select>
              <label>Materialize Select</label>
              <br/>
            </div>
          </div>
          <div id="test1" class="col s12">Test 11</div>
          <div id="test2" class="col s12">Test 22</div>
          <div id="test3" class="col s12">Test 33</div>
        </div>
      </Layout>
    )
  }
}
