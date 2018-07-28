/* eslint flowtype-errors/show-errors: 0 */
import React from 'react';
import { Switch, Route } from 'react-router';
import HomePage from './containers/HomePage';
import NavbarPage from './containers/NavbarPage';
import ProductPage from './containers/ProductPage';

import App from './containers/App';
import {Layout} from 'antd'
const { Header, Footer, Sider, Content } = Layout;
export default () => (
  <App>
    <Switch>
    <Layout  style={{height:"100vh"}}>
      <NavbarPage/>
      <Content style={{background: 'white', margin:'10px'}}>

      <Route exact path="/" component={HomePage} />
      <Route path = '/product' component= {ProductPage} />
      </Content>
    </Layout>
    </Switch>
  </App>
);
