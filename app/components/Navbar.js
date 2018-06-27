// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styles from './Home.css';
import { Button, Select, Menu, Icon } from 'antd'
import 'antd/dist/antd.css'
import { history } from '../store/configureStore'
import './Navbar.css'
const Option = Select.Option;

type Props = {};

export default class Navbar extends Component<Props> {
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
                history.push('/counter')
                break;
            case '2':
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
                        <div className='navbar-icon'><Icon type="shopping-cart" /></div>
                        <div>Satis</div>
                    </Menu.Item>
                    <Menu.Item key="1">
                        <div className='navbar-icon'><Icon type="line-chart" /></div>
                        <div>Fiyat Gor</div>
                    </Menu.Item>
                    <Menu.Item key="2">
                        <div className='navbar-icon'><Icon type="mail" /></div>
                        <div>Urun Iade</div>
                    </Menu.Item>
                    <Menu.Item key="3">
                        <div className='navbar-icon'><Icon type="mail" /></div>
                        <div>Urun ekle</div>
                    </Menu.Item>
                    <Menu.Item key="4">
                        <div className='navbar-icon'><Icon type="mail" /></div>
                        <div>Stok Girisi</div>
                    </Menu.Item>
                    <Menu.Item key="5">
                        <div className='navbar-icon'><Icon type="user" /></div>
                        <div>Musteri ekle</div>
                    </Menu.Item>
                    <Menu.Item key="6">
                        <div className='navbar-icon'><Icon type="mail" /></div>
                        <div>Tedarikci</div>
                    </Menu.Item>
                    <Menu.Item key="7">
                        <div className='navbar-icon'><Icon type="mail" /></div>
                        <div>Veresiye</div>
                    </Menu.Item>
                    <Menu.Item key="8">
                        <div className='navbar-icon'><Icon type="line-chart" /></div>
                        <div>Raporlar</div>
                    </Menu.Item>
                </Menu>

            </div>
        );
    }
}
