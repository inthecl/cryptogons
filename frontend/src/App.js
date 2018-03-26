import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import './App.css';
import Body from './Body';
import Login from './Login';
import Register from './Register';
import Market from './Market';
import FAQs from './FAQs';
import Detail from './Detail';

class App extends Component {
  render() {
    return (
      <div>
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={Body}/>
            <Route path="/Login" component={Login}/>
            <Route path="/Register" component={Register}/>
            <Route path="/Market/:pagenum" component={Market}/>
            <Route path="/FAQs" component={FAQs}/>
            <Route path="/Detail/:username" component={Detail}/>
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
