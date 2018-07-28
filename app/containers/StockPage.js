import React, { Component } from 'react';
type Props = {};
import { Table, Button, Icon, Modal } from 'antd'
import { Link } from 'react-router-dom';
import '../assets/styles/stock.css'

const columns = [{
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
}, {
    title: 'Age',
    dataIndex: 'age',
    key: 'age',
}, {
    title: 'Address',
    dataIndex: 'address',
    key: 'address',
}];
const dataSource = [{ name: 'ege', age: 11, address: 'snne' }]
class StockPage extends Component<Props> {
    props: Props
    constructor(props) {
        super(props);
        this.state = {
            visible: false;
        }

    }
    handleOk = () => {
        this.setState({
            visible:false
        })
    }
    handleModalOpen = ()=>{
        this.setState({
            visible:true
        })
    }
    render() {
        return (
            <div>
                <div className='page-header' >
                    <div className='header-h'>Stok</div>
                    <div><Button onClick={this.handleModalOpen}>Add New Item<Icon type='plus' /></Button></div>
                </div>true
                <div>
                    <Table dataSource={dataSource} columns={columns} />
                </div>
                <Modal
                    title="Add New"
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                />
            </div>

        );
    }
}

export { StockPage }