import React, { Component } from 'react';
import {lang} from '../services/config'
type Props = {};
import { List, Icon, Avatar, Button, Input, Table, Row, Col, Breadcrumb,Card, Dropdown, Menu, Select, Modal, message,DatePicker,Form,InputNumber } from 'antd'
import { Link } from 'react-router-dom';
import { connect, Switch, Route } from 'react-redux';
import { ProductPage } from './ProductPage'
import { history } from '../store/configureStore'
import '../assets/styles/sale.css';
import { Icons } from '../assets/Icons';
import {finishSale} from '../actions/SaleActions';
import { retrieveStockByBarcode, retrieveStocks, retrieveStocksCategories } from '../actions/StockActions'
import ProductReducer from '../reducers/ProductReducer';
import { CustomImage } from '../assets/ProductPhotos/CustomImage';
import {retrieveClients} from '../actions/ClientActions';
import {createReceiving} from '../actions/ReceivingActions';

import moment from 'moment'
var Mousetrap = require('mousetrap');

const FormItem = Form.Item;

const Search = Input.Search;
const Option = Select.Option
const confirm = Modal.confirm;
const data = [{ name: 'slm' }, { name: 'ben' }, { name: 'ege' }]

const BreadCrumbItem = Breadcrumb.Item;

class SalePage extends Component<Props> {
    props: Props
    constructor(props) {
        super(props);
        this.state = {
            products: [],
            quantities: {},
            visible: false,
            stocks: [],
            categories: [],
            category: undefined,
            selectedButton: 1,
            startedWriting: true,
            selectedRow: undefined,
            OcVisible:false,
            showPriceVisible : false,
            singleProductPrice : 0,
        }
    }
    numberSelected = (number) => {
        switch (number) {
            case 1:
            case 2:
            case 3:
            case 4:
            case 5:
            case 6:
            case 7:
            case 8:
            case 9:
            case 0:
                if (this.state.selectedRow !== undefined) {
                    const key = this.state.products[this.state.selectedRow].id;
                    if (this.state.startedWriting) {
                        this.setState({
                            quantities: { ...this.state.quantities, [key]: number },
                            startedWriting: false
                        })
                    }
                    else {
                        this.setState({
                            quantities: { ...this.state.quantities, [key]: this.state.quantities[key] * 10 + number },
                            startedWriting: false
                        })
                    }
                }
                break;
            case '+':
                if (this.state.selectedRow !== undefined) {
                    const key = this.state.products[this.state.selectedRow].id;
                    this.setState({
                        quantities: { ...this.state.quantities, [key]: this.state.quantities[key] + 1 },
                    })
                }
                break;
            case '-':
                if (this.state.selectedRow !== undefined) {
                    const key = this.state.products[this.state.selectedRow].id;
                    this.setState({
                        quantities: { ...this.state.quantities, [key]: this.state.quantities[key] - 1 },
                    })
                }
                break;


        }
    }
    showDeleteConfirm = () => {
        let e = this;
        confirm({
            title: lang.areUSureToRemoveItem,
            okText: lang.yes,
            okType: 'danger',
            cancelText: lang.no,
            onOk() {
                e.setState({
                    selectedRow: e.state.products.length - 2,
                    quantities: Object.assign({}, delete e.state.quantities[e.state.products[e.state.selectedRow].id], e.state.quantities),
                    products: e.state.products.filter((product, key) => key !== e.state.selectedRow)
                })
            },
            onCancel() {
            },
        });
    }
    emptyBasketConfirm = () => {
        if(this.state.products.length > 0){
        let e = this;
        confirm({
            title: lang.areUSureToEmpty,
            okText: lang.yes,
            okType: 'danger',
            cancelText: lang.no,
            onOk() {
                e.setState({
                    products: [],
                    quantities: {},
                    startedWriting: true,
                    selectedRow: undefined,
                })
            },
            onCancel() {
            },
        });
    }
    else{
        message.warn(lang.yourBasketIsEmpty);
    }
    }
    finishSale = () => {
        if(this.state.products.length > 0){
        let e = this;
        confirm({
            title: 'Satisi bitirmek istediginizden emin misiniz?',
            okText: lang.yes,
            cancelText: lang.no,
            onOk() {
                //function buraya 
                let basket = {};
                let basketProducts =[];
                e.state.products.map(product =>{
                    let a = {};
                    a.id = product.product.id;
                    a.qty = e.state.quantities[product.id];
                    a.discount = 0;
                    basketProducts.push(a);
                })
                basket.itemStr = JSON.stringify(basketProducts);
                basket.totalPrice = e.calculateTotal();
                basket.totalDiscount =0;

                e.props.finishSale(basket);
                e.setState({
                    products: [],
                    quantities: {},
                    startedWriting: true,
                    selectedRow: undefined,
                })
            },
            onCancel() {
            },
        });
    }
    else{
        message.warn(lang.yourBasketIsEmpty);
    }
    }


