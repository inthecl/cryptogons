import React, { Component } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import './App.css'
import Body from './Body'
import Login from './Login'
import Register from './Register'
import Forget from './Forget'
import MyGons from './MyGons'
import Market from './Market'
import MarketSale from './MarketSale'
import MarketSiring from './MarketSiring'
import MarketSiringDetail from './MarketSiringDetail'
import MarketNew from './MarketNew'
import Items from './Items'
import Battles from './Battles'
import Activity from './Activity'
import Detail from './Detail'
import Breed from './Breed'
import Sell from './Sell'
import Gift from './Gift'
import Myinfo from './Myinfo'
import CheckForget from './CheckForget'

class App extends Component {
  render() {
    return (
      <div>
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={Body}/>
            <Route path="/Login" component={Login}/>
            <Route path="/Register" component={Register}/>
            <Route path="/Forget" component={Forget}/>
            <Route exacy path="/MyGons/:pagenum" component={MyGons}/>
            <Route exacy path="/Market/:pagenum" component={Market}/>
            <Route path="/MarketSale/:number" component={MarketSale}/>
            <Route path="/MarketSiring/:number" component={MarketSiring}/>
            <Route path="/MarketSiringDetail/:number" component={MarketSiringDetail}/>
            <Route path="/MarketNew/:number" component={MarketNew}/>
            <Route exacy path="/Items/:pagenum" component={Items}/>
            <Route path="/Battles" component={Battles}/>
            <Route path="/Activity" component={Activity}/>
            <Route path="/Detail/:username" component={Detail}/>
            <Route path="/Breed" component={Breed}/>
            <Route path="/Sell" component={Sell}/>
            <Route path="/Gift" component={Gift}/>
            <Route path="/Myinfo" component={Myinfo}/>
            <Route path="/CheckForget/:checkForget" component={CheckForget}/>
          </Switch>
        </BrowserRouter>
      </div>
    )
  }
}

export default App
