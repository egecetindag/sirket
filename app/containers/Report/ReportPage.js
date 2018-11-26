import React, { Component } from 'react';
type Props = {};
import { Table, Button, Icon, Modal, Select, Form, Input, InputNumber, Popconfirm, Layout, Menu } from 'antd'
const Search = Input.Search;
const FormItem = Form.Item;
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { history } from '../../store/configureStore'
import { SummaryDashboard } from './SummaryDashboard'
import { StockReport } from './StockReport'
import { ActivityLog } from './ActivityLog'
import { PaymentReport} from "./PaymentReport";
import { ProductReport} from "./ProductReport";

const { Header, Sider, Content } = Layout;
import { Route } from 'react-router';
import { DatePicker } from 'antd';
const { RangePicker } = DatePicker;
const dateFormat = 'DD/MM/YYYY';
import style from '../../assets/styles/stock.css'
import moment from 'moment'

import {lang} from '../../services/config'

const MenuItem = Menu.Item


class ReportPage extends Component<Props> {
  props: Props
  constructor(props) {
    super(props);
    this.state = {
        dates : [moment(moment().subtract(30, 'days'),dateFormat),moment(moment(),dateFormat)]
    }
  }
  componentDidMount() {
      console.log(this.state.dates)
  }
  handleMenuSelect = (e) => {
    if (e.key === '1') {
      history.push('/report/saleReport')
    }
    if (e.key === '2') {
      history.push('/report/stockReport')
    }
    if (e.key === '3') {
      history.push('/report/paymentReport')
    }
    if (e.key === '4') {
      history.push('/report/activity')
    }
    if (e.key === '5') {
      history.push('/report/product')
    }
    // if (e.key === '6') {
    //   history.push('/report/operator')
    // }
    // buraya diger caseler gelecek
  }

  onChange = (date, dateString) => {
    console.log(date, dateString);
    this.setState({
        dates:date,
    })
  }

render() {

  return (
    <div>
      <div className='page-header' >
        <div className='header-h'>{lang.reports}</div>
        <div style={{ display: 'flex' }}>
            <RangePicker
              placeholder={[lang.startDate, lang.endDate]}
              format={dateFormat}
              onChange={this.onChange}
              defaultValue={this.state.dates}
            />


        </div>
      </div>
      <div className='page-body'>
        <Layout style={{marginLeft: "20px"}}>

          <Sider>
            <div className="logo" />
            <Menu
              style={{height: "70vh"}}
              theme="light"
              mode="inline"
              defaultSelectedKeys={['1']}
              onClick={this.handleMenuSelect}
            >
              <MenuItem key="1">
                <Icon type="dashboard" style={{fontSize:'1.4em'}}/>
                <span>{lang.saleReport}</span>
              </MenuItem>
              <MenuItem key="2">
                <Icon type="line-chart" style={{fontSize:'1.4em'}}/>
                <span>{lang.stockReport}</span>
              </MenuItem>
              <MenuItem key="3">
                <Icon type="credit-card" style={{fontSize:'1.4em'}}/>
                <span>{lang.paymentReport}</span>
              </MenuItem>
              <MenuItem key="4">
                <Icon type="bars" style={{fontSize:'1.4em'}}/>
                <span>{lang.activityLog}</span>
              </MenuItem>
              <MenuItem key="5">
                <Icon type="inbox" style={{fontSize:'1.4em'}} />
                <span>{lang.productReport}</span>
              </MenuItem>
              {/*<Menu.Item key="6">*/}
                {/*<Icon type="user" />*/}
                {/*<span>Operatör Raporu</span>*/}
              {/*</Menu.Item>*/}
            </Menu>
          </Sider>

          <Layout>

            <Content style={{ background: 'white', padding: '18px',overflow: 'auto', height:'70vh' }}>
              
          <Route path='/report/saleReport' render={(props) => (
            <SummaryDashboard {...props} dates={this.state.dates} />
          )}/>
          <Route path='/report/stockReport' render={(props) => (
            <StockReport {...props} />
          )}/>
          <Route path='/report/paymentReport' render={(props) => (
                <PaymentReport {...props} dates={this.state.dates}/>
              )}/>
          <Route path='/report/activity' render={(props) => (
             <ActivityLog {...props} dates={this.state.dates}/>
           )}/>
          <Route path='/report/product' render={(props) => (
              <ProductReport {...props} dates={this.state.dates}/>
          )}/>
              {/*<Route path='/report/operator' render={(props) => (*/}
                {/*<ActivityLog {...props} dates={this.state.dates}/>*/}
              {/*)}/>*/}
              </Content>
          </Layout>
        </Layout>


      </div>

    </div>

  );
}
}
function mapStateToProps({ }) {

  return {

  }
}

const ConnectedPage = connect(mapStateToProps, {})(ReportPage);
const WrappedPage = Form.create()(ConnectedPage);
export { WrappedPage as ReportPage }
