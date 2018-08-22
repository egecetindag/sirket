// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styles from './Home.css';
import { Button, Select, Menu, Icon } from 'antd'
import { Icons } from '../assets/Icons'
import 'antd/dist/antd.css'
import { history } from '../store/configureStore'
import './Navbar.css'
const Option = Select.Option;

type Props = {};

class Navbar extends Component<Props> {
    props: Props
    constructor(props) {
        super(props);
        this.state = {
            current: 'mail'
        }

    }
    handleClick = (e) => {
        switch (e.key) {
            case '0':
                history.push('/')
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
                    <Menu.Item key="0">
                        <div className='navbar-icon'><Icons iconName='sale' /></div>
                        <div>Satış</div>
                    </Menu.Item>
                    {/* <Menu.Item key="1">
                        <div className='navbar-icon'><Icons iconName='turkish-lira' /></div>
                        <div>Fiyat Gör</div>
                    </Menu.Item>
                    <Menu.Item key="2">
                        <div className='navbar-icon'><Icons iconName='return' /></div>
                        <div>Ürün İade</div>
                    </Menu.Item> */}
                    <Menu.Item key="3">
                        <div className='navbar-icon'><Icons iconName='shopping' /></div>
                        <div>Ürün</div>
                    </Menu.Item>
                    <Menu.Item key="4">
                        <div className='navbar-icon'><Icons iconName='home' /></div>
                        <div>Stok</div>
                    </Menu.Item>
                    <Menu.Item key="5">
                        <div className='navbar-icon'><Icons iconName="user-plus" /></div>
                        <div>Müşteri</div>
                    </Menu.Item>
                    <Menu.Item key="6">
                        <div className='navbar-icon'><Icons iconName="users" /></div>
                        <div>Tedarikçi</div>
                    </Menu.Item>
                    <Menu.Item key="7">
                      <div className='navbar-icon'><Icons iconName="turkish-lira" /></div>
                      <div>Ödemeler</div>
                    </Menu.Item>
                    <Menu.Item key="8">
                      <div className='navbar-icon'><Icons iconName="cost" /></div>
                      <div>Masraf</div>
                    </Menu.Item>
                    <Menu.Item key="9">
                        <div className='navbar-icon'><Icons iconName="notepad" /></div>
                        <div>Tahsilat</div>
                    </Menu.Item>

                    <Menu.Item key="10">
                      <div className='navbar-icon'><Icons iconName="chart" /></div>
                      <div>Raporlar</div>
                    </Menu.Item>

                </Menu>

            </div>
        );
    }
}

export { Navbar }