    componentDidMount() {
        this.props.retrieveStocks({isFavorite:true});  // default olarak favorileri donder
        this.props.retrieveStocksCategories();
        this.props.retrieveClients('')
    }
    handleSearch = (e) => {

      console.log("search: ")

      this.props.retrieveStockByBarcode(e);
        // if (e.length === 12) {
        //     this.props.retrieveStockByBarcode(e);
        // }

      console.log(this.products)
    }

    handleSearchProducts = (e) => {
        let a = this.props.stocks.slice()
        a = a.filter(i => i.product.name.toLowerCase().indexOf(e.target.value.toLowerCase()) >= 0);
        this.setState({
            stocks: a
        })
    }

    calculateTotal = (e) => {
        let total = 0;
        this.state.products.map(product =>
            total = total + product.product.salePrice * this.state.quantities[product.id]
        )
        return total;
    }
    handleRightItemClick = (index) => {
        let arr = this.state.products.slice();
        const id = this.state.stocks[index].id
        if (!this.state.quantities[id]) {
            arr.push(this.state.stocks[index]);
        }
        this.setState({
            products: arr,
            startedWriting: true,
            selectedRow: this.state.quantities[id] ? this.state.selectedRow : arr.length - 1,
            quantities: { ...this.state.quantities, [id]: this.state.quantities[id] ? this.state.quantities[id] + 1 : 1 },
        })

    }
    componentDidUpdate(oldProps) {
        if (!oldProps.stockCategoriesSuccess && this.props.stockCategoriesSuccess) {
            this.setState({
                categories: this.props.stockCategories
            })
        }
        if (this.props.location.pathname !== oldProps.location.pathname) {
        }
        if (!oldProps.retrieveStockByBarcodeSuccess && this.props.retrieveStockByBarcodeSuccess && this.props.stockByBarcode) {
            const a = this.state.products.slice();
            const item = this.props.stockByBarcode;
            if (!this.state.quantities[item.id]) {
                a.push(item);
            }
            this.setState({
                products: a,
                quantities: { ...this.state.quantities, [item.id]: this.state.quantities[item.id] ? this.state.quantities[item.id] + 1 : 1 }
            })
        }
        if (!oldProps.retrieveStocksSuccess && this.props.retrieveStocksSuccess) {
            this.setState({
                stocks: this.props.stocks,
            })
        }
    }
    handleVisibleChange = (flag) => {
        this.setState({ visible: flag });
    }
    handleSelect = (e) => {
        if (e !== lang.favorite) {
            this.props.retrieveStocks({ category: e })
            history.push('/sale/' + e);
        }
        else {
            this.props.retrieveStocks({isFavorite:true})
            history.push('/sale');
        }
    }

    handleMenuClick = (e) => {
        if (e.key === '0') {
            this.setState({ visible: true });
        }
        else {
            this.setState({ visible: false });
        }
    }
    selectRow = (e, key) => {
        console.log(key)
        if (this.state.selectedRow === key) {
            this.setState({
                selectedRow: undefined
            })
        }
        else {
            this.setState({
                startedWriting: true,
                selectedRow: key
            })
        }
    }
    delete = () => {
        if (this.state.selectedRow !== undefined) {
            if (this.state.startedWriting) {
                this.showDeleteConfirm();
            }
            else {
                this.setState({
                    quantities: { ...this.state.quantities, [this.state.products[this.state.selectedRow].id]: parseInt(this.state.quantities[this.state.products[this.state.selectedRow].id] / 10) }
                })
            }
        }
        else {
            message.warn(lang.selectProductToRemove)
        }
    }


