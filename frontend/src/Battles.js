import React, { Component } from 'react'
import './App.css'
import Layout from './Layout'
import BattleHeader from './BattleHeader'

export default class Battles extends Component {
  constructor(props) {
    super(props)
    this.state = {
      combination: '123',
      username: 'JaeDragon',
      nickname: 'Dooly',
      serialnumber: '#159456',
      generation: '3',
      cooldown: '60',
      parents: '111,222',
      children: '333,444',
      showPopup: false,
      price: 1
    }
  }

  render() {
    const color = this.state.combination.charAt(0)
    const line = this.state.combination.charAt(1)
    const eye = this.state.combination.charAt(2)
    return (
      <Layout>
        <BattleHeader/>
        <div class="container" >
          <div class="row">
            <div class="col s12 margin-bottom-30">
              <ul class="tabs">
                <li class="tab col s3"><a class="active" href="#test1">대기실</a></li>
                <li class="tab col s3"><a href="#test2">경기장</a></li>
                <li class="tab col s3"><a href="#test3">시상대</a></li>
                <li class="tab col s3"><a href="#test4">전적실</a></li>
              </ul>
            </div>

            <div id="test1" class="col s12">
              <div className="detail-Explanation">
                <div className="row">
                  <div class="col s12 m6 l6 left">
                    <div className="card z-depth-0">
                      <div className="card-image">
                        <img src={`${process.env.PUBLIC_URL}/images/Transparency.png`}/>
                        <div class="absolute">
                          <a class="modal-trigger" href="#modal1"><img src={`${process.env.PUBLIC_URL}/images/btn_select_gon.png`}/></a>

                          <div id="modal1" class="modal">
                            <div class="modal-content">
                              <h4>Modal Header</h4>
                              <p>List</p><p>List</p><p>List</p><p>List</p><p>List</p><p>List</p><p>List</p><p>List</p><p>List</p><p>List</p><p>List</p><p>List</p>
                              <p>List</p><p>List</p><p>List</p><p>List</p><p>List</p><p>List</p><p>List</p><p>List</p><p>List</p><p>List</p><p>List</p><p>List</p>
                            </div>
                            <div class="modal-footer">
                              <a href="#!" class="modal-close waves-effect waves-green btn-flat">Agree</a>
                            </div>
                          </div>

                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="col s12 m6 l6 right">
                    <a class="waves-effect waves-light btn-large col s12">OK, give them some privacy</a>
                  </div>
                </div>
              </div>
            </div>

            <div id="test2" class="col s12">
              <div className="detail-Explanation">
                <div className="row">
                  <div class="col s12 m6 l6 left">

                    <div class="row valign-wrapper">
                      <div class="col s2">
                        <img src={`${process.env.PUBLIC_URL}/images/usericon_1.png`} alt="" class="circle responsive-img"/>
                      </div>
                      <div class="col s10">
                        <span class="black-text">
                          1 Player
                        </span>
                      </div>
                    </div>

                    <div className="card z-depth-0">
                      <div className="card-image">
                        <img src={`${process.env.PUBLIC_URL}/images/Transparency.png`}/>
                        <div class="absolute">
                          <img src={`${process.env.PUBLIC_URL}/images/color_${color}.png`}/>
                        </div>
                        <div class="absolute">
                          <img src={`${process.env.PUBLIC_URL}/images/dragon_line${line}.png`}/>
                        </div>
                        <div class="absolute">
                          <img src={`${process.env.PUBLIC_URL}/images/eye_${eye}.png`}/>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="col s12 m6 l6 right">

                    <div class="row valign-wrapper">
                      <div class="col s2">
                        <img src={`${process.env.PUBLIC_URL}/images/usericon_1.png`} alt="" class="circle responsive-img"/>
                      </div>
                      <div class="col s10">
                        <span class="black-text">
                          2 Player
                        </span>
                      </div>
                    </div>

                    <div className="card z-depth-0">
                      <div className="card-image">
                        <img src={`${process.env.PUBLIC_URL}/images/Transparency.png`}/>
                        <div class="absolute">
                          <img src={`${process.env.PUBLIC_URL}/images/color_${color}.png`}/>
                        </div>
                        <div class="absolute">
                          <img src={`${process.env.PUBLIC_URL}/images/dragon_line${line}.png`}/>
                        </div>
                        <div class="absolute">
                          <img src={`${process.env.PUBLIC_URL}/images/eye_${eye}.png`}/>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div id="test3" class="col s12">
              <table className="highlight">
                <thead>
                  <tr>
                    <th>Rank</th>
                    <th>username</th>
                    <th>total</th>
                    <th>wins</th>
                    <th>losees</th>
                    <th>rate</th>
                  </tr>
                </thead>

                <tbody>
                  <tr>
                    <td>1</td>
                    <td>Eclair</td>
                    <td>$0.87</td>
                    <td>Alvin</td>
                    <td>Eclair</td>
                    <td>$0.87</td>
                  </tr>
                  <tr>
                    <td>2</td>
                    <td>Jellybean</td>
                    <td>$3.76</td>
                    <td>Alvin</td>
                    <td>Eclair</td>
                    <td>$0.87</td>
                  </tr>
                  <tr>
                    <td>3</td>
                    <td>Lollipop</td>
                    <td>$7.00</td>
                    <td>Alvin</td>
                    <td>Eclair</td>
                    <td>$0.87</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div id="test4" class="col s12">
              <div className="detail-Explanation">
                <div class="card-panel row">
                  <div className="left">
                    <div className="left">
                      <h1>win</h1>
                    </div>
                    <div className="right">
                      <div className="small-132-img margin-left-10">
                        <div className="card z-depth-0">
                          <div className="card-image">
                            <img src={`${process.env.PUBLIC_URL}/images/Transparency.png`}/>
                            <div class="absolute">
                              <img src={`${process.env.PUBLIC_URL}/images/color_${color}.png`}/>
                            </div>
                            <div class="absolute">
                              <img src={`${process.env.PUBLIC_URL}/images/dragon_line${line}.png`}/>
                            </div>
                            <div class="absolute">
                              <img src={`${process.env.PUBLIC_URL}/images/eye_${eye}.png`}/>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="right">
                    <div className="left">
                      <div className="small-132-img margin-right-10">
                        <div className="card z-depth-0">
                          <div className="card-image">
                            <img src={`${process.env.PUBLIC_URL}/images/Transparency.png`}/>
                            <div class="absolute">
                              <img src={`${process.env.PUBLIC_URL}/images/color_${color}.png`}/>
                            </div>
                            <div class="absolute">
                              <img src={`${process.env.PUBLIC_URL}/images/dragon_line${line}.png`}/>
                            </div>
                            <div class="absolute">
                              <img src={`${process.env.PUBLIC_URL}/images/eye_${eye}.png`}/>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="right">
                      <h1>lose</h1>
                    </div>
                  </div>
                </div>

                                <div class="card-panel row">
                  <div className="left">
                    <div className="left">
                      <h1>win</h1>
                    </div>
                    <div className="right">
                      <div className="small-132-img margin-left-10">
                        <div className="card z-depth-0">
                          <div className="card-image">
                            <img src={`${process.env.PUBLIC_URL}/images/Transparency.png`}/>
                            <div class="absolute">
                              <img src={`${process.env.PUBLIC_URL}/images/color_${color}.png`}/>
                            </div>
                            <div class="absolute">
                              <img src={`${process.env.PUBLIC_URL}/images/dragon_line${line}.png`}/>
                            </div>
                            <div class="absolute">
                              <img src={`${process.env.PUBLIC_URL}/images/eye_${eye}.png`}/>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="right">
                    <div className="left">
                      <div className="small-132-img margin-right-10">
                        <div className="card z-depth-0">
                          <div className="card-image">
                            <img src={`${process.env.PUBLIC_URL}/images/Transparency.png`}/>
                            <div class="absolute">
                              <img src={`${process.env.PUBLIC_URL}/images/color_${color}.png`}/>
                            </div>
                            <div class="absolute">
                              <img src={`${process.env.PUBLIC_URL}/images/dragon_line${line}.png`}/>
                            </div>
                            <div class="absolute">
                              <img src={`${process.env.PUBLIC_URL}/images/eye_${eye}.png`}/>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="right">
                      <h1>lose</h1>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </Layout>
    )
  }
}
