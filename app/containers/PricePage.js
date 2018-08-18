import React, { Component } from 'react';
type Props = {};
import { Select, Input, Spin } from 'antd'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom';
import '../assets/styles/price.css';
import { retrieveProducts, retrieveProduct } from '../actions/ProductActions'
const Option = Select.Option;
const Search = Input.Search;

class PricePage extends Component<Props> {
    props: Props
    constructor(props) {
        true
        super(props);
        this.state = {
            visible: false,
            continue: false,
            barkod: ''
        }
    }
    componentDidMount() {
        this.props.retrieveProducts('');
    }
    handleSearch = (id) => {
        this.props.retrieveProducts('',barcode);
    }
    handleSelect = (e) =>{
        this.props.retrieveProduct(e);
    }
    render() {
        return (
            <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '1.6em', margin: '10% 0% 10% 0', fontWeight: 'bold' }}>
                    Bir urun secin veya kodu girin veya kodu taratin.
                </div>
                <div >
                    <Select
                        style={{ width: '30%', marginRight: '5%', marginLeft: '10%' }}
                        placeholder='Urun seciniz'
                        onSelect={this.handleSelect}

                    >{this.props.products.map(p => <Option key={p.id}>{p.name}</Option>)}</Select>

                    <Search style={{ width: '30%', marginRight: '10%' }}
                        placeholder='Urun barkodunu giriniz'
                        onSearch={this.handleSearch}
                    />
                    
                </div>
                {this.props.getProductRequest &&
                        <Spin size='large'/>
                }
                {
                    this.props.getProductSuccess &&
                    <div>
                        {this.props.product.name}
                    </div>
                }
            </div>
        );
    }
}
function mapStateToProps({ productReducer }) {
    const { products,product,getProductSuccess,getProductRequest } = productReducer;
    return {
        products, 
        product,
        getProductSuccess,
        getProductRequest
    }
}

const ConnectedPage = connect(mapStateToProps, { retrieveProducts, retrieveProduct })(PricePage);
export { ConnectedPage as PricePage }

