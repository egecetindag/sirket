import React, { Component } from 'react';
type Props = {};
import { Select, Input, Spin, Icon,Button } from 'antd'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom';
import '../assets/styles/price.css';
import { retrieveProducts, retrieveProduct } from '../actions/ProductActions'
import { history } from '../store/configureStore'

const Option = Select.Option;
const Search = Input.Search;
const header ={ fontSize: '1.6em', margin: '10% 0% 10% 0', fontWeight: 'bold' }

class PricePage extends Component<Props> {
    props: Props
    constructor(props) {
        true
        super(props);
        this.state = {
            visible: false,
            continue: false,
            barkod: '',
            product: {},
        }
    }
    componentDidMount() {
        this.props.retrieveProducts('');
    }
    handleSearch = (id) => {
        this.props.retrieveProducts('',barcode);
    }
    handleSelect = (e,a) =>{
        this.setState({
            product: a.props.a
        })
    }
    render() {
         const {product} = this.state;
        return (
            <div style={{ textAlign: 'center' }}>
                <div style={header}>
                    Bir urun secin veya kodu girin veya kodu taratin.
                </div>
                <Select
                  style={{ width: '300px'}}
                  onSelect={this.handleSelect}
                  optionLabelProp = 'id'
                  showSearch
                  filterOption={(input, option) => (option.props.children + option.props.id).toLowerCase().indexOf(input.toLowerCase()) >= 0}
                >{this.props.products.map(p => <Option key={p.id} a={p} id ={p.barcode}>{p.name}</Option>)}</Select>
{/*               
                {this.props.getProductRequest &&
                        <Spin size='large'/>
                } */}
                {
                    product.name &&
                    <div>
                        <div style={{margin:'10% 0 10% 0', boxShadow:'rgb(177, 177, 177) 3px 2px 1px', backgroundColor:'#e9e9e9',width:'40%',display:'inline-block'}}>
                            <div style={{ fontSize: '1.6em', fontWeight: 'bold' }}>
                            {product.name}
                            </div>
                            <div style={{ fontSize: '1.6em', fontWeight: 'bold' }}>
                            {product.salePrice}tl    
                            </div>
                        </div>
                        <div><Button onClick={()=>(history.push('/'))}type='primary' style={{fontSize:'1.6em', paddingTop:'10px', paddingBottom:'44px'}}>
                            Satin Almaya Git <Icon type='arrow-right'/>
                            </Button>
                        </div>
                        <div style={header,{color:'red'}}>aAA</div>
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