    handleOcOk = () => {
        this.props.form.validateFieldsAndScroll((err, values) => {
            console.log(values);
            if (!err) {
                
                // var tempProductIds = [];
                // this.state.products.forEach((stockItem,Index) => {
                //     tempProductIds.push(stockItem.product.id)
                // });

                // // console.log(tempProductIds)

                // var finalProductIds = tempProductIds.join(",")

                // console.log(finalProductIds);

                let basket = {};
                let basketProducts =[];
                this.state.products.map(product =>{
                    let a = {};
                    a.id = product.product.id;
                    a.qty = this.state.quantities[product.id];
                    a.discount = 0;
                    basketProducts.push(a);
                })
                basket.itemStr = JSON.stringify(basketProducts);
                basket.totalPrice = this.calculateTotal();
                basket.totalDiscount =0;

                const dataToSend = {
                    personId: parseInt(values.personId),
                    amount: parseFloat(values.amount),
                    expectedDate: parseInt(moment(values.expectedDate).format('X')),
                    status: values.status,
                    productIds: basket.itemStr,
                }

                console.log("dataToSend",dataToSend);


                this.setState({
                    products: [],
                    quantities: {},
                    startedWriting: true,
                    selectedRow: undefined,
                })

                 this.props.createReceiving(dataToSend,'')

                // if(this.state.type === 'create'){
                //     this.props.createPayment(dataToSend, this.state.name);
                // }
                // if(this.state.type === 'edit'){
                //     dataToSend.id =this.state.selected.id;
                //     this.props.updatePayment(dataToSend, this.state.name);
                // }
                setTimeout(() => {
                    this.setState({
                        OcVisible: false
                    })
                }, 1000);
                this.props.form.resetFields()
            }
        });

    }
    handeOcModalOpen = () => {
        this.setState({
             OcVisible: true,
        
        })
        // console.log("products",this.state.products)
    }
    handleOcCancel = () => {
        this.props.form.resetFields();
        this.setState({
            OcVisible: false,
        })
    }

    handeShowPriceModalOpen = () => {
        this.setState({
             showPriceVisible: true,
        
        })
        // console.log("products",this.state.products)
    }
    handleShowPriceCancel = () => {
        this.props.form.resetFields();
        this.setState({
            showPriceVisible: false,
            singleProductPrice: 0
        })
    }
    searchPriceForSingleProduct = () => {
        this.setState({
            singleProductPrice: 10
        })
        console.log(this.state.singleProductPrice)
    }

