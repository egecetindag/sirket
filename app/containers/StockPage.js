import React, { Component } from 'react';
type Props = {};
import { Table, Button, Icon, Modal, Select, Form,Menu, Input, InputNumber,Checkbox,Switch, Popconfirm ,Dropdown} from 'antd'
const Search = Input.Search;
const FormItem = Form.Item;
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { retrieveStocks, retrieveStockByBarcode, createStock, updateStock, deleteStock,setFavoriteProduct } from '../actions/StockActions';
import { retrieveDealers } from '../actions/DealerActions';
import { retrieveProducts } from '../actions/ProductActions'
import style from '../assets/styles/stock.css'

import moment from 'moment'
class StockPage extends Component<Props> {
  props: Props
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      continue: false,
      editVisible: false,
      type: 'edit',
      selected: { product: {} },
      name: '',
      product: { name: '' }
    }
  }
  componentDidMount() {
    this.props.retrieveStocks(this.state.name);
    this.props.retrieveProducts('');
    this.props.retrieveDealers('');

  }
  componentDidUpdate(oldProps) {
    if (!oldProps.getProductsSuccess && this.props.getProductsSuccess) {
      this.setState({
        product: this.props.products[0]
      })
    }
  }
  handleOk = () => {
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        const dataToSend = {
          productId: this.state.product.id,
          qty: values.adet,
          dealerId: parseInt(values.dealer),
          isFavorite: values.favorite,
        }
        // console.log('data', dataToSend)
        if (this.state.type === 'create') {
          this.props.createStock(dataToSend, this.state.name);
        }
        if (this.state.type === 'edit') {
          dataToSend.id = this.state.selected.id;
          this.props.updateStock(dataToSend, this.state.name);
        }
        // this.props.createStock(dataToSend);
        setTimeout(() => {
          this.setState({
            visible: false,
            continue: false
          })
        }, 10);
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
  handleSearch = (value) => {
    this.props.retrieveStocks({name:value});
  }
  onSearchChange = (e) => {
    this.setState({
      name: e.target.value
    })
    this.handleSearch(e.target.value);
  }
  handleDelete = () => {
    this.props.deleteStock(this.state.selected.id, this.state.name)
  }
  handleCancel = () => {
    this.props.form.resetFields();
    this.setState({
      visible: false,
      continue: false
      
    })

    this.props.form.resetFields()
  }
  handleModalOpen = (type) => {
    console.log(this.state.selected);
    if (type === 'edit') {
      this.setState({
        visible: true,
        continue: true,
        type,
      });
    } else {
      this.setState({
        visible: true,
        type,
      });
    }

  };
    // search = () => {
    //
    // }
  handleWithoutBarcode = () => {
    this.setState({
      continue: true
    })
  }
  handleSelect = (e, a) => {
    this.setState({
      continue: true,
      product: a.props.a
    })

  }

  onCheckboxChance = (value,productId) => {

    this.props.setFavoriteProduct(productId,value.target.checked,this.state.name);

  };

  render() {

    const menu = (
      <Menu>
        <Menu.Item>
          <Button onClick={() => this.handleModalOpen('edit')} style={{ border: '0', background: 'transparent' }}><Icon type="star" />Favori</Button>
        </Menu.Item>
        <Menu.Item>
          <Button onClick={() => this.handleModalOpen('edit')} style={{ border: '0', background: 'transparent' }}><Icon type="edit" />Düzenle</Button>
        </Menu.Item>
        <Menu.Item>
          <Popconfirm placement="topLeft" title={'Silmek istediginizden emin misiniz?'} onConfirm={this.handleDelete} okText="Yes" cancelText="No"><Button style={{ border: '0', background: 'transparent' }}><Icon type="delete" />Sil</Button></Popconfirm>
        </Menu.Item>
      </Menu>
    );

    const columns = [
    //   {
    //   title: <div><Icon type="star" theme="outlined" style={{fontSize:'1.2em'}}/> Favori</div>,
    //   dataIndex: 'isFavorite',
    //   key: 'favorite',
    //   render: (text,record) => <div> {text} <Switch checked={text} onChange={(value)=>this.onCheckboxChance(value,record.product.id)} /></div>
    // },
      {
      title: <div><Icon type="barcode" theme="outlined" style={{fontSize:'1.3em'}}/> Barkod</div>,
      dataIndex: 'product.barcode',
      key: 'barcode',
    }, {
      title: <div><Icon type="profile" theme="outlined" style={{fontSize:'1.3em'}}/> Isim</div>,
      dataIndex: 'product.name',
      key: 'name',
    },
    {
      title: <div><Icon type="appstore" theme="outlined" style={{fontSize:'1.3em'}}/> Kategori</div>,
      dataIndex: 'product.category',
      key: 'kategori',
    },
      {
        title: <div><Icon type="calculator" theme="outlined" style={{fontSize:'1.3em'}}/> Adet </div>,
        dataIndex: 'qty',
        key: 'qty',
      },
    {
      title: <div><Icon type="dollar" theme="outlined" style={{fontSize:'1.2em'}}/> Alis Fiyati</div>,
      dataIndex: 'product.purchasePrice',
      key: 'purchasePrice',
    },
    {
      title: <div><Icon type="dollar" theme="outlined" style={{fontSize:'1.3em'}}/> Satis Fiyati</div>,
      dataIndex: 'product.salePrice',
      key: 'salePrice',
    },
      {
        title: <div><Icon type="user" theme="outlined" style={{fontSize:'1.3em'}}/> Tedarikci</div>,
        dataIndex: 'dealerName',
        key: 'dealerName',
      },
    {
      title: <div><Icon type="calendar" theme="outlined" style={{fontSize:'1.3em'}}/> Giris Tarihi</div>,
      dataIndex: 'creationDate',
      key: 'creationDate',
      render: (text) => <div>{moment.unix(text).format('DD/MM/YYYY')}</div>
    },
    //   {
    //     title: <div><Icon type="idcard" theme="outlined" style={{fontSize:'1.2em'}}/> Kaydeden</div>,
    //   dataIndex: 'userName',
    //   key: 'userName',
    // },
      {
      title: 'Actions',
      render: () => <Dropdown overlay={menu} trigger={['click']}>
        <Icon type="ellipsis" style={{ fontSize: '21px' }} />
      </Dropdown>
      },
    // },{
    //   title: 'Duzenle',
    //   render: () => <Button onClick={() => this.handleModalOpen('edit')} style={{ border: '0', background: 'transparent' }}><Icon type="edit" /></Button>
    // },
    // {
    //   title: 'Sil',
    //   render: () => <Popconfirm placement="topLeft" title={'Silmek istediginizden emin misiniz?'} onConfirm={this.handleDelete} okText="Yes" cancelText="No"><Button style={{ border: '0', background: 'transparent' }}><Icon type="delete" /></Button></Popconfirm>
    // },

    ];
    const { getFieldDecorator } = this.props.form;
    const { selected, type, product } = this.state;
    return (
      <div>
        <div className='page-header' >
          <div className='header-h'>Stok</div>
          <div style={{ display: 'flex' }}>
            <Search
              style={{ height: '32px', marginRight: '10px' }}
              placeholder="Stok Ara"
              onSearch={this.handleSearch}
              onChange={this.onSearchChange}
            />
            <Button onClick={() => this.handleModalOpen('create')}>Yeni Stok Girisi<Icon type='plus' /></Button>

          </div>
        </div>
        <div className='page-body'>
          <Table
            dataSource={this.props.stocks}
            columns={columns}
            rowKey={(record) => {
              return record.id + 1;
            }}
            onRow={(record) => {
              return {
                onClick: () => this.setState({ selected: record })
              }
            }}
            pagination={{ pageSize: 8 }}
          />
        </div>


        <Modal
          title={this.state.type === 'edit' ? 'Stok Girdisi Duzenle' : 'Yeni Giriş'}
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
                initialValue: type === 'edit' ? selected.product.barcode : 'Barkodu taratin veya arama yapin',
                rules: [{
                  required: false, message: 'Bir urun secin!'
                }],
              })(
                <Select
                  style={{ width: '300px' }}
                  onSelect={this.handleSelect}
                  optionLabelProp='id'
                  showSearch
                  filterOption={(input, option) => (option.props.children + option.props.id).toLowerCase().indexOf(input.toLowerCase()) >= 0}
                >{this.props.products.map(p => <Option key={p.id} a={p} id={p.barcode}>{p.name}</Option>)}</Select>
              )}
              {/* <Button style={{ border: '0', fontSize: '0.8em' }} onClick={this.handleWithoutBarcode}>Barkodsuz devam et</Button> */}

            </FormItem>

            {this.state.continue &&
              <div>
                <FormItem
                  label="Tedarikci"
                  style={{ display: 'flex' }}
                >
                  {getFieldDecorator('dealer', {
                    initialValue: type === 'edit' ? selected.dealerId : 'Tedarikci seciniz',
                    rules: [{
                      required: false
                    }],
                  })(
                    <Select style={{ width: '300px' }}
                      showSearch
                      filterOption={(input, option) => (option.props.children).toLowerCase().indexOf(input.toLowerCase()) >= 0}
                    >{this.props.dealers.map(p => <Option key={p.id}>{p.name}</Option>)}</Select>
                  )}
                </FormItem>
                <FormItem
                  label="Isim"
                  style={{ display: 'flex' }}
                >
                  {getFieldDecorator('isim', {
                    initialValue: type === 'edit' ? selected.product.name : product.name,
                    rules: [{
                      required: true, message: 'Isim girin!'
                    }],
                  })(
                    <Input disabled={type === 'edit'} />
                  )}

                </FormItem>
                <FormItem
                  label="Aciklama"
                  style={{ display: 'flex' }}
                >
                  {getFieldDecorator('aciklama', {
                    initialValue: type === 'edit' ? selected.product.description : product.description,
                    rules: [{
                      required: false
                    }],
                  })(
                    <Input disabled={type === 'edit'} />
                  )}
                </FormItem>
                <FormItem
                  label="Kategori"
                  style={{ display: 'flex' }}
                >
                  {getFieldDecorator('kategori', {
                    initialValue: type === 'edit' ? selected.product.category : product.category,
                    rules: [{
                      required: false
                    }],
                  })(
                    <Input disabled={type === 'edit'} />
                  )}
                </FormItem>

                <FormItem
                  label="Kaydeden"
                  style={{ display: 'flex' }}
                >
                  {getFieldDecorator('kaydeden', {
                    initialValue: type === 'edit' ? selected.userName : 'Kullanıcı Adı!',
                    rules: [{
                      required: false, message: 'Kayıt Yapan Kullanıcı!'
                    }],
                  })(
                    <Input disabled={true} />
                  )}

                </FormItem>

                <FormItem
                  label="Alis Fiyati"
                  style={{ display: 'flex' }}
                >
                  {getFieldDecorator('alisFiyati', {
                    initialValue: type === 'edit' ? selected.product.purchasePrice : product.purchasePrice,
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
                    initialValue: type === 'edit' ? selected.product.salePrice : product.salePrice,
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
                  {getFieldDecorator('adet', {
                    initialValue: type === 'edit' ? selected.qty : '',
                    rules: [{
                      required: true, message: 'Adeti girin!'
                    }],
                  })(
                    <InputNumber min={0} />
                  )}
                </FormItem>
                <FormItem
                  label="Favori"
                  style={{ display: 'flex' }}
                >
                  {getFieldDecorator('favorite', {
                    initialValue: type === 'edit' ? selected.isFavorite : false,
                    rules: [{
                      required: false, message: 'Favori!'
                    }],
                  })(
                    <Switch checked={selected.isFavorite} />
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
function mapStateToProps({ stockReducer, productReducer, dealerReducer }) {
  const { stocks } = stockReducer;
  const { getProductsSuccess, products } = productReducer;
  const { dealers } = dealerReducer;
  return {
    stocks,
    products,
    dealers
  }
}

const ConnectedPage = connect(mapStateToProps, { retrieveStocks, retrieveProducts,setFavoriteProduct, retrieveDealers, retrieveStockByBarcode, createStock, updateStock, deleteStock })(StockPage);
const WrappedPage = Form.create()(ConnectedPage);
export { WrappedPage as StockPage }
