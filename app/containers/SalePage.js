import React, { Component } from 'react';
type Props = {};
import { List, Icon, Avatar, Button, Input,Table } from 'antd'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import '../assets/styles/sale.css';
import {retrieveStocks} from '../actions/StockActions'
const Search =Input.Search;

const data = [{ name: 'slm' }, { name: 'ben' }, { name: 'ege' }]

class SalePage extends Component<Props> {
    props: Props
    constructor(props) {
        super(props);
        this.state = {
            products: [],
            quantities:{}
        }
    }
    handleSearch= (e) =>{
        this.props.retrieveStocks('',e);
    }
    componentDidUpdate(oldProps){
        if(!oldProps.retrieveStocksSuccess && this.props.retrieveStocksSuccess){
            const a = this.state.products.slice();
            console.log(this.props.stock)
            const item =this.props.stocks[0];
            if(!this.state.quantities[item.id]){
                a.push(item);
            }
            this.setState({
                products:a,
                quantities: {...this.state.quantities,[item.id]: this.state.quantities[item.id] ? this.state.quantities[item.id]+1 : 1 }
            })
        }
    }
    render() {
        console.log(this.state.quantities)
        const columns = [
            {
                key:'aa',
                render: (record) => <div>IMG</div>
            },
            {
                title:'Urun',
                dataIndex:'product.name',
                key:'urun',
            },
            {
                title:'Adet',
                key:'qty',
                render: (text,record) => <div>{this.state.quantities[record.id]}</div>
            },
            {
                title:'Fiyat',
                key:'salePrice',
                render: (text, record) => record.product.salePrice * this.state.quantities[record.id]
            }
        ]
        return (
            <div>
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
                <Table className='sale-list' dataSource={this.state.products} columns={columns} pagination={false}/>
                <Search style={{width:'40%'}} onSearch= {this.handleSearch} />
                
                </div>
                );
            }
    

}
function mapStateToProps({stockReducer }) {
    const {retrieveStocksSuccess,stocks} = stockReducer;
    return {
        retrieveStocksSuccess,
        stocks
    }
}

const ConnectedPage = connect(mapStateToProps, {retrieveStocks})(SalePage);
export { ConnectedPage as SalePage }
