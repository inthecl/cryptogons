import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom'
import _ from 'underscore'
import Layout from './Layout'
import MaterialPagination from './MaterialPagination'

export default class Item extends Component {
  constructor(props) {
    super(props)
    this.state = {
      dia: '300',
      point: '45'
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
    const { pagenum } = this.props.match.params
    const lastItem = this.exampleItems.length
    const lastPage = lastItem / 12
    console.log(lastPage)
    const startItem = (pagenum - 1) * 12
    let endItem = pagenum * 12
    if (pagenum < 1) return <Redirect to="/Market/1"/>
    if (pagenum > lastPage + 1) return <Redirect to="/Market/1"/>

    if (endItem > lastItem) endItem = lastItem
    const pages = this.exampleItems.slice(startItem, endItem)
    const names = ['111.png', '112.png', '113.png']

    return (
      <Layout>
        <div className='container center'>
          <div className="row">

            <div className="col l12 m12 s12">
              <div className="col s12 m6 l6 left left-align">
                <h2>Item</h2>
              </div>
              <div className="col s12 m6 l6 right right-align">
                <h5>다이아 {this.state.dia} 포인트 {this.state.point}</h5>
              </div>
            </div>

            <div class="row">
              <div class="col s12">
                <ul class="tabs margin-bottom-30">
                  <li class="tab col s3"><a href="#test1">Weapon</a></li>
                  <li class="tab col s3"><a class="active" href="#test2">Shield</a></li>
                </ul>
              </div>
              <div id="test1" class="col s12">
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
                          <Link to={`/MarketSale/ ${item.name}`}>{item.name}</Link>
                        </div>
                      </div>
                    </div>
                  </div>)}
              </div>
              <div id="test2" class="col s12">
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
                          <Link to={`/MarketSale/'${item.name}`}>{item.name}</Link>
                        </div>
                      </div>
                    </div>
                  </div>)}
              </div>
            </div>

          </div>
          <MaterialPagination linkPath="Market" pageNum={pagenum} lastPage={lastPage} />
        </div>
      </Layout>
    )
  }
}
