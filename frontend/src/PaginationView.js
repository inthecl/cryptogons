import React from 'react'
import { Col, Card, CardTitle, image } from 'react-materialize'
import _ from 'underscore'
import Pagination from './Pagination'
import imgTestPet from './image/img_test_pet.png'

class PaginationView extends React.Component {
  constructor() {
    super()

    // an example array of items to be paged
    const exampleItems = _.range(1, 151).map(i => ({ id: i, name: `Item ${i}` }))

    this.state = {
      exampleItems,
      pageOfItems: []
    }

    // bind function in constructor instead of render (https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-no-bind.md)
    this.onChangePage = this.onChangePage.bind(this)
  }

  onChangePage(pageOfItems) {
    // update state with new page of items
    this.setState({ pageOfItems })
  }

  render() {
    return (
      <div>
        <div align='center'>
          <div className="container">
            <div className="text-center">
              <h1>React - Pagination Example with logic like Google</h1>
              <div class="row">
                {this.state.pageOfItems.map(item =>
                  <div key={item.id}>
                    <div class="col s12 m6 l3">
                      <Card className='small'
                        header={<CardTitle image={imgTestPet}>Card Title</CardTitle>}
                        actions={[<a href={`/Detail/${item.name}`}>{item.name}</a>]}>
                                            I am a very simple card.
                                            I am good at containing small bits of information.
                                            I am convenient because I require little markup to use effectively.
                      </Card>
                    </div>
                  </div>)}
              </div>
              <Pagination items={this.state.exampleItems} onChangePage={this.onChangePage} />
            </div>
          </div>
        </div>
        <hr />
        <div className="credits text-center">
          <p>
            <a href="http://jasonwatmore.com/post/2017/03/14/react-pagination-example-with-logic-like-google" target="_top">
              React - Pagination Example with Logic like Google
            </a>
          </p>
          <p>
            <a href="http://jasonwatmore.com" target="_top">JasonWatmore.com</a>
          </p>
        </div>
      </div>
    )
  }
}

export default PaginationView
