import React, { Component } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import './App.css'
import Body from './Body'
import Login from './Login'
import Register from './Register'
import Forget from './Forget'
import MyGons from './MyGons'
import Market from './Market'
import Items from './Items'
import Battles from './Battles'
import Activity from './Activity'
import Detail from './Detail'

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
            <Route path="/MyGons" component={MyGons}/>
            <Route exacy path="/Market/:pagenum" component={Market}/>
            <Route path="/Items" component={Items}/>
            <Route path="/Battles" component={Battles}/>
            <Route path="/Activity" component={Activity}/>
            <Route path="/Detail/:username" component={Detail}/>
          </Switch>
        </BrowserRouter>
      </div>
    )
  }
}

export default App
