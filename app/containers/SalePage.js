import React, { Component } from 'react';
type Props = {};
import { List, Icon, Avatar, Button, Input, Table, Row, Col, Breadcrumb, Dropdown, Menu, Select } from 'antd'
import { Link } from 'react-router-dom';
import { connect, Switch, Route } from 'react-redux';
import { ProductPage } from './ProductPage'
import { history } from '../store/configureStore'
import '../assets/styles/sale.css';
import { Icons } from '../assets/Icons'
import { retrieveStockByBarcode, retrieveStocks, retrieveStocksCategories } from '../actions/StockActions'
import ProductReducer from '../reducers/ProductReducer';
import { CustomImage } from '../assets/ProductPhotos/CustomImage';
const Search = Input.Search;
const Option = Select.Option

const data = [{ name: 'slm' }, { name: 'ben' }, { name: 'ege' }]

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
            selectedRow: undefined
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
    componentDidMount() {
        this.props.retrieveStocks({});
        this.props.retrieveStocksCategories();
    }
    handleSearch = (e) => {
        if (e.length === 12) {
            this.props.retrieveStockByBarcode(e);
        }
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
            quantities: { ...this.state.quantities, [id]: this.state.quantities[id] ? this.state.quantities[id] + 1 : 1 }
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
        if (e !== 'En Cok Satanlar') {
            this.props.retrieveStocks({ category: e })
            history.push('/sale/' + e);
        }
        else {
            this.props.retrieveStocks({})
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
    delete =()=>{
        if(this.state.startedWriting){
            this.setState({
                
            })
        }
    }
    render() {
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
                <Breadcrumb.Item key={url}>
                    <Link to={url}>
                        {breadcrumbNameMap[url]}
                    </Link>
                </Breadcrumb.Item>
            );
        });

        const columns = [

            {
                title: 'Urun',
                width: '30%',
                dataIndex: 'product.name',
                key: 'urun',
            },
            {
                title: 'Adet',
                width: '30%',
                key: 'qty',
                color: 'black',
                render: (text, record, key) => <div>{this.state.quantities[record.id]}</div>
            },
            {
                title: 'Fiyat',
                width: '30%',
                key: 'salePrice',
                render: (text, record) => <div>{record.product.salePrice * this.state.quantities[record.id]} ₺ </div>
            }
        ]
        const breadcrumbItems = extraBreadcrumbItems;


        return (
            <div style={{ display: 'flex', position: 'absolute', height: '89%', width: '98%' }}>
                <div style={{ width: '30%', display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'space-between' }}>
                    <div className='sale-total'><div style={{ fontSize: '1.4em' }}>Toplam</div><div style={{ fontSize: '1.3em' }}>{this.calculateTotal()}₺</div></div>
                    <Table
                        className='sale-list'
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
                    <Search onSearch={this.handleSearch} />
                </div>

                <div style={{ border: '1px solid #d9d9d9', width: '70%', marginLeft: '1%' }}>
                    <div style={{ display: 'flex', height: '45px', padding: '15px', backgroundColor: '#d9d9d9', justifyContent: 'space-between' }}>
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
                                defaultValue='En Cok Satanlar'
                                showSearch
                                // placeholder='Select Category'
                                filterOption={(input, option) => (option.props.children).toLowerCase().indexOf(input.toLowerCase()) >= 0}
                            >
                                {this.state.categories.map((category, index) => <Option value={category} >{category}</Option>)}
                            </Select>
                            <Search
                                onChange={this.handleSearchProducts}
                                placeholder='Tum Urunlerde Ara'
                            />
                        </div>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '95%' }}>
                        <div style={{ display: 'flex', flexWrap: 'wrap', overflowY: 'auto' }}>
                            {this.state.stocks.map((stock, index) => {
                                return (
                                    <div className='sale-products' onClick={() => this.handleRightItemClick(index)}>
                                        <CustomImage name={stock.product.id} />
                                        <div style={{ backgroundColor: '#e2e2e2', margin: '-15px' }}>
                                            <div className='txt'>
                                                {stock.product.name}
                                            </div>
                                            <div style={{ textAlign: 'center', fontSize: '1.2em' }}>
                                                {stock.product.salePrice}₺
                                        </div>
                                            <div className='filter'><Icons iconName='shopping' height='0px' /></div>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                        <div className='sale-calculate'>
                            <div style={{ alignItems: 'center', width: '40%', textAlign: 'center', justifyContent: 'center', display: 'flex', flexDirection: 'column' }}>
                                <Button className='calculate-sale bitir'>Satisi Bitir</Button>
                                <Button className='calculate-sale veresiye'>Veresiye</Button>
                                <Button className='calculate-sale fiyat'>Fiyat gor</Button>
                                <Button className='calculate-sale bosalt'>Sepeti Bosalt</Button>
                            </div>
                            <div style={{ width: '60%' }}>
                                <div style={{ display: 'flex' }}>
                                    <Button onClick={() => this.numberSelected(1)} className='number'>1</Button>
                                    <Button onClick={() => this.numberSelected(2)} className='number'>2</Button>
                                    <Button onClick={() => this.numberSelected(3)} className='number'>3</Button>
                                    <Button onClick={() => this.numberSelected('+')} className='number'>+</Button>
                                    <Button onClick={() => this.numberSelected('-')} className='number'>-</Button>
                                </div>
                                <div style={{ display: 'flex' }}>
                                    <Button onClick={() => this.numberSelected(4)} className='number'>4</Button>
                                    <Button onClick={() => this.numberSelected(5)}className='number'>5</Button>
                                    <Button onClick={() => this.numberSelected(6)} className='number'>6</Button>
                                    <Button onClick={() => { this.setState({ selectedButton: 1 }) }} className={this.state.selectedButton === 1 ? 'calc-button selected' : 'calc-button not-selected'} >Adet</Button>
                                </div>
                                <div style={{ display: 'flex' }}>
                                    <Button onClick={() => this.numberSelected(7)} className='number'>7</Button>
                                    <Button onClick={() => this.numberSelected(8)} className='number'>8</Button>
                                    <Button onClick={() => this.numberSelected(9)} className='number'>9</Button>
                                    <Button onClick={this.delete} className={this.state.selectedButton === 2 ? 'calc-button selected' : 'calc-button not-selected'}>Sil</Button>
                                </div>
                                <div style={{ display: 'flex' }}>
                                    <Button onClick={() => this.numberSelected(0)} className='calc-button'>0</Button>
                                    <Button className='number'>%</Button>
                                    <Button onClick={() => { this.setState({ selectedButton: 3 }) }} className={this.state.selectedButton === 3 ? 'calc-button selected' : 'calc-button not-selected'}>Discount</Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }


}
function mapStateToProps({ stockReducer }) {
    const { retrieveStocksSuccess, stocks, retrieveStockByBarcodeSuccess, stockByBarcode, stockCategories, stockCategoriesSuccess } = stockReducer;
    return {
        retrieveStocksSuccess,
        stocks,
        retrieveStockByBarcodeSuccess,
        stockByBarcode,
        stockCategories,
        stockCategoriesSuccess

    }
}

const ConnectedPage = connect(mapStateToProps, { retrieveStocks, retrieveStockByBarcode, retrieveStocksCategories })(SalePage);
export { ConnectedPage as SalePage }
