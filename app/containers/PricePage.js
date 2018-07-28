import React, { Component } from 'react';
type Props = {};
import { Table, Button, Icon, Modal, Form, Input, InputNumber } from 'antd'
import { Link } from 'react-router-dom';
import '../assets/styles/price.css'

class StockPage extends Component<Props> {
    props: Props
    constructor(props) {
        true
        super(props);
        this.state = {
            visible: false,
            continue: false,
            barkod: ''
        }
    }
 
    render() {
        return (
            <div>
                Fiyat Gor
            </div>

        );
    }
}
export { PricePage }