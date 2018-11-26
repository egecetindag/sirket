// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styles from './Home.css';
import 'antd/dist/antd.css'
import { Button, Select, Menu, Icon, Drawer,Avatar, Divider } from 'antd'
import { Icons } from '../assets/Icons'
import { history } from '../store/configureStore'
import './Navbar.css'
import { connect } from 'react-redux'
import {logout} from '../actions/AuthActions'
import {lang} from '../services/config'
const Option = Select.Option;

type Props = {};

const MenuItem = Menu.Item;

class Navbar extends Component<Props> {
    props: Props
    constructor(props) {
        super(props);
        this.state = {
            current: 'mail',
            visible:false
        }

    }
    showDrawer = () => {
        console.log('as')
        this.setState({
          visible: true,
        });
      };
    
      onClose = () => {
        this.setState({
          visible: false,
        });
      };
      handleLogout = () =>{
          this.props.logout();
      }
    handleClick = (e) => {
        switch (e.key) {
            case '0':
                history.push('/sale')
                break;
            case '1':
                history.push('/price')
                break;
            case '2':
                history.push('/price')
                break;
            case '3':
                history.push('/product');
                break;
            case '4':
                history.push('/stock');
                break;
            case '5':
                history.push('/client');
                break;
            case '6':
                history.push('/dealer');
                break;
            case '7':
                history.push('/payment');
                break;
            case '8':
                history.push('/expense');
                break;
            case '9':
                history.push('/receiving');
                break;
          case '10':
            history.push('/report/saleReport');
            break;
            case '11':
            // history.push('/report');
            break;

        }
    }

    render() {
        return (
            <div>
                <Menu
                    onClick={this.handleClick}
                    mode="horizontal"
                    className='navbar-menu'
                >
                    <MenuItem key="0">
                        <div className='navbar-icon'><Icons iconName='sale' /></div>
                        <div>{lang.sale}</div>
                    </MenuItem>
                    {/* <MenuItem key="1">
                        <div className='navbar-icon'><Icons iconName='turkish-lira' /></div>
                        <div>Fiyat Gör</div>
                    </MenuItem>
                    <MenuItem key="2">
                        <div className='navbar-icon'><Icons iconName='return' /></div>
                        <div>Ürün İade</div>
                    </MenuItem> */}
                    <MenuItem key="3">
                        <div className='navbar-icon'><Icons iconName='shopping' /></div>
                        <div>{lang.product}</div>
                    </MenuItem>
                    <MenuItem key="4">
                        <div className='navbar-icon'><Icons iconName='home' /></div>
                        <div>{lang.stock}</div>
                    </MenuItem>
                    <MenuItem key="5">
                        <div className='navbar-icon'><Icons iconName="user-plus" /></div>
                        <div>{lang.customer}</div>
                    </MenuItem>
                    <MenuItem key="6">
                        <div className='navbar-icon'><Icons iconName="users" /></div>
                        <div>{lang.dealer}</div>
                    </MenuItem>
                    <MenuItem key="7">
                        <div className='navbar-icon'><Icons iconName="turkish-lira" /></div>
                        <div>{lang.payment}</div>
                    </MenuItem>
                    <MenuItem key="8">
                        <div className='navbar-icon'><Icons iconName="cost" /></div>
                        <div>{lang.expense}</div>
                    </MenuItem>
                    <MenuItem key="9">
                        <div className='navbar-icon'><Icons iconName="notepad" /></div>
                        <div>{lang.receiving}</div>
                    </MenuItem>

                    <MenuItem key="10">
                        <div className='navbar-icon'><Icons iconName="chart" /></div>
                        <div>{lang.report}</div>
                    </MenuItem>
                    <MenuItem key="11">
                        <div className='navbar-icon'><Icons iconName="settings-work-tool" /></div>
                        <div>{lang.settings}</div>
                    </MenuItem>
                </Menu>
                <div>

                    <Button onClick={this.showDrawer} className='navbar-button'><Icon style={{ color: 'white', fontSize: '2em' }} type="ellipsis" /></Button>
                </div>
                <Drawer
                    style={{textAlign:'center'}}
                    title={lang.drawerTitle}
                    placement="right"
                    closable={false}
                    onClose={this.onClose}
                    visible={this.state.visible}
                >


                     
                    <Avatar size={116} icon="user" />
                    
                    <Divider />
                    <Button onClick ={this.handleLogout} >Logout</Button>
                
                </Drawer>
            </div>

        );
    }
}

function mapStateToProps({ authReducer }) {
    const { user } = authReducer;
    return {
        user
    }
}

const ConnectedPage = connect(mapStateToProps, {logout})(Navbar);

export {ConnectedPage as Navbar }
