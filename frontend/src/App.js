import React, { Component } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import './App.css'
import Body from './Body'
import Login from './Login'
import Register from './Register'
import Forget from './Forget'
import MyGons from './MyGons'
import MyItem from './MyItem'
import MyCbg from './MyCbg'
import Market from './Market'
import MarketSale from './MarketSale'
import MarketSiring from './MarketSiring'
import MarketSiringDetail from './MarketSiringDetail'
import MarketNew from './MarketNew'
import Itemshop from './Itemshop'
import Event from './event'
import battles from './battles'
import ring from './ring'
import record from './record'
import rank from './rank'
import tournament from './tournament'
import Activity from './Activity'
import gons from './gons'
import breed from './breed'
import sell from './sell'
import gift from './gift'
import Myinfo from './Myinfo'
import CheckForget from './CheckForget'
import Profile from './profile'

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
            <Route exacy path="/MyItem/:pagenum" component={MyItem}/>
            <Route exacy path="/MyCbg/:pagenum" component={MyCbg}/>
            <Route exacy path="/Market/:pagenum" component={Market}/>
            <Route path="/MarketSale/:serialnumber" component={MarketSale}/>
            <Route path="/MarketSiring/:number" component={MarketSiring}/>
            <Route path="/MarketSiringDetail/:number" component={MarketSiringDetail}/>
            <Route path="/MarketNew/:number" component={MarketNew}/>
            <Route path="/Itemshop" component={Itemshop}/>
            <Route path="/event" component={Event}/>
            <Route path="/battles" component={battles}/>
            <Route path="/ring" component={ring}/>
            <Route path="/record" component={record}/>
            <Route path="/rank" component={rank}/>
            <Route path="/tournament" component={tournament}/>
            <Route path="/Activity" component={Activity}/>
            <Route path="/gons/:serialnumber" component={gons}/>
            <Route path="/breed/:serialnumber" component={breed}/>
            <Route path="/sell/:serialnumber" component={sell}/>
            <Route path="/gift/:serialnumber" component={gift}/>
            <Route path="/Myinfo" component={Myinfo}/>
            <Route path="/CheckForget/:checkForget" component={CheckForget}/>
            <Route exacy path="/profile/:username/:pagenum" component={Profile}/>
          </Switch>
        </BrowserRouter>
      </div>
    )
  }
}

export default App