    render() {

        // # Set shortcuts
        // Mousetrap.bind(['command+k', 'ctrl+k'], function() {
        //     console.log('command k or control k');
 
        //     // return false to prevent default browser behavior
        //     // and stop event from bubbling
        //     return false;
        // });
        // #

        Mousetrap.bind(['f2'], () => {
            console.log('f2');
            //clear
            this.emptyBasketConfirm()
            // return false to prevent default browser behavior
            // and stop event from bubbling
            return false;
        });
        Mousetrap.bind(['f8'], () => {
            console.log('f8');
            this.finishSale()
            // return false to prevent default browser behavior
            // and stop event from bubbling
            return false;
        });
        Mousetrap.bind(['f9'], () => {
            console.log('f9');
            this.handeOcModalOpen()
            // return false to prevent default browser behavior
            // and stop event from bubbling
            return false;
        });
        Mousetrap.bind(['f10'], () => {
            console.log('f10');
 
            this.handeShowPriceModalOpen()
            // return false to prevent default browser behavior
            // and stop event from bubbling
            return false;
        });

        var breadcrumbNameMap = {}
        breadcrumbNameMap['/sale'] = (

            <Icon style={{ fontSize: '1.2em' }} type='home' />
        )

        this.props.stocks.map(i => breadcrumbNameMap[`/sale/${i.product.category}`] = i.product.category)
        const { location } = this.props;
        const pathSnippets = location.pathname.split('/').filter(i => i);
        const currentPage = pathSnippets[1];
        const extraBreadcrumbItems = pathSnippets.map((_, index) => {
            const url = `/${pathSnippets.slice(0, index + 1).join('/')}`;
            return (
                <BreadCrumbItem key={url}>
                    <Link to={url}>
                        {breadcrumbNameMap[url]}
                    </Link>
                </BreadCrumbItem>
            );
        });

        const columns = [

            {
                title: lang.product,
                width: '64%',
                dataIndex: 'product.name',
                key: lang.product,
            },
            {
                title: lang.qty,
                width: '18%',
                key: lang.qty,
                color: 'black',
                render: (text, record, key) => <div>{this.state.quantities[record.id]}</div>
            },
            {
                title: lang.price,
                width: '18%',
                key: 'salePrice',
                render: (text, record) => <div>{record.product.salePrice * this.state.quantities[record.id]} {lang.currency} </div>
            }
        ]
        const breadcrumbItems = extraBreadcrumbItems;
        const { getFieldDecorator } = this.props.form;

        return (
            <div style={{ display: 'flex', position: 'absolute', height: '89%', width: '98%' }}>
                <div style={{ width: '35%', display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'space-between' }}>
                    {/* <div className='sale-total'><div style={{ fontSize: '1.4em' }}>Toplam</div><div style={{ fontSize: '1.3em' }}>{this.calculateTotal()}₺</div></div> */}



                  <div className='sale-total' >
                    <div style={{fontWeight: 'bold', fontSize: '2.1em'}}>{lang.totalU}{this.calculateTotal()}{lang.currency}</div>
                    <div style={{fontWeight: 'bold', fontSize: '0.8em'}}>{lang.discount}: 0{lang.currency}</div>
                  </div>


                    <Table
                        className='sale-list'
                        size="small"
                        dataSource={this.state.products}
                        columns={columns}
                        rowClassName={(record, index) => index === this.state.selectedRow ? 'sale-selected-row' : ''}
                        pagination={false}
                        onRow={(record, key) => {
                            return {
                                onClick: () => {
                                    this.selectRow(record, key)
                                },
                            };
                        }}

                    />




                    <Search placeholder={lang.typeProductBarcode} onSearch={this.handleSearch} />


                  <div className='sale-calculate'>

                    <div style={{ width: '60%',display:'flex', flexDirection:'column', height:'100%' }}>
                      <div style={{ display: 'flex', height:'24%',marginBottom:'2px' }}>
                        <Button onClick={() => this.numberSelected(1)} className='number'>1</Button>
                        <Button onClick={() => this.numberSelected(2)} className='number'>2</Button>
                        <Button onClick={() => this.numberSelected(3)} className='number'>3</Button>
                        <Button onClick={() => this.numberSelected('+')} className='number'>+</Button>
                        <Button onClick={() => this.numberSelected('-')} className='number'>-</Button>
                      </div>
                      <div style={{ display: 'flex',height:'24%',marginBottom:'2px' }}>
                        <Button onClick={() => this.numberSelected(4)} className='number'>4</Button>
                        <Button onClick={() => this.numberSelected(5)} className='number'>5</Button>
                        <Button onClick={() => this.numberSelected(6)} className='number'>6</Button>
                        <Button onClick={() => { this.setState({ selectedButton: 1 }) }} className={this.state.selectedButton === 1 ? 'calc-button selected' : 'calc-button not-selected'} ><div style={{fontSize:'12px'}}>{lang.qty}</div></Button>
                      </div>
                      <div style={{ display: 'flex',height:'24%',marginBottom:'2px' }}>
                        <Button onClick={() => this.numberSelected(7)} className='number'>7</Button>
                        <Button onClick={() => this.numberSelected(8)} className='number'>8</Button>
                        <Button onClick={() => this.numberSelected(9)} className='number'>9</Button>
                        <Button onClick={this.delete} className={this.state.selectedButton === 2 ? 'calc-button selected' : 'calc-button not-selected'}><div style={{fontSize:'12px'}}>{lang.delete}</div></Button>
                      </div>
                      <div style={{ display: 'flex',height:'24%',marginBottom:'2px' }}>
                        <Button onClick={() => this.numberSelected(0)} className='calc-button not-selected'>0</Button>
                        <Button className='number'>%</Button>
                        <Button onClick={() => { this.setState({ selectedButton: 3 }) }} className={this.state.selectedButton === 3 ? 'calc-button selected' : 'calc-button not-selected'}><div style={{fontSize:'12px'}}>{lang.discount}</div></Button>
                      </div>
                    </div>

                    <div style={{ alignItems: 'center', width: '100%', textAlign: 'center', display: 'flex', flexDirection: 'column' }}>
                      <div style={{ display: 'flex', width: '100%', height:'50%' }}>
                        <Button onClick={this.finishSale} className='calculate-sale bitir'>
                          <div>
                            <div><Icon type="check-circle" theme="outlined" style={{fontSize:'1.5em'}} /></div>
                            <div style={{fontSize:'0.7em'}}>{lang.endSale}</div>
                            <div style={{fontSize:'0.7em'}}>(F8)</div>
                          </div>
                        </Button>
                        <Button className='calculate-sale fiyat' onClick={this.handeShowPriceModalOpen}>
                          <div>
                            <div><Icon type="tag" theme="outlined" style={{fontSize:'1.5em'}} /></div>
                            <div style={{fontSize:'0.7em'}}>{lang.showPrice}</div>
                            <div style={{fontSize:'0.7em'}}>(F10)</div>
                          </div>
                        </Button>

                      </div>
                      <div style={{ display: 'flex', width: '100%',height:'50%' }}>
                        <Button className='calculate-sale veresiye' onClick={this.handeOcModalOpen}>
                          <div>
                            <div><Icon type="form" theme="outlined" style={{fontSize:'1.5em'}} /></div>
                            <div style={{fontSize:'0.7em'}}>{lang.onCredit}</div>
                            <div style={{fontSize:'0.7em'}}>(F9)</div>
                          </div>
                        </Button>
                        <Button onClick={this.emptyBasketConfirm} className='calculate-sale bosalt'>
                          <div>
                            <div><Icon type="delete" theme="outlined" style={{fontSize:'1.5em'}} /></div>
                            <div style={{fontSize:'0.7em'}}>{lang.empty}</div>
                            <div style={{fontSize:'0.7em'}}>(F2)</div>
                          </div>
                        </Button>
                      </div>
                    </div>

                  </div>

                </div>

                <div style={{ border: '1px solid #d9d9d9', width: '65%', marginLeft: '1%', background:'#fbf9ff' }}>
                    <div style={{ display: 'flex', height: '45px', padding: '15px', backgroundColor: '#f3f3f3', justifyContent: 'space-between' }}>
                        <div className='sale-header'>
                            <div className="demo">
                                <Breadcrumb>
                                    {breadcrumbItems}
                                </Breadcrumb>
                            </div>

                        </div>
                        <div style={{ alignItems: 'center', display: 'flex' }}>
                            <Select
                                style={{ width: '300px', marginRight: ' 5px' }}
                                onSelect={this.handleSelect}
                                defaultValue={lang.favorite}
                                showSearch
                                // placeholder='Select Category'
                                filterOption={(input, option) => (option.props.children).toLowerCase().indexOf(input.toLowerCase()) >= 0}
                            >
                                {this.state.categories.map((category, index) => <Option value={category} >{category}</Option>)}
                            </Select>
                            <Search
                                onChange={this.handleSearchProducts}
                                placeholder={lang.searchAll}
                            />
                        </div>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '95%' }}>
                        <div style={{ display: 'flex', flexWrap: 'wrap', overflowY: 'auto' }}>
                            {this.state.stocks.map((stock, index) => {
                                return (
                                    <div className='sale-products' onClick={() => this.handleRightItemClick(index)}>

                                        <CustomImage name={stock.product.imagePath} />
                                        <div style={{ backgroundColor: 'white', color:'#383c43', margin: '-15px',display:'flex',alignItems:'center', flexDirection:'column', justifyContent:'center',height:'50px'}}>
                                            <div className='txt' style={stock.product.name.length < 10 ? {fontSize: '1.2em'}: stock.product.name.length < 15 ? {fontSize: '1em'} : stock.product.name.length < 20 ? {fontSize: '0.8em'} : {fontSize:'0.8em', display:'flex', flexWrap:'wrap', width:'160px'} }>
                                                {stock.product.name}
                                            </div>
                                            {/*<div style={{ textAlign: 'center', fontSize: '1.2em' }}>*/}
                                                {/*{stock.product.salePrice}₺*/}
                                            {/*</div>*/}
                                            <div className='filter'><Icons iconName='shopping' height='0px' /></div>
                                            {/*<div className='ribbon'><div className='shadow'/><span className='ribbon-b1'/><span className='ribbon-b2'/>{stock.product.salePrice}₺<span className='ribbon-a'/></div></div>*/}
                                            <div className='ribbon'><div className='shadow'/>{stock.product.salePrice}{lang.currency}<span className='ribbon-a'/></div></div>

                                    </div>
                                )
                            })}
                        </div>



