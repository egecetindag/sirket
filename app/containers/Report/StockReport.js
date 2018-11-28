import React, { Component } from 'react';
import moment from "moment";
import { Button, Form, Icon, Popconfirm, Input, Table, Row, Col, Divider, Select, Progress, message } from "antd";
const Search = Input.Search;
import {retrieveStockReport} from '../../actions/ReportActions'
import {retrieveStocksCategories} from '../../actions/StockActions'
import connect from "react-redux/es/connect/connect";
import { getStockReportExcel } from "../../services/ReportServices";
import { extractFileName } from "./ExtractFileName";
import { saveAs } from "file-saver";

import {lang} from '../../services/config'


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
    this.setState({
      selected: value
    })
    this.props.retrieveStockReport('',value);
  }
  handleOnChange =(value) =>{
    // console.log("changed search:1",this.state.selected);
    // if(this.state.selected){
    //   console.log("changed search:2",this.state.selected);
    // }
    // this.props.retrieveStockReport('',selected.name);
  }
  onSearchChange = (e) =>{
    this.setState({
      name: e.target.value
    })
    this.handleSearch(e.target.value);
  }

  handleDownload(){

    //this.setState({ downloading: 'inProgress' });
    let self = this;

    getStockReportExcel().then((response) => {
      // console.log("Response", response);
      this.setState({ downloading: 'inProgress'});
      //extract file name from Content-Disposition header
      var filename=extractFileName(response.headers['content-disposition']);
      //console.log("File name",filename);
      //invoke 'Save As' dialog
      saveAs(response.data, filename)
      this.setState({ downloading: 'done'});


    }).catch(function (error) {
        console.log(error);
        self.setState({ downloading: 'error' });

        if (error.response) {
          console.log('Error', error.response.status);
          message.error(lang.fileDownloadError ,error.response.status);
        } else {
          console.log('Error', error.message);
          message.error(lang.fileDownloadError ,error.message);
        }
      })
  }
  
  render() {
    const columns = [{
      title: (<div>
                  <div style={{fontWeight: 'bold', fontSize: '1.1em'}}>
                      {lang.name}
                  </div>
                  <Divider/>
                  <div>
                      {lang.total}
                  </div>
              </div>),
      dataIndex: 'name',
      key: 'name',
    }, {
      title: (<div>
                <div style={{fontWeight: 'bold', fontSize: '1.1em'}}>
                  {lang.category}
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
                {lang.qty}
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
            {lang.buyingPrice}
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
                    {lang.grossValue}
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
                    {lang.salePrice}
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
                    {lang.netValue}
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
                    {lang.totalProfit}
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
              placeholder={lang.barcode_name_category}
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
              allowClear={true}
              onChange={this.handleOnChange}
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
            <Button type="primary" icon="download" onClick={() => this.handleDownload()} >{lang.downloadExcel}</Button>

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
