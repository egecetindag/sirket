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
                history.push('/counter')
                break;
            case '2':
                break;
            case '3':
                history.push('/product');
                break;
            case '4':
                history.push('/stock');
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
                        <div>Satis</div>
                    </Menu.Item>
                    <Menu.Item key="1">
                        <div className='navbar-icon'><Icons iconName='turkish-lira' /></div>
                        <div>Fiyat Gor</div>
                    </Menu.Item>
                    <Menu.Item key="2">
                        <div className='navbar-icon'><Icons iconName='return' /></div>
                        <div>Urun Iade</div>
                    </Menu.Item>
                    <Menu.Item key="3">
                        <div className='navbar-icon'><Icons iconName='shopping' /></div>
                        <div>Urun</div>
                    </Menu.Item>
                    <Menu.Item key="4">
                        <div className='navbar-icon'><Icons iconName='home' /></div>
                        <div>Stok</div>
                    </Menu.Item>
                    <Menu.Item key="5">
                        <div className='navbar-icon'><Icons iconName="user-plus" /></div>
                        <div>Musteri</div>
                    </Menu.Item>
                    <Menu.Item key="6">
                        <div className='navbar-icon'><Icons iconName="users" /></div>
                        <div>Tedarikci</div>
                    </Menu.Item>
                    <Menu.Item key="7">
                        <div className='navbar-icon'><Icons iconName="notepad" /></div>
                        <div>Veresiye</div>
                    </Menu.Item>
                    <Menu.Item key="8">
                        <div className='navbar-icon'><Icons iconName="chart" /></div>
                        <div>Raporlar</div>
                    </Menu.Item>
                </Menu>

            </div>
        );
    }
}

export { Navbar }
