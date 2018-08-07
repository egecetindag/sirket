import React, { Component } from 'react';
type Props = {};
import { Table, Button, Icon, Modal, Form, Input, InputNumber } from 'antd'
const Search = Input.Search;
const FormItem = Form.Item;
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import {retrieveStocks,createStock,editStock} from '../actions/StockActions'
import style from '../assets/styles/stock.css'

import moment from 'moment'
class StockPage extends Component<Props> {
    props: Props
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            continue: false,
            barkod: '',
            editVisible:false,
        }
    }
    componentDidMount(){
        this.props.retrieveStocks();
    }
    handleOk = () => {
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                const dataToSend = {
                    productId: values.productId,
                    qty: values.qty,
                    dealerId: values.dealerId
                }
                console.log('data', dataToSend)
                this.props.createStock(dataToSend);
                setTimeout(() => {
                    this.setState({
                        visible: false
                    })
                }, 1000);
            }
        });
    }
    handleEdit = () => {
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                const dataToSend = {
                    id: values.id,
                    productId: values.productId,
                    qty: values.qty,
                    dealerId: values.dealerId
                }
                console.log('data', dataToSend)     // ??
                this.props.editStock(dataToSend);
                setTimeout(() => {
                    this.setState({
                        visible: true
                    })
                }, 1000);
            }
        });
    }
    handleCancel = () => {
        this.props.form.resetFields();
        this.setState({
            visible: false,
        })
    }
    handleModalOpen = () => {
        this.setState({
            visible: true,

        })
     }
    handleSearch = () =>{
    }
    handleWithoutBarcode = () =>{
        this.setState({
            continue: true
        })
    }
    handleBarcode = (e) => {
        if (e.target.value.length === 12) {
            this.setState({
                continue: true
            })
        }
        else {
            this.setState({
                continue: false
            })

        }
        this.setState({
            barkod: e.target.value
        })
    }

    render() {
        const columns = [{
            title: 'Barkod',
            dataIndex: 'productId.barcode',
            key: 'barcode',
        }, {
            title: 'Isim',
            dataIndex: 'productId.name',
            key: 'name',
        },
        {
            title: 'Kategori',
            dataIndex: 'productId.kategori',
            key: 'kategori',
        },
        {
            title: 'Alis Fiyati',
            dataIndex: 'productId.purchasePrice',
            key: 'purchasePrice',
        },
        {
            title: 'Satis Fiyati',
            dataIndex: 'productId.salePrice',
            key: 'salePrice',
        },
        {
            title: 'Giris Tarihi',
            dataIndex: 'creationDate',
            key: 'creationDate',
            render: (text) => <div>{moment.unix(text).format('DD/MM/YYYY')}</div>
        },
        {
            title: 'Adet',
            dataIndex: 'qty',
            key: 'qty',
        },
        {
            title: 'Duzenle',
            render:() => <Button onClick={this.handleEdit} style={{border:'0', background:'transparent'}}><Icon type="edit" /></Button>
        }
        
        ];
        const { getFieldDecorator } = this.props.form;
        return (
            <div>
                <div className='page-header' >
                    <div className='header-h'>Stok</div>
                    <div style={{ display: 'flex' }}>
                        <Search
                        style={{height:'32px', marginRight:'10px'}}
                            placeholder="Stok Ara"
                            onSearch = {this.handleSearch}
                        />
                        <Button onClick={this.handleModalOpen}>Yeni Stok Girisi<Icon type='plus' /></Button>

                    </div>
                </div>
                <div className='page-body'>
                    <Table dataSource={this.props.stocks} columns={columns} />
                </div>


                <Modal
                    title="Yeni Stock"
                    visible={this.state.visible}
                    onCancel={this.handleCancel}
                    footer={[
                        <Button onClick={this.handleCancel}>Iptal</Button>,
                        <Button type="primary" onClick={this.handleOk}>
                            Kaydet
                        </Button>,
                    ]}
                >
                    <Form className='stock-form'>
                        <FormItem
                            label="Barkod"
                            style={{ display: 'flex' }}
                        >
                            {getFieldDecorator('barkod', {
                                initialValue: this.state.barkod,
                                rules: [{
                                    required: false, message: 'Barkodu girin!'
                                }],
                            })(
                                <Input onChange={this.handleBarcode} />
                            )}
                                <Button style={{border: '0',fontSize:'0.8em' }}onClick={this.handleWithoutBarcode}>Barkodsuz devam et</Button>
                            
                        </FormItem>
                        {this.state.continue &&
                            <div>
                                <FormItem
                                    label="Isim"
                                    style={{ display: 'flex' }}
                                >
                                    {getFieldDecorator('isim', {
                                        rules: [{
                                            required: true, message: 'Isim girin!'
                                        }],
                                    })(
                                        <Input />
                                    )}
                                    
                                </FormItem>
                                <FormItem
                                    label="Aciklama"
                                    style={{ display: 'flex' }}
                                >
                                    {getFieldDecorator('aciklama', {
                                        rules: [{
                                            required: false
                                        }],
                                    })(
                                        <Input />
                                    )}
                                </FormItem>
                                <FormItem
                                    label="Kategori"
                                    style={{ display: 'flex' }}
                                >
                                    {getFieldDecorator('kategori', {
                                        rules: [{
                                            required: false
                                        }],
                                    })(
                                        <Input />
                                    )}
                                </FormItem>
                                <FormItem
                                    label="Alis Fiyati"
                                    style={{ display: 'flex' }}
                                >
                                    {getFieldDecorator('alisFiyati', {
                                        rules: [{
                                            required: true, message: 'Alis fiyatini girin!'
                                        }],
                                    })(
                                        <InputNumber min={0} formatter={value => `${value}₺`} />
                                    )}
                                </FormItem>
                                <FormItem
                                    label="Satis Fiyati"
                                    style={{ display: 'flex' }}
                                >
                                    {getFieldDecorator('satisFiyati', {
                                        rules: [{
                                            required: true, message: 'Satis fiyatini girin!'
                                        }],
                                    })(
                                        <InputNumber min={0} formatter={value => `${value}₺`} />
                                    )}
                                </FormItem>
                                <FormItem label="Satis Fiyati"
                                    style={{ display: 'flex' }}
                                >
                                    {getFieldDecorator('Adet', {
                                        rules: [{
                                            required: true, message: 'Adeti girin!'
                                        }],
                                    })(
                                        <InputNumber min={0} />
                                    )}
                                </FormItem>
                            </div>
                        }
                    </Form>

                </Modal>
                <Modal
                title='Duzenle'
                visible={this.state.editVisible}
                onCancel={this.handleEditCancel}
                />
            </div>

        );
    }
}
function mapStateToProps({stockReducer}) {
    const {stocks} = stockReducer;
	return {
        stocks
    }
}

const ConnectedPage = connect (mapStateToProps,{retrieveStocks,createStock,editStock})(StockPage);
const WrappedPage = Form.create()(ConnectedPage);
export { WrappedPage as StockPage }
