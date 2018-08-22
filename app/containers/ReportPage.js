import React, { Component } from 'react';
type Props = {};
import { Table, Button, Icon, Modal, Select, Form, Input, InputNumber, Popconfirm,Layout,Menu } from 'antd'
const Search = Input.Search;
const FormItem = Form.Item;
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

const { Header, Sider, Content } = Layout;

import style from '../assets/styles/stock.css'

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

  render() {

    return (
      <div>
        <div className='page-header' >
          <div className='header-h'>Raporlar</div>
          <div style={{ display: 'flex' }}>



          </div>
        </div>
        <div className='page-body'>
          <Layout>
            <Sider>
              <div className="logo" />
              <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
                <Menu.Item key="1">
                  <Icon type="user" />
                  <span>nav 1</span>
                </Menu.Item>
                <Menu.Item key="2">
                  <Icon type="video-camera" />
                  <span>nav 2</span>
                </Menu.Item>
                <Menu.Item key="3">
                  <Icon type="upload" />
                  <span>nav 3</span>
                </Menu.Item>
              </Menu>
            </Sider>
            <Layout>
              <Header style={{ background: '#fff', padding: 0 }}>
                Header
              </Header>
              <Content style={{ margin: '24px 16px', padding: 24, background: '#fff', minHeight: 280 }}>
                Content
              </Content>
            </Layout>
          </Layout>


        </div>

      </div>

    );
  }
}
function mapStateToProps({  }) {

  return {

  }
}

const ConnectedPage = connect(mapStateToProps, {})(ReportPage);
const WrappedPage = Form.create()(ConnectedPage);
export { WrappedPage as ReportPage }
