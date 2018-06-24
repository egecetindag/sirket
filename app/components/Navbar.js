// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styles from './Home.css';
import { Button, Select, Menu, Icon } from 'antd'
import 'antd/dist/antd.css'
import { history } from '../store/configureStore'
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
        console.log(e.key)

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
                >
                    <Menu.Item key="0">
                        <Icon type="mail" />Satis
                    </Menu.Item>
                    <Menu.Item key="1">
                        <Icon type="mail" />Fiyat Gor
                    </Menu.Item>
                    <Menu.Item key="2">
                        <Icon type="mail" />Urun iade
                    </Menu.Item>
                    <Menu.Item key="3">
                        <Icon type="mail" />Urun ekle
                    </Menu.Item>
                    <Menu.Item key="4">
                        <Icon type="mail" />Stok girisi
                    </Menu.Item>
                    <Menu.Item key="5">
                        <Icon type="mail" />Tedarikci
                    </Menu.Item>
                    <Menu.Item key="6">
                        <div><Icon type="mail" /></div>
                        <div>Musteri ekle</div>
                    </Menu.Item>
                    <Menu.Item key="7">
                        <Icon type="mail" />Veresiye
                    </Menu.Item>
                    <Menu.Item key="8">
                        <Icon type="mail" />Raporlar
                    </Menu.Item>
                </Menu>

            </div>
        );
    }
}
