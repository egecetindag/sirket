import React, { Component } from 'react';
import moment from "moment";
import { Button, Form, Icon, Popconfirm, Input, Table, Row, Col, Divider, Select } from "antd";
const Search = Input.Search;
import {retrieveStockReport} from '../../actions/ReportActions'
import {retrieveStocksCategories} from '../../actions/StockActions'
import connect from "react-redux/es/connect/connect";

class StockReport extends Component<Props> {
  props: Props
  constructor(props) {
    super(props);
    this.state = {
      name : '',
      selected: {},
    }
  }

  componentDidMount(){
    this.props.retrieveStockReport('','');
    this.props.retrieveStocksCategories();
  }

  handleSearch =(value) =>{
    //console.log("handle search:",value);
    this.props.retrieveStockReport(value,'');
  }
  handleSelect =(value) =>{
    console.log("handle search:",value);
    this.props.retrieveStockReport('',value);
  }
  onSearchChange = (e) =>{
    this.setState({
      name: e.target.value
    })
    this.handleSearch(e.target.value);
  }
  
  render() {
    const columns = [{
      title: (<div>
                  <div style={{fontWeight: 'bold', fontSize: '1.1em'}}>
                      İsim
                  </div>
                  <Divider/>
                  <div>
                      Toplam
                  </div>
              </div>),
      dataIndex: 'name',
      key: 'name',
    }, {
      title: (<div>
                <div style={{fontWeight: 'bold', fontSize: '1.1em'}}>
                  Kategori
                </div>
                <Divider/>
                <div>
                    &nbsp;
                </div>
              </div>),
      dataIndex: 'category',
      key: 'category',
    }, {
      title:(<div>
              <div style={{fontWeight: 'bold', fontSize: '1.1em'}}>
                Adet
              </div>
              <Divider/>
              <div>
                {this.props.stockReportTotal.qty}
              </div>
            </div>),
      dataIndex: 'qty',
      key: 'qty',
    },
      {
        title: (<div>
          <div style={{fontWeight: 'bold', fontSize: '1.1em'}}>
            Alış Fiyatı
          </div>
          <Divider/>
          <div>
            {this.props.stockReportTotal.purchasePrice}
          </div>
        </div>),
        dataIndex: 'purchasePrice',
        key: 'purchasePrice',
      },{
        title: (<div>
                  <div style={{fontWeight: 'bold', fontSize: '1.1em'}}>
                    Bürüt Değer
                  </div>
                  <Divider/>
                  <div>
                    {this.props.stockReportTotal.grossValue}
                  </div>
                </div>),
        dataIndex: 'grossValue',
        key: 'grossValue',
      },{
        title: (<div>
                  <div style={{fontWeight: 'bold', fontSize: '1.1em'}}>
                    Satış Fiyatı
                  </div>
                  <Divider/>
                  <div>
                    {this.props.stockReportTotal.salePrice}
                  </div>
                </div>),
        dataIndex: 'salePrice',
        key: 'salePrice',
      },{
        title: (<div>
                  <div style={{fontWeight: 'bold', fontSize: '1.1em'}}>
                    Net Değeri
                  </div>
                  <Divider/>
                  <div>
                    {this.props.stockReportTotal.netValue}
                  </div>
                </div>),
        dataIndex: 'netValue',
        key: 'netValue',
      },{
        title: (<div>
                  <div style={{fontWeight: 'bold', fontSize: '1.1em'}}>
                    Toplam Kar
                  </div>
                  <Divider/>
                  <div>
                    {this.props.stockReportTotal.totalProfit}
                  </div>
                </div>),
        dataIndex: 'totalProfit',
        key: 'totalProfit',
      },
    ]

    const { getFieldDecorator } = this.props.form;
    const {selected,type} = this.state ;
    console.log(selected);

    return (
      <div>
        <div className='page-header'>

          <div style={{ display: 'flex' }}>
            <Search
              style={{ height: '32px', marginRight: '10px' }}
              placeholder="Barcode / İsim / Kategori"
              onSearch={this.handleSearch}
              onChange={this.onSearchChange}
            />

            <Select
              style={{ width: '300px', marginRight: ' 5px' }}
              onSelect={this.handleSelect}
              // optionLabelProp='id'
              showSearch
              placeholder='Select Category'
              filterOption={(input, option) => (option.props.children).toLowerCase().indexOf(input.toLowerCase()) >= 0}
            >
              {this.props.stockCategories.map((category, index) => {
                return (
                  <Option key={index} value={category} >
                    {category}
                  </Option>
                )
              })
              }
            </Select>
            &nbsp;
            <Button type="primary" icon="download" >Excel indir</Button>
          </div>


        </div>
        <div>
          <Table dataSource={this.props.stockReport}
                 columns={columns}
                 rowKey={(record) => {
                   return record.id+1;
                 }}
                 onRow={(record) => {
                   return {
                     onClick: () => this.setState({selected: record})
                   }
                 }}
                 pagination={{ pageSize: 10 }}
          />

        </div>
      </div>

    );
  }
}
function mapStateToProps({ reportReducer,stockReducer }) {
  const {stockReport,stockReportTotal} = reportReducer;
  const {stockCategories} = stockReducer;
  return {
      stockReport,stockReportTotal,stockCategories
  }
}

const ConnectedPage = connect (mapStateToProps,{retrieveStockReport,retrieveStocksCategories})(StockReport);
const WrappedPage = Form.create()(ConnectedPage);
export { WrappedPage as StockReport }
