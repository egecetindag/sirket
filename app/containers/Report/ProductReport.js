import React, { Component } from 'react';
import moment from "moment";
import { Button, Form, Icon, Popconfirm, Input, Table, Row, Col, Divider, Select, Progress, message } from "antd";
const Search = Input.Search;
import connect from "react-redux/es/connect/connect";
import { retrieveProductReport, retrieveStockReport } from "../../actions/ReportActions";
import {retrieveStocksCategories} from '../../actions/StockActions'
import { getProductReportExcel } from "../../services/ReportServices";
import { extractFileName } from "./ExtractFileName";
import { saveAs } from "file-saver";

import {lang} from '../../services/config'


class ProductReport extends Component<Props> {
  props: Props
  constructor(props) {
    super(props);
    this.state = {
      name : '',
      category : '',
      selected: {},
    }
  }



  componentDidMount(){
    console.log(this.props.dates);
    this.props.retrieveProductReport(this.props.dates[0].unix(),this.props.dates[1].unix(),this.state.name,this.state.category)
    this.props.retrieveStocksCategories();
  }

  componentWillReceiveProps(nextProps) {
    // You don't have to do this check first, but it can help prevent an unneeded render
    if (nextProps.dates !== this.props.dates) {
      this.props.retrieveProductReport(nextProps.dates[0].unix(),nextProps.dates[1].unix(),this.state.name,this.state.category);
    }
  }

  handleSearch =() =>{
    //console.log("handle search:",value);
    this.props.retrieveProductReport(this.props.dates[0].unix(),this.props.dates[1].unix(),this.state.name,this.state.category);
  }

  onSearchChange = (e) =>{
    this.setState({
      name: e.target.value
    })
    this.handleSearch();
  }

  handleSelect =(value) =>{
    this.setState({
      category: value
    })
    this.props.retrieveProductReport(this.props.dates[0].unix(),this.props.dates[1].unix(),this.state.name,this.state.category);
  }


  handleDownload(first,last){

    //this.setState({ downloading: 'inProgress' });
    let self = this;

    getProductReportExcel(first,last).then((response) => {
      // console.log("Response", response);
      this.setState({ downloading: 'inProgress'});
      //extract file name from Content-Disposition header
      var filename=extractFileName(response.headers['content-disposition']);
      //console.log("File name",filename);
      //invoke 'Save As' dialog
      saveAs(response.data, filename)
      console.log("#1")
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
      dataIndex: 'productName',
      key: 'productName',
    },{
      title:(<div>
        <div style={{fontWeight: 'bold', fontSize: '1.1em'}}>
          {lang.qty}
        </div>
        <Divider/>
        <div>
          {this.props.productReport.totalQty}
        </div>
      </div>),
      dataIndex: 'qty',
      key: 'qty',
    },
      {
        title: (<div>
          <div style={{fontWeight: 'bold', fontSize: '1.1em'}}>
            {lang.grossProfit}
          </div>
          <Divider/>
          <div>
            {this.props.productReport.totalGrossProfit}
          </div>
        </div>),
        dataIndex: 'grossProfit',
        key: 'grossProfit',
        render: (text) => <div>{text.toFixed(2)}</div>
      },
      {
        title: (<div>
          <div style={{fontWeight: 'bold', fontSize: '1.1em'}}>
           {lang.netProfit}
          </div>
          <Divider/>
          <div>
            {this.props.productReport.totalNetProfit ? this.props.productReport.totalNetProfit.toFixed(2) : '0'}
          </div>
        </div>),
        dataIndex: 'netProfit',
        key: 'netProfit',
        render: (text) => <div>{text.toFixed(2)}</div>
      },{
        title: (<div>
          <div style={{fontWeight: 'bold', fontSize: '1.1em'}}>
            {lang.discount}
          </div>
          <Divider/>
          <div>
            {this.props.productReport.totalDiscount}
          </div>
        </div>),
        dataIndex: 'discount',
        key: 'discount',
        render: (text) => <div>{text}</div>
      },
      {
        title: (<div>
          <div style={{fontWeight: 'bold', fontSize: '1.1em'}}>
            {lang.profitMargin}(%)
          </div>
          <Divider/>
          <div>
            &nbsp;
          </div>
        </div>),
        dataIndex: 'markup',
        key: 'markup',
        render: (text) => <div>{text.toFixed(2)}</div>
      },{
        title: (<div>
          <div style={{fontWeight: 'bold', fontSize: '1.1em'}}>
            {lang.profitPercentage} (%)
          </div>
          <Divider/>
          <div>
            &nbsp;
          </div>
        </div>),
        dataIndex: 'profitPercentage',
        key: 'profitPercentage',
        // sorter: (a, b) => a - b,
        render: (text) => <div>{text.toFixed(2)}</div>
      },
      {
        title: (<div>
          <div style={{fontWeight: 'bold', fontSize: '1.1em'}}>
            {lang.numberOfReturn}
          </div>
          <Divider/>
          <div>
            {this.props.productReport.totalNumberOfReturn}
          </div>
        </div>),
        dataIndex: 'numberOfReturn',
        key: 'numberOfReturn',
      },
    ]


    return (
      <div>
        <div className='page-header'>

          <div style={{ display: 'flex' }}>
            <Search
              style={{ height: '32px', marginRight: '10px' }}
              placeholder={lang.nameOfProduct}
              onSearch={this.handleSearch}
              onChange={this.onSearchChange}
            />

            <Select
              style={{ width: '300px', marginRight: ' 5px' }}
              onSelect={this.handleSelect}
              // optionLabelProp='id'
              showSearch
              placeholder={lang.category}
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
            <Button type="primary" icon="download" onClick={() => this.handleDownload(this.props.dates[0].unix(),this.props.dates[1].unix())}>{lang.downloadExcel}</Button>

          </div>



        </div>
        <div>
          <Table dataSource={this.props.productReport.items}
                 columns={columns}
                 rowKey={(record) => {
                   return record.productId+1;
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
function mapStateToProps({ reportReducer , stockReducer}) {
  const {productReport} = reportReducer;
  const {stockCategories} = stockReducer;

  return {
    productReport,stockCategories
  }
}

const ConnectedPage = connect (mapStateToProps,{retrieveProductReport,retrieveStocksCategories})(ProductReport);
const WrappedPage = Form.create()(ConnectedPage);
export { WrappedPage as ProductReport }
