import React from "react";
import {Heading, Loading} from "./components";
import {HomeScreen, ProductScreen, CartScreen} from './screens'
import {BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import GlobalStyle from './GlobalStyle'

const App = () => {
  return (
    <Router>
      <GlobalStyle/>
      <Heading />
      <Loading/>
      <Switch>
       <Route exact path='/' component={HomeScreen}/>
       <Route path='/product/:id' component={ProductScreen}/>
       <Route path='/cart/:id?' component= {CartScreen}/>
      </Switch>
     
    </Router>
  );
};

export default App;
