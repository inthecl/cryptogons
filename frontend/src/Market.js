import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom'
import _ from 'underscore'
import Layout from './Layout'

export default class Market extends Component {
  constructor(props) {
    super(props)
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

  drawPagenation(pagenum, lastPage) {
    let targetPages = []
    for (let i = -1; i < 6; i += 1) {
      targetPages.push(parseInt(pagenum, 10) + i)
    }
    targetPages = targetPages.filter(num => num < lastPage + 2)
    console.log(targetPages)
    const first = targetPages[0]
    const len = 7 - targetPages.length
    for (let i = 0; i < len; i += 1) {
      targetPages.unshift(first - (i + 1))
    }
    console.log(targetPages)
    let idx = 0
    let activePage = 0
    const listItems = targetPages.map((num) => {
      idx += 1
      if (num === 0) {
        return <li className="disabled"><Link to={`/Market/${String(num)}`}><i className="material-icons">chevron_left</i></Link></li>
      }
      if (idx === 1) {
        return <li><Link to={`/Market/${String(parseInt(pagenum, 10) - 1)}`}><i className="material-icons">chevron_left</i></Link></li>
      }
      if (parseInt(pagenum, 10) === num) {
        activePage = num
        return <li className="active"><Link to={`/Market/${String(num)}`}>{num}</Link></li>
      }
      if (activePage + 1 > lastPage + 1 && idx === targetPages.length) {
        return <li className="disabled"><Link to={`/Market/${String(activePage)}`}><i className="material-icons">chevron_right</i></Link></li>
      }
      if (idx === targetPages.length) {
        return <li><Link to={`/Market/${String(parseInt(activePage, 10) + 1)}`}><i className="material-icons">chevron_right</i></Link></li>
      }
      return <li><Link to={`/Market/${String(num)}`}>{num}</Link></li>
    })
    return (
      <ul class="pagination">{listItems}</ul>
    )
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
                      <Link to="/Market/2">{item.name}</Link>
                    </div>
                  </div>
                </div>
              </div>)}
          </div>
          {this.drawPagenation(pagenum, lastPage)}
        </div>
      </Layout>
    )
  }
}
