import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom'

export default class MaterialPagination extends Component {
  drawPagenation(linkPath, pagenum, lastPage) {
    let targetPages = []
    for (let i = -1; i < 6; i += 1) {
      targetPages.push(parseInt(pagenum, 10) + i)
    }
    targetPages = targetPages.filter(num => num < lastPage + 2)
    const first = targetPages[0]
    const len = 7 - targetPages.length
    for (let i = 0; i < len; i += 1) {
      targetPages.unshift(first - (i + 1))
    }
    console.log(targetPages.filter(target => parseInt(target, 10) > -1))
    targetPages = targetPages.filter(target => parseInt(target, 10) > -1)
    let idx = 0
    let activePage = 0
    const listItems = targetPages.map((num) => {
      idx += 1
      if (num === 0) {
        return <li className="disabled"><Link to={`/${linkPath}/${String(activePage)}`}><i className="material-icons">chevron_left</i></Link></li>
      }
      if (idx === 1) {
        return <li><Link to={`/${linkPath}/${String(parseInt(pagenum, 10) - 1)}`}><i className="material-icons">chevron_left</i></Link></li>
      }
      if (parseInt(pagenum, 10) === num) {
        activePage = num
        return <li className="active"><Link to={`/${linkPath}/${String(num)}`}>{num}</Link></li>
      }
      if (activePage + 1 > lastPage + 1 && idx === targetPages.length) {
        return <li className="disabled"><Link to={`/${linkPath}/${String(activePage)}`}><i className="material-icons">chevron_right</i></Link></li>
      }
      if (idx === targetPages.length) {
        return <li><Link to={`/${linkPath}/${String(parseInt(activePage, 10) + 1)}`}><i className="material-icons">chevron_right</i></Link></li>
      }
      return <li><Link to={`/${linkPath}/${String(num)}`}>{num}</Link></li>
    })
    return (
      <ul class="pagination">{listItems}</ul>
    )
  }

  render() {
    const { linkPath, pageNum, lastPage } = this.props
    return this.drawPagenation(linkPath, pageNum, lastPage)
  }
}
