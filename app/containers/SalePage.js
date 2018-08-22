import React, { Component } from 'react';
type Props = {};
import { List, Icon, Avatar, Button, Input, Table, Breadcrumb, Dropdown, Menu } from 'antd'
import { Link } from 'react-router-dom';
import { connect, Switch, Route } from 'react-redux';
import { ProductPage } from './ProductPage'
import '../assets/styles/sale.css';
import { retrieveStockByBarcode, retrieveStocks } from '../actions/StockActions'
import ProductReducer from '../reducers/ProductReducer';
const Search = Input.Search;

const data = [{ name: 'slm' }, { name: 'ben' }, { name: 'ege' }]

class SalePage extends Component<Props> {
    props: Props
    constructor(props) {
        super(props);
        this.state = {
            products: [],
            quantities: {},
            visible: false,
            stocks: []

        }
    }
    componentDidMount() {
        this.props.retrieveStocks('')
    }
    handleSearch = (e) => {
        this.props.retrieveStockByBarcode(e);
    }
    handleSearchProducts =(input) =>{
        let a = this.props.stocks.slice()
        a = a.filter(i => i.product.name.toLowerCase().indexOf(input.toLowerCase()) >= 0);
        this.setState({
            stocks: a
        })
    }
    handleSearchCategories =(input) =>{
       
    }

    calculateTotal = (e) => {
        let total = 0;
        this.state.products.map(product =>
            total = total + product.product.salePrice * this.state.quantities[product.id]
        )
        return total;
    }
    componentDidUpdate(oldProps) {
        if(this.props.location.pathname !== oldProps.location.pathname){
            console.log('as ben gldm')
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

    handleMenuClick = (e) => {
        if (e.key === '0') {
            this.setState({ visible: true });
        }
        else {
            this.setState({ visible: false });
        }
    }
    render() {
        const menu = (
            <Menu onClick={this.handleMenuClick}>
                <Menu.Item key="0">
                    <Search onSearch={this.handleSearchCategories}/>
                </Menu.Item>
                <Menu.Item key="1">
                    <a href="http://www.alipay.com/">Hepsi</a>
                </Menu.Item>
                <Menu.Item key="2">
                    <Link to='/sale/chocolate'>Cikolata</Link>
                </Menu.Item>
                <Menu.Item key="3">Diger</Menu.Item>
            </Menu>
        );
        const breadcrumbNameMap = {
            '/sale': (
                <Dropdown
                    onVisibleChange={this.handleVisibleChange}
                    visible={this.state.visible}
                    overlay={menu}
                    trigger={['click']}>
                    <a>
                        <Icon style={{ fontSize: '1.2em' }} type='home' />
                    </a>
                </Dropdown>),
            '/sale/chocolate': 'cikolata',
        };
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
                key: 'aa',
                width: '10%',
                render: (record) => <div>IMG</div>
            },
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
                render: (text, record) => <div>{this.state.quantities[record.id]}</div>
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
                {/* <List
                    className="sale-list"
                    itemLayout="horizontal"
                    dataSource={this.state.products}
                    renderItem={item => (
                        <List.Item actions={[<Button><Icon type='close' /></Button>]}>
                            <List.Item.Meta
                                avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                                title={<a href="https://ant.design">{item.name}</a>}
                                description="Ant Design, D Team"
                            />
                            <div style={{ display: 'flex', marginRight: '30%', alignItems: 'center' }}>1</div>
                            <div style={{ display: 'flex', alignItems: 'center' }}>3.5tl</div>

                        </List.Item>
                    )}
                /> */}

                <div style={{ width: '30%' }}>
                    <Table className='sale-list' dataSource={this.state.products} columns={columns} pagination={false} />
                    <div className='sale-total'><div>Toplam:</div><div>{this.calculateTotal()}₺</div></div>
                    <Search onSearch={this.handleSearch} />
                    <div className='sale-calculate' />
                </div>
                <div style={{ border: '1px solid #d9d9d9', width: '70%', marginLeft: '2%' }}>
                    <div style={{ display: 'flex', height: '45px', padding: '15px', backgroundColor: '#d9d9d9', justifyContent: 'space-between' }}>
                        <div className='sale-header'>
                            <div className="demo">
                                <Breadcrumb>
                                    {breadcrumbItems}
                                </Breadcrumb>
                            </div>

                        </div>
                        <div style={{ alignItems: 'center', display: 'flex' }}>
                            <Search
                                onSearch ={this.handleSearchProducts}
                                placeholder='Urun Ara'
                            />
                        </div>
                    </div>
                    <div style={{display:'flex'}}>
                    {this.state.stocks.map(stock => {
                        return(
                            <div className='sale-products'>
                                <div>
                                    <div style={{textAlign:'center'}}>
                                        {stock.product.name}
                                    </div>
                                    <div style={{textAlign:'center'}}>
                                        {stock.product.salePrice}₺
                                    </div>
                                </div>
                            </div>
                        )})}
                        </div>
                </div>
            </div>
        );
    }


}
function mapStateToProps({ stockReducer }) {
    const { retrieveStocksSuccess, stocks, retrieveStockByBarcodeSuccess, stockByBarcode } = stockReducer;
    return {
        retrieveStocksSuccess,
        stocks,
        retrieveStockByBarcodeSuccess,
        stockByBarcode,
    }
}

const ConnectedPage = connect(mapStateToProps, { retrieveStocks, retrieveStockByBarcode })(SalePage);
export { ConnectedPage as SalePage }
