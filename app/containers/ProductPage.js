import React, { Component } from 'react';
type Props = {};
import { Table, Button, Icon, Modal, Form, Input, InputNumber } from 'antd'
const Search = Input.Search;
const FormItem = Form.Item;
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import {retrieveProducts,createProduct} from '../actions/ProductActions'
import moment from 'moment'
class ProductPage extends Component<Props> {
    props: Props
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            // continue: false,
            // barkod: '',
            // editVisible:false,
        }
    }
    componentDidMount(){
        this.props.retrieveProducts();
    }
    handleOk = () => {
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                const dataToSend = {
                    barcode: values.barcode,
                    name: values.name,
                    description: values.description,
                    category: values.category,
                    purchasePrice: values.purchasePrice,
                    salePrice: values.salePrice
                }
                console.log('data', dataToSend)
                this.props.createProduct(dataToSend);
                setTimeout(() => {
                    this.setState({
                        visible: false
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

    render() {
        const columns = [{
            title: 'Barkod',
            dataIndex: 'barcode',
            key: 'barcode',
        }, {
            title: 'Isim',
            dataIndex: 'name',
            key: 'name',
        }, {
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
        },
        {
            title: 'Kategori',
            dataIndex: 'category',
            key: 'category',
        },
        {
            title: 'Alis Fiyati',
            dataIndex: 'purchasePrice',
            key: 'purchasePrice',
        },
        {
            title: 'Satis Fiyati',
            dataIndex: 'salePrice',
            key: 'salePrice',
        },
        {
            title: 'Giris Tarihi',
            dataIndex: 'registerDate',
            key: 'registerDate',
            render: (text) => <div>{moment.unix(text).format('DD/MM/YYYY')}</div>
        },
        {
            title: 'Duzenle',
            render:() => <Button onClick={this.handleEdit} style={{border:'0', background:'transparent'}}><Icon type="edit" /></Button>
        }]
        const { getFieldDecorator } = this.props.form;        
        return (
            <div>
                <div className='page-header' >
                    <div className='header-h'>Urunler</div>
                    <div style={{ display: 'flex' }}>
                        <Search
                            style={{ height: '32px', marginRight: '10px' }}
                            placeholder="Urun Ara"
                            onSearch={this.handleSearch}
                        />
                        <Button onClick={this.handleModalOpen} >Yeni Urun Girisi<Icon type='plus' /></Button>

                    </div>
                </div>
                <div className='page-body'>
                    <Table dataSource={this.props.products} columns={columns} />
                </div>
                

                <Modal
                    title="Yeni Urun"
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
                            {getFieldDecorator('barcode', {
                                initialValue: this.state.barkod,
                                rules: [{
                                    required: false, message: 'Barkodu girin!'
                                }],
                            })(
                                <Input onChange={this.handleBarcode} />
                            )}
                        </FormItem>
                        <div>
                            <FormItem
                                label="Isim"
                                style={{ display: 'flex' }}
                            >
                                {getFieldDecorator('name', {
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
                                {getFieldDecorator('description', {
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
                                {getFieldDecorator('category', {
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
                                {getFieldDecorator('purchasePrice', {
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
                                {getFieldDecorator('salePrice', {
                                    rules: [{
                                        required: true, message: 'Satis fiyatini girin!'
                                    }],
                                })(
                                    <InputNumber min={0} formatter={value => `${value}₺`} />
                                )}
                            </FormItem>
                        </div>
                        
                    </Form>

                </Modal>
            </div>
        );
    }
}
function mapStateToProps({productReducer}) {
    const {products} = productReducer;
	return {
        products
    }
}

const ConnectedPage = connect (mapStateToProps,{retrieveProducts,createProduct})(ProductPage);
const WrappedPage = Form.create()(ConnectedPage);
export { WrappedPage as ProductPage }