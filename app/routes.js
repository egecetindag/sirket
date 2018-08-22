/* eslint flowtype-errors/show-errors: 0 */
import React from 'react';
import { Switch, Route } from 'react-router';
import {SalePage} from './containers/SalePage';
import {NavbarPage} from './containers/NavbarPage';
import {ProductPage} from './containers/ProductPage';
import {StockPage} from './containers/StockPage';
import {ClientPage} from './containers/ClientPage';
import {DealerPage} from "./containers/DealerPage";
import {PricePage} from "./containers/PricePage";
import {ReceivingPage} from "./containers/ReceivingPage";
import {PaymentPage} from "./containers/PaymentPage";
import {ExpensePage} from "./containers/ExpensePage";
import { ReportPage } from "./containers/ReportPage";

import {App} from './containers/App';
import {Layout} from 'antd'

const { Header, Footer, Sider, Content } = Layout;
export default () => (
  <App>
    <Switch>
    <Layout  style={{background:'white',height:"100vh"}}>
      <NavbarPage />
      <Content style={{background: 'white', margin:'10px'}}>
      <Route path="/sale" component={SalePage} />
      <Route path = '/product' component= {ProductPage} />
      <Route path = '/stock' component= {StockPage} />
      <Route path = '/client' component= {ClientPage} />
      <Route path = '/dealer' component= {DealerPage} />
      <Route path = '/price' component= {PricePage} />
      <Route path = '/receiving' component= {ReceivingPage} />
      <Route path = '/payment' component= {PaymentPage} />
      <Route path = '/expense' component= {ExpensePage} />
      <Route path = '/report' component= {ReportPage} />
      </Content>
    </Layout>
    </Switch>
  </App>
);
