import React, { Component } from 'react';
type Props = {};
import { Table, Button, Icon, Modal, Select, Form,Menu, Input, InputNumber,Checkbox,Switch, Popconfirm ,Dropdown,Pagination} from 'antd'
const Search = Input.Search;
const FormItem = Form.Item;
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { retrieveStocks, retrieveStockByBarcode, createStock, updateStock, deleteStock,setFavoriteProduct } from '../actions/StockActions';
import { retrieveDealers } from '../actions/DealerActions';
import { retrieveProducts } from '../actions/ProductActions'
import style from '../assets/styles/stock.css'
import {lang} from '../services/config'

const MenuItem = Menu.Item;

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
        console.log(this.state.selected)
        const dataToSend = {
          productId: this.state.selected.product.id,
          qty: values.adet,
          dealerId: parseInt(values.dealer),
          isFavorite: values.favorite,
        }
        // console.log('data', dataToSend)
        if (this.state.type === 'create') {
          console.log(this.state.product)
          dataToSend.productId = this.state.product.id
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

  onShowSizeChange = (current, pageSize) => {
    console.log(current, pageSize);
  }

  onChangeSwitch = (values) =>{
    console.log("on change:",values);
    // this.selected.isFavorite = values
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

  handleSetFavorite = () => {

    console.log(this.state.selected)
    this.props.setFavoriteProduct(this.state.selected.product.id,!this.state.selected.isFavorite)

  }

  render() {

    const menu = (
      <Menu>
        <MenuItem>
          <Button onClick={() => this.handleSetFavorite()} style={{ border: '0', background: 'transparent' }}><Icon type="star" 
          theme={this.state.selected ? (this.state.selected.isFavorite ? "filled" : "outlined") : "outlined"}/>{lang.favorite}</Button>
        </MenuItem>
        <MenuItem>
          <Button onClick={() => this.handleModalOpen('edit')} style={{ border: '0', background: 'transparent' }}><Icon type="edit" />{lang.edit}</Button>
        </MenuItem>
        <MenuItem>
          <Popconfirm placement="topLeft" title={lang.areUSureToRemoveItem} onConfirm={this.handleDelete} okText="Yes" cancelText="No"><Button style={{ border: '0', background: 'transparent' }}><Icon type="delete" />{lang.delete}</Button></Popconfirm>
        </MenuItem>
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
      title: <div><Icon type="barcode" theme="outlined" style={{fontSize:'1.3em'}}/> {lang.barcode}</div>,
      dataIndex: 'product.barcode',
      key: 'barcode',
    }, {
      title: <div><Icon type="profile" theme="outlined" style={{fontSize:'1.3em'}}/> {lang.name}</div>,
      dataIndex: 'product.name',
      key: 'name',
    },
    {
      title: <div><Icon type="appstore" theme="outlined" style={{fontSize:'1.3em'}}/> {lang.category}</div>,
      dataIndex: 'product.category',
      key: 'kategori',
    },
      {
        title: <div><Icon type="calculator" theme="outlined" style={{fontSize:'1.3em'}}/> {lang.qty} </div>,
        dataIndex: 'qty',
        key: 'qty',
      },
    {
      title: <div><Icon type="dollar" theme="outlined" style={{fontSize:'1.2em'}}/> {lang.buyingPrice}</div>,
      dataIndex: 'product.purchasePrice',
      key: 'purchasePrice',
    },
    {
      title: <div><Icon type="dollar" theme="outlined" style={{fontSize:'1.3em'}}/> {lang.salePrice}</div>,
      dataIndex: 'product.salePrice',
      key: 'salePrice',
    },
      // {
      //   title: <div><Icon type="user" theme="outlined" style={{fontSize:'1.3em'}}/> Tedarikci</div>,
      //   dataIndex: 'dealerName',
      //   key: 'dealerName',
      // },
    {
      title: <div><Icon type="calendar" theme="outlined" style={{fontSize:'1.3em'}}/> {lang.registerDate}</div>,
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
      title: lang.actions,
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
          <div className='header-h'>{lang.stock}</div>
          <div style={{ display: 'flex' }}>
            <Search
              style={{ height: '32px', marginRight: '10px' }}
              placeholder={lang.searchInStock}
              onSearch={this.handleSearch}
              onChange={this.onSearchChange}
            />
            <Button onClick={() => this.handleModalOpen('create')}>{lang.newStockEntry}<Icon type='plus' /></Button>

          </div>
        </div>
        <div className='page-body' >
          
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
            pagination={{showSizeChanger: true, 
                          pageSizeOptions: ["6","8","10","15","20"], 
                          hideOnSinglePage: true,
                          defaultPageSize: 8

                        }}
                      
          />
          
        </div>


        <Modal
          title={this.state.type === 'edit' ? lang.updateStockEntry : lang.newStockEntry}
          visible={this.state.visible}
          onCancel={this.handleCancel}
          footer={[
            <Button onClick={this.handleCancel}>{lang.cancel}</Button>,
            <Button type="primary" onClick={this.handleOk}>
              {lang.save}
                </Button>,
          ]}
        >
          <Form className='stock-form'>
            <FormItem
              label={lang.barcode}
              style={{ display: 'flex' }}
            >
              {getFieldDecorator('barkod', {
                initialValue: type === 'edit' ? selected.product.barcode : lang.scanBarcodeOrSearch,
                rules: [{
                  required: false, message: lang.chooseProduct
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
              {/* <Button style={{ border: '0', fontSize: '0.8em' }} onClick={this.handleWithoutBarcode}>{lang.continueWithoutBarcode}</Button> */}

            </FormItem>

            {this.state.continue &&
              <div>
                <FormItem
                  label="Tedarikci"
                  style={{ display: 'flex' }}
                >
                  {getFieldDecorator('dealer', {
                    initialValue: type === 'edit' ? selected.dealerName : lang.selectDealer,
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
                  label={lang.name}
                  style={{ display: 'flex' }}
                >
                  {getFieldDecorator('isim', {
                    initialValue: type === 'edit' ? selected.product.name : product.name,
                    rules: [{
                      required: true, message: lang.typeName
                    }],
                  })(
                    <Input disabled={true} />
                  )}

                </FormItem>
                <FormItem
                  label={lang.description}
                  style={{ display: 'flex' }}
                >
                  {getFieldDecorator('aciklama', {
                    initialValue: type === 'edit' ? selected.product.description : product.description,
                    rules: [{
                      required: false
                    }],
                  })(
                    //{/* <Input disabled={type === 'edit'} /> */}
                    <Input disabled={true} />
                  )}
                </FormItem>
                <FormItem
                  label={lang.category}
                  style={{ display: 'flex' }}
                >
                  {getFieldDecorator('kategori', {
                    initialValue: type === 'edit' ? selected.product.category : product.category,
                    rules: [{
                      required: false
                    }],
                  })(
                    <Input disabled={true} />
                  )}
                </FormItem>

                <FormItem
                  label={lang.registrar}
                  style={{ display: 'flex' }}
                >
                  {getFieldDecorator('kaydeden', {
                    initialValue: type === 'edit' ? selected.userName : lang.username,
                    rules: [{
                      required: false, message: lang.typeRegistrar
                    }],
                  })(
                    <Input disabled={true} />
                  )}

                </FormItem>

                <FormItem
                  label={lang.buyingPrice}
                  style={{ display: 'flex' }}
                >
                  {getFieldDecorator('alisFiyati', {
                    initialValue: type === 'edit' ? selected.product.purchasePrice : product.purchasePrice,
                    rules: [{
                      required: true, message: lang.typeBuyingPrice
                    }],
                  })(
                    <InputNumber min={0} formatter={value => `${value + lang.currency}`} disabled={true}/>
                  )}
                </FormItem>
                <FormItem
                  label={lang.salePrice}
                  style={{ display: 'flex' }}
                >
                  {getFieldDecorator('satisFiyati', {
                    initialValue: type === 'edit' ? selected.product.salePrice : product.salePrice,
                    rules: [{
                      required: true, message: lang.typeSalePrice
                    }],
                  })(
                    <InputNumber min={0} formatter={value => `${value + lang.currency}`} disabled={true}/>
                  )}
                </FormItem>
                <FormItem
                  label={lang.qty}
                  style={{ display: 'flex' }}
                >
                  {getFieldDecorator('adet', {
                    initialValue: type === 'edit' ? selected.qty : '',
                    rules: [{
                      required: true, message: lang.typeQty
                    }],
                  })(
                    <InputNumber min={0} />
                  )}
                </FormItem>
                <FormItem
                  label={lang.favorite}
                  style={{ display: 'flex' }}
                >
                  {getFieldDecorator('favorite', {
                    initialValue: type === 'edit' ? selected.isFavorite : false,
                    rules: [{
                      required: false, message: lang.favorite
                    }],
                  })(
                    <Switch defaultChecked={selected.isFavorite} onChange={this.onChangeSwitch} />
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
