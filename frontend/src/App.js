import React from "react";
import {Heading, Loading} from "./components";
import {HomeScreen, ProductScreen, CartScreen,LoginScreen, RegisterScreen, ProfileScreen} from './screens'
import {BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import GlobalStyle from './GlobalStyle'

const App = () => {
  return (
    <Router>
      <GlobalStyle/>
      <Heading />
      <Loading/>
      <Switch>
        <Route path='/login' component= {LoginScreen}/>
        <Route path='/register' component= {RegisterScreen}/>
        <Route path='/profile' component= {ProfileScreen}/>
        <Route path='/product/:id' component={ProductScreen}/>
        <Route path='/cart/:id?' component= {CartScreen}/>
        <Route exact path='/' component={HomeScreen}/>
      </Switch>
     
    </Router>
  );
};

export default App;
