import React, { Component } from 'react';
type Props = {};
import { Table, Button, Icon, Modal, Select, Form, Input, InputNumber, Popconfirm, Layout, Menu } from 'antd'
const Search = Input.Search;
const FormItem = Form.Item;
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { history } from '../../store/configureStore'
import { StockReport } from './StockReport'
import { SummaryDashboard } from './SummaryDashboard'
const { Header, Sider, Content } = Layout;
import { Route } from 'react-router';
import { DatePicker } from 'antd';
const { RangePicker } = DatePicker;
const dateFormat = 'DD/MM/YYYY';

import style from '../../assets/styles/stock.css'

import moment from 'moment'
class ReportPage extends Component<Props> {
  props: Props
  constructor(props) {
    super(props);
    this.state = {

    }
  }
  componentDidMount() {

  }
  handleMenuSelect = (e) => {
    if (e.key === '1') {
      history.push('/report/summaryDashboard')
    }
    if (e.key === '2') {
      history.push('/report/stockReport')
    }
    // buraya diger caseler gelecek
  }

  onChange = (date, dateString) => {
    console.log(date, dateString);
  }

render() {

  return (
    <div>
      <div className='page-header' >
        <div className='header-h'>Raporlar</div>
        <div style={{ display: 'flex' }}>
            <RangePicker
              placeholder={['Başlangıç Tarihi', 'Bitiş Tarihi']}
              format={dateFormat}
              onChange={this.onChange}
            />


        </div>
      </div>
      <div className='page-body'>
        <Layout style={{margin: "20px"}}>

          <Sider>
            <div className="logo" />
            <Menu
              style={{height: "70vh"}}
              theme="light"
              mode="inline"
              defaultSelectedKeys={['1']}
              onClick={this.handleMenuSelect}
            >
              <Menu.Item key="1">
                <Icon type="user" />
                <span>Summary Dashboard</span>
              </Menu.Item>
              <Menu.Item key="2">
                <Icon type="video-camera" />
                <span>Stock Report</span>
              </Menu.Item>
              <Menu.Item key="3">
                <Icon type="upload" />
                <span>nav 3</span>
              </Menu.Item>
            </Menu>
          </Sider>

          <Layout>

            <Content >
              
          <Route path='/report/summaryDashboard' component={SummaryDashboard} />
          <Route path='/report/stockReport' component={StockReport} />

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
