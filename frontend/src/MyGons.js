import React, { Component } from 'react'
import _ from 'underscore'
import { Link, Redirect } from 'react-router-dom'
import './App.css'
import Layout from './Layout'
import imgDia from './image/icon_dia.png'
import imgPoint from './image/icon_point.png'
import MaterialPagination from './MaterialPagination'


export default class MyGons extends Component {
  constructor(props) {
    super(props)
    this.state = {
      radio: 'state_radio'
    }
    // 조합배열 생성
    let a
    let b
    let c
    let count = 0
    const combArr = []
    for (a = 1; a <= 3; a += 1) {
      for (b = 1; b <= 3; b += 1) {
        for (c = 1; c <= 3; c += 1) {
          combArr[count] = [a, b, c]
          count += 1
        }
      }
    }
    // 중복없는 난수배열 생성
    let x
    let y
    const randomArr = []
    for (x = 0; x <= 26; x += 1) {
      randomArr[x] = Math.floor(Math.random() * 27)
      for (y = 0; y < x; y += 1) {
        if (randomArr[x] === randomArr[y]) x -= 1
      }
    }

    this.exampleItems = _.range(1, 151).map(i => ({
      id: i,
      name: `Item ${i}`,
      comb0: combArr[randomArr[i % 26]][0],
      comb1: combArr[randomArr[i % 26]][1],
      comb2: combArr[randomArr[i % 26]][2]
    }))
  }

  render() {
    console.log(this.state.radio)
    const { pagenum } = this.props.match.params
    const lastItem = this.exampleItems.length
    const lastPage = lastItem / 12
    console.log(lastPage)
    const startItem = (pagenum - 1) * 12
    let endItem = pagenum * 12
    if (pagenum < 1) return <Redirect to="/MyGons/1"/>
    if (pagenum > lastPage + 1) return <Redirect to="/MyGons/1"/>

    if (endItem > lastItem) endItem = lastItem
    const pages = this.exampleItems.slice(startItem, endItem)
    const names = ['111.png', '112.png', '113.png']
    return (
      <Layout>
        <div class="row container">
          <br/>
          <div class="left">
            <div class="valign-wrapper">
              <div class="col s6 m6 l12">
                <img src={`${process.env.PUBLIC_URL}/images/img_Rectangle.png`} alt="" class="circle responsive-img"/>
              </div>
              <div class="col">
                <span class="black-text">
                  <h5>IntheCL</h5>
                  <p>zangon88@gmail.com</p>
                </span>
              </div>
            </div>
          </div>
          <div class="right">
            <div>
              <p><img src={imgDia}/>&nbsp;1200&nbsp;&nbsp;<img src={imgPoint}/>&nbsp;200</p>
              <p align="right"><Link to={'/Myinfo'}>내 정보 관리</Link></p>
            </div>
          </div>
          <div class="col s12">
            <br/>
            <ul class="tabs">
              <li class="tab col s4"><a class="active" href="#test1">Gons</a></li>
              <li class="tab col s4"><a href="#test2">장신구</a></li>
              <li class="tab col s4"><a href="#test3">배경</a></li>
            </ul>
          </div>
          <div class="col s6">
            <br/>
            <p>
              <label>
                <input class="with-gap" name="group1" type="radio" value="all" checked />
                <span>all</span>
              </label>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <label>
                <input class="with-gap" name="group1" type="radio" value="sale" />
                <span>for sale</span>
              </label>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <label>
                <input class="with-gap" name="group1" type="radio" value="siring" />
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
          <div id="test1" class="col s12">
            <div className='center'>
              <div className="row">
                {pages.map(item =>
                  <div key={item.id}>
                    <div className="col s12 m6 l3">
                      <div className="card">
                        <div className="card-image">
                          <img src={`${process.env.PUBLIC_URL}/images/${names[item.id % 3]}`}/>
                          <div class="absolute">
                            <img src={`${process.env.PUBLIC_URL}/images/color_${item.comb0}.png`}/>
                          </div>
                          <div class="absolute">
                            <img src={`${process.env.PUBLIC_URL}/images/dragon_line${item.comb1}.png`}/>
                          </div>
                          <div class="absolute">
                            <img src={`${process.env.PUBLIC_URL}/images/eye_${item.comb2}.png`}/>
                          </div>
                          <span className="card-title">Card Title</span>
                        </div>
                        <div className="card-content">
                          <p>I am a very simple card. I am good at containing small bits of information.
                          I am convenient because I require little markup to use effectively.</p>
                        </div>
                        <div className="card-action">
                          <Link to={`/Detail/' ${item.name}`}>{item.name}</Link>
                        </div>
                      </div>
                    </div>
                  </div>)}
              </div>
              <MaterialPagination linkPath="MyGons" pageNum={pagenum} lastPage={lastPage} />
            </div>
          </div>
          <div id="test2" class="col s12">장신구</div>
          <div id="test3" class="col s12">배경</div>
        </div>
      </Layout>
    )
  }
}
