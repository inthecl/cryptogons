import React, { Component } from 'react'
import _ from 'underscore'
import { Link, Redirect } from 'react-router-dom'
import './App.css'
import Layout from './Layout'
import MyGonHeader from './MyGonHeader'
import MaterialPagination from './MaterialPagination'

export default class MyGons extends Component {
  constructor(props) {
    super(props)
    this.state = {
      radio: 'state_radio',
      TestList: []
    }

    const pad = (n, width) => {
      n = n + ''
      return n.length >= width ? n : new Array(width - n.length + 1).join('0') + n
    }
    for (let n = 1; n <= 10; n += 1) {
      const property = Math.floor(Math.random() * 5) + 1
      const wing = pad(Math.floor(Math.random() * 3) + 1, 2)
      const wingColor = pad(Math.floor(Math.random() * 3) + 1, 2)
      const horn = pad(Math.floor(Math.random() * 3) + 1, 2)
      const hornColor = pad(Math.floor(Math.random() * 3) + 1, 2)
      const tail = pad(Math.floor(Math.random() * 3) + 1, 2)
      const body = pad(Math.floor(Math.random() * 3) + 1, 2)
      const bodyColor = pad(Math.floor(Math.random() * 3) + 1, 2)
      const eye = pad(Math.floor(Math.random() * 3) + 1, 2)
      const eyeColor = pad(Math.floor(Math.random() * 3) + 1, 2)
      const mouth = pad(Math.floor(Math.random() * 3) + 1, 2)
      const nose = pad(Math.floor(Math.random() * 3) + 1, 2)

      this.state.TestList[n] = [1, property, wing, wingColor, horn, hornColor, tail, body, bodyColor, eye, eyeColor, mouth, nose]

      if (n !== 1) {
        for (let o = 1; o < n; o += 1) {
          const oldComb = String(this.state.TestList[o][0]) + String(this.state.TestList[o][1]) + String(this.state.TestList[o][2]) + String(this.state.TestList[o][3]) +
          String(this.state.TestList[o][4]) + String(this.state.TestList[o][5]) + String(this.state.TestList[o][6]) + String(this.state.TestList[o][7]) +
          String(this.state.TestList[o][8]) + String(this.state.TestList[o][9]) + String(this.state.TestList[o][10]) + String(this.state.TestList[o][11]) +
          String(this.state.TestList[o][12])
          const newComb = String(this.state.TestList[n][0]) + String(this.state.TestList[n][1]) + String(this.state.TestList[n][2]) + String(this.state.TestList[n][3]) +
          String(this.state.TestList[n][4]) + String(this.state.TestList[n][5]) + String(this.state.TestList[n][6]) + String(this.state.TestList[n][7]) +
          String(this.state.TestList[n][8]) + String(this.state.TestList[n][9]) + String(this.state.TestList[n][10]) + String(this.state.TestList[n][11]) +
          String(this.state.TestList[n][12])
          if (oldComb === newComb) {
            n -= 1
            console.log('restart')
            break
          }
        }
      }
      console.log('TestList : ', this.state.TestList[n])
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
        <MyGonHeader/>
        <div class="row container">
          <div class="col s12">
            <ul class="tabs">
              <li class="tab col s4"><a class="active" href="#test1">Gons</a></li>
              <li class="tab col s4"><a href="#test2">장신구</a></li>
              <li class="tab col s4"><a href="#test3">배경</a></li>
            </ul>
          </div>
          <div class="col s6">
            <br/>

            <form action="#">
              <span className="margin-right-10">
                <label>
                  <input name="group1" type="radio" checked/>
                  <span>all</span>
                </label>
              </span>
              <span className="margin-right-10">
                <label>
                  <input name="group1" type="radio"/>
                  <span>for sale</span>
                </label>
              </span>
              <span>
                <label>
                  <input name="group1" type="radio"/>
                  <span>siring</span>
                </label>
              </span>
            </form>

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