                    </div>



            <Modal
              title={lang.sendToOnCredit}
              visible={this.state.OcVisible}
              onCancel={this.handleOcCancel}
              footer={[
                <Button onClick={this.handleOcCancel}>{lang.close}</Button>,
                <Button type="primary" onClick={this.handleOcOk} icon="check">
                            Send
                </Button>
                    ]}
            >
              <Form className='stock-form'>
                <FormItem
                  label={lang.name}
                  style={{ display: 'flex' }}
                >
                  {getFieldDecorator('personId', {
                        initialValue: '',
                        rules: [{
                          required: false, message: lang.choosePerson
                        }],
                      })(
                    <Select placeholder={lang.choosePerson} style={{ width: '200px' }}
                            showSearch
                            filterOption={(input, option) => (option.props.children).toLowerCase().indexOf(input.toLowerCase()) >= 0}
                    >{this.props.clients.map(p => <Option key={p.id}>{p.name}</Option>)}</Select>
                      )}
              </FormItem>

                <div>
                  <FormItem
                    label={lang.amount}
                    style={{ display: 'flex' }}
                  >
                    {getFieldDecorator('amount', {
                      initialValue: this.calculateTotal(),
                      rules: [{
                        required: true, message: lang.typeAmount
                      }],
                    })(
                      <InputNumber min={0} formatter={value => `${value + lang.currency}`} />
                    )}

