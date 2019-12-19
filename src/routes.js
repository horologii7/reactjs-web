import React from 'react';

import { ModalContainer } from "react-router-modal";
import "react-router-modal/css/react-router-modal.css";

import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Main from './pages/main';
import Product from './pages/product';

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path='/' component={Main} />
      <Route path='/products' component={Main} />
      <Route path='/product/:id' component={Product} />
    </Switch>
    
    <ModalContainer />
  </BrowserRouter>
);

export default Routes;