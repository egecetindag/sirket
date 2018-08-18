import React, { Component } from 'react';
type Props = {};
import { Table, Button, Icon, Modal, Form, Input, InputNumber,Popconfirm } from 'antd'
const Search = Input.Search;
const FormItem = Form.Item;
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import {retrieveStocks,retrieveStockByBarcode,createStock,updateStock,deleteStock} from '../actions/StockActions'
import style from '../assets/styles/stock.css'

// TODO: update çalışmıyor modal'ın içi boş
//       create için barkode'u yazdıktan sonra diğer alanlar otomatik dolacak
//       retrieveStocks backendinde nil for int hatası aldım.

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
            type:'edit',
            selected: {},
            name: ''
        }
    }
    componentDidMount(){
        this.props.retrieveStocks(this.state.name);
    }
    handleOk = () => {
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                const dataToSend = {
                    productId: values.productId,
                    qty: values.qty,
                    dealerId: values.dealerId
                }
                // console.log('data', dataToSend)
                if(this.state.type === 'create'){
                  this.props.createStock(dataToSend, this.state.name);
                }
                if(this.state.type === 'edit'){
                  dataToSend.id =this.state.selected.id;
                  this.props.updateStock(dataToSend, this.state.name);
                }
                // this.props.createStock(dataToSend);
                setTimeout(() => {
                    this.setState({
                        visible: false
                    })
                }, 1000);
                this.props.form.resetFields()
            }
        });
    }
    // handleEdit = () => {
    //     this.props.form.validateFieldsAndScroll((err, values) => {
    //         if (!err) {
    //             const dataToSend = {
    //                 id: values.id,
    //                 productId: values.productId,
    //                 qty: values.qty,
    //                 dealerId: values.dealerId
    //             }
    //             this.props.editStock(dataToSend);
    //             setTimeout(() => {
    //                 this.setState({
    //                     visible: true
    //                 })
    //             }, 1000);
    //         }
    //     });
    // }
    handleSearch =(value) =>{
      this.props.retrieveStocks(value);
    }
    onSearchChange = (e) =>{
      this.setState({
        name: e.target.value
      })
      this.handleSearch(e.target.value);
    }
    handleDelete = () =>{
      this.props.deleteStock(this.state.selected.id, this.state.name)
    }
    handleCancel = () => {
        this.props.form.resetFields();
        this.setState({
            visible: false,
        })
    }
    handleModalOpen = (type) => {
      console.log(this.state.selected);
      if (type === 'edit'){
        this.setState({
          visible: true,
          continue: true,
          type,
        });
      }else {
        this.setState({
          visible: true,
          type,
        });
      }

     };
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
            render:() => <Button onClick={()=>this.handleModalOpen('edit')} style={{border:'0', background:'transparent'}}><Icon type="edit" /></Button>
        },
          {
            title: 'Sil',
            render:() =><Popconfirm placement="topLeft" title={'Silmek istediginizden emin misiniz?'} onConfirm={this.handleDelete} okText="Yes" cancelText="No"><Button style={{border:'0', background:'transparent'}}><Icon type="delete" /></Button></Popconfirm>
          },
        
        ];
        const { getFieldDecorator } = this.props.form;
        const {selected,type} = this.state ;
        console.log(selected);
        return (
          <div>
            <div className='page-header' >
              <div className='header-h'>Stok</div>
              <div style={{ display: 'flex' }}>
                <Search
                  style={{height:'32px', marginRight:'10px'}}
                  placeholder="Stok Ara"
                  onSearch={this.handleSearch}
                  onChange={this.onSearchChange}
                />
                <Button onClick={()=>this.handleModalOpen('create')}>Yeni Stok Girisi<Icon type='plus' /></Button>

              </div>
            </div>
            <div className='page-body'>
              <Table
                dataSource={this.props.stocks}
                columns={columns}
                rowKey={(record) => {
                  return record.id+1;
                }}
                onRow={(record) => {
                  return {
                    onClick: () => this.setState({selected: record})
                  }
                }}
                pagination={{ pageSize: 6 }}
              />
            </div>


            <Modal
              title={this.state.type === 'edit' ? 'Stok Girdisi Duzenle': 'Yeni Giriş'}
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
                                initialValue: type === 'edit' ? selected.barcode : this.state.barkod,
                                rules: [{
                                    required: false, message: 'Barkodu girin!'
                                }],
                            })(
                              <Input onChange={this.handleBarcode} />
                            )}
                  <Button style={{border: '0',fontSize:'0.8em' }} onClick={this.handleWithoutBarcode}>Barkodsuz devam et</Button>

                </FormItem>
                {this.state.continue &&
                <div>
                  <FormItem
                    label="Isim"
                    style={{ display: 'flex' }}
                  >
                    {getFieldDecorator('isim', {
                                        initialValue: type === 'edit' ? selected.name : '',
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
                                        initialValue: type === 'edit' ? selected.description : '',
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
                                        initialValue: type === 'edit' ? selected.category : '',
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
                                        initialValue: type === 'edit' ? selected.purchasePrice : '',
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
                                        initialValue: type === 'edit' ? selected.salePrice : '',
                                        rules: [{
                                            required: true, message: 'Satis fiyatini girin!'
                                        }],
                                    })(
                                      <InputNumber min={0} formatter={value => `${value}₺`} />
                                    )}
                  </FormItem>
                  <FormItem
                    label="Adet"
                    style={{ display: 'flex' }}
                  >
                    {getFieldDecorator('Adet', {
                                        initialValue: type === 'edit' ? selected.qty : '',
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

const ConnectedPage = connect (mapStateToProps,{retrieveStocks,retrieveStockByBarcode,createStock,updateStock, deleteStock})(StockPage);
const WrappedPage = Form.create()(ConnectedPage);
export { WrappedPage as StockPage }