                  </FormItem>
                  
                  <FormItem
                    label={lang.paymentDate}
                    style={{ display: 'flex' }}
                  >
                    {getFieldDecorator('expectedDate', {
                      initialValue: '',
                      rules: [{
                        required: false
                      }],
                    })(
                      <DatePicker placeholder={lang.pickDate} />
                    )}

                  </FormItem>
                  <FormItem
                    label={lang.status}
                    style={{ display: 'flex' }}
                  >
                    {getFieldDecorator('status', {
                      initialValue: 'Bekliyor',
                      rules: [{
                        required: false
                      }],
                    })(
                      <Select style={{ width: 120 }}>
                        <Option value="Bekliyor">{lang.pending}</Option>
                        <Option value="Bitti">{lang.finished}</Option>
                        <Option value="Gecikmiş">{lang.overdue}</Option>
                      </Select>
                    )}

                  </FormItem>

                </div>

              </Form>
            </Modal>




        <Modal
              title={lang.seePrice}
              visible={this.state.showPriceVisible}
              onCancel={this.handleShowPriceCancel}
              footer={[
                <Button onClick={this.handleShowPriceCancel}>{lang.close}</Button>,
                
                    ]}
            >

              <Form className='stock-form'>
                <FormItem
                  label={lang.barcode}
                  style={{ display: 'flex' }}
                >
                  {getFieldDecorator('barcode', {
                        initialValue: '',
                        rules: [{
                          required: false, message: lang.choosePerson
                        }],
                      })(
                    <Input onChange={this.searchPriceForSingleProduct}/>
                      )}
              </FormItem>

                <div>
                  <FormItem
                    label={lang.price}
                    style={{ display: 'flex' }}
                  >
                    {getFieldDecorator('amount', {
                      initialValue: 0,
                    })(
                      <Button size="large" type="primary">
                      {this.state.singleProductPrice + " " + lang.currency}
                      </Button>
                    )}

                  </FormItem>
                  

                </div>

              </Form>
            </Modal>





                </div>
            </div>
        );
    }


}
function mapStateToProps({ stockReducer, clientReducer }) {
    const { retrieveStocksSuccess, stocks, retrieveStockByBarcodeSuccess, stockByBarcode, stockCategories, stockCategoriesSuccess } = stockReducer;
    const { clients } = clientReducer;
    return {
        retrieveStocksSuccess,
        stocks,
        retrieveStockByBarcodeSuccess,
        stockByBarcode,
        stockCategories,
        stockCategoriesSuccess,
        clients

    }
}

const ConnectedPage = connect(mapStateToProps, { retrieveStocks,finishSale, retrieveStockByBarcode, retrieveStocksCategories,retrieveClients, createReceiving})(SalePage);
const WrappedPage = Form.create()(ConnectedPage);
export { WrappedPage as SalePage }
