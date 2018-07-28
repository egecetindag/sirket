import React, { Component } from 'react';
type Props = {};
import { Table, Button, Icon, Modal, Form, Input, InputNumber } from 'antd'
import { Link } from 'react-router-dom';
import '../assets/styles/stock.css'
const Search = Input.Search;
const FormItem = Form.Item;

const dataSource = [{ name: 'ege', age: 11, address: 'snne' }]
class StockPage extends Component<Props> {
    props: Props
    constructor(props) {
        true
        super(props);
        this.state = {
            visible: false,
            continue: false,
            barkod: '',
            editVisible:false,
        }
    }
    handleEdit = () =>{
         this.setState({
             editVisible:true
         })
    }
    handleOk = () => {
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                setTimeout(() => {
                    this.setState({
                        visible: false
                    })
                }, 1000);
            }
        });

    }
    handleModalOpen = () => {
        this.setState({
            visible: true,
            continue: false,
            barkod: ''
        })
    }
    handleCancel = () => {
        this.props.form.resetFields();
        this.setState({
            visible: false,
            continue: false,
            barkod: ''
        })
    }
    // handleContinue =() =>{
    //     this.props.form.validateFieldsAndScroll((err, values) => {
    //             console.log(values.barkd)
    //             if(values.barkod){
    //                 this.setState({
    //                     continue:true
    //                 })
    //             }
    //     })

    // }
    handleSearch = () =>{
        console.log('selam')
    }
    handleWithoutBarcode = () =>{
        this.setState({
            continue: true
        })
    }
    handleEditCancel =() =>{
        this.setState({
            editVisible:false
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
        dataIndex: 'kategori',
        key: 'kategori',
    },
    {
        title: 'Alis Fiyati',
        dataIndex: 'purchase_price',
        key: 'purchase_price',
    },
    {
        title: 'Satis Fiyati',
        dataIndex: 'sale_price',
        key: 'sale_price',
    },
    {
        title: 'Giris Tarihi',
        dataIndex: 'date',
        key: 'date',
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
                    <Table dataSource={dataSource} columns={columns} />
                </div>
                <Modal
                    title="Yeni Urun"
                    visible={this.state.visible}
                    onCancel={this.handleCancel}
                    footer={[
                        <Button onClick={this.handleCancel}>Iptal</Button>,
                        <Button type="primary" disabled={!this.state.continue} onClick={this.handleOk}>
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
                        {/* {!this.state.continue &&
                        // <div style={{textAlign:'center'}}><Button onClick={this.handleContinue}type='primary' >Devam Et</Button></div>
                        } */}
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
const WrappedStockPage = Form.create()(StockPage);
export { WrappedStockPage as StockPage }