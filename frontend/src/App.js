import React from "react";
import {Heading} from "./components";
import {HomeScreen, ProductScreen} from './screens'
import {BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import GlobalStyle from './GlobalStyle'

const App = () => {
  return (
    <Router>
      <GlobalStyle/>
      <Heading />
      <Switch>
       <Route exact path='/' component={HomeScreen}/>
       <Route path='/product/:id' component={ProductScreen}/>
      </Switch>
     
    </Router>
  );
};

export default App;
