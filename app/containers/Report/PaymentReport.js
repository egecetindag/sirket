import React, { Component } from 'react';
import { Card, Col, Form, Row, Divider, Progress, Table, Button, message } from "antd";
import ReactHighcharts from 'react-highcharts';
import {retrievePaymentReport} from '../../actions/ReportActions'
import { connect } from 'react-redux';
import moment from 'moment';
import { getPaymentReportExcel } from "../../services/ReportServices";
import { extractFileName } from "./ExtractFileName";
import { saveAs } from "file-saver";

import {lang} from '../../services/config'


class PaymentReport extends Component<Props> {
  props: Props
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  componentDidMount(){
    this.props.retrievePaymentReport(this.props.dates[0].unix(),this.props.dates[1].unix());
  }

  componentWillReceiveProps(nextProps) {
    // You don't have to do this check first, but it can help prevent an unneeded render
    if (nextProps.dates !== this.props.dates) {
      this.props.retrievePaymentReport(nextProps.dates[0].unix(),nextProps.dates[1].unix());
    }
  }

  handleDownload(first,last){

    //this.setState({ downloading: 'inProgress' });
    let self = this;

    getPaymentReportExcel(first,last).then((response) => {
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

    var configForBar = {
      title: "",
      chart: {
        type: 'areaspline'
      },
      xAxis: {
        categories: []
      },
      yAxis: {
        title: {
          text: null
        }
      },
      plotOptions: {
        series: {
          allowPointSelect: true
        }
      },
      series: [{
        name : lang.payment,
        data: []
      },{
        name : lang.expense,
        data: []
      },{
        name : lang.receiving,
        data: []
      }],
      credits:{
        enabled: false
      },
    };

    var TL = lang.currency;

    configForBar.series[0].data = this.props.paymentReport ? this.props.paymentReport.payments: [] ;
    configForBar.series[1].data = this.props.paymentReport ? this.props.paymentReport.expenses: [] ;
    configForBar.series[2].data = this.props.paymentReport ? this.props.paymentReport.receivings: [] ;
    configForBar.xAxis.categories = this.props.paymentReport.timestamps ? this.props.paymentReport.timestamps : [];

    var totalResult =this.props.paymentReport.totalReceivings - this.props.paymentReport.totalPayments - this.props.paymentReport.totalExpenses;

    var totalResultToDivide = this.props.paymentReport.totalReceivings + this.props.paymentReport.totalPayments + this.props.paymentReport.totalExpenses;


    var receivingPercent = (this.props.paymentReport.totalReceivings*100) / totalResultToDivide;
    var expensePercent = (this.props.paymentReport.totalExpenses*100) / totalResultToDivide;
    var paymentPercent = (this.props.paymentReport.totalPayments*100) / totalResultToDivide;

    // console.log("percents: ",receivingPercent,expensePercent,paymentPercent);

    const columns = [
      {
        title: lang.person,
        dataIndex: 'person',
        key: 'person',
      },{
        title: lang.amount,
        dataIndex: 'amount',
        key: 'amount',
        render: (text) => <div style={{color:'red'}}>{text}</div>
      },{
        title: lang.type,
        dataIndex: 'type',
        key: 'type',
        render: (text) => <div style={{color:'red'}}>{text}</div>
      },{
        title: lang.date,
        dataIndex: 'timestamp',
        key: 'timestamp',
        render: (text) => <div>{moment.unix(text).format('DD/MM/YYYY')}</div>
      },{
        title: lang.status,
        dataIndex: 'status',
        key: 'status',
      },{
        title: lang.detail,
        dataIndex: 'detail',
        key: 'detail',
      },
    ]

    return (
      <div>
        <div>
          <Row gutter={12}>

            <Col span={6} >

              <Card style={{textAlign : 'center'}}>
                <div>
                  {lang.total}
                </div>
                <Divider/>
                <Progress type="circle" percent={100} format={() => totalResult + TL}  />
              </Card>

            </Col>

            <Col span={6}>

              <Card style={{textAlign : 'center'}}>
                {lang.receiving}
                <Divider/>
                <Progress type="circle" percent={receivingPercent} format={() => this.props.paymentReport.totalReceivings + TL} />
              </Card>

            </Col>

            <Col span={6}>

              <Card style={{textAlign : 'center'}}>
                {lang.payment}
                <Divider/>
                <Progress type="circle" percent={paymentPercent} format={() => this.props.paymentReport.totalPayments + TL} />
              </Card>

            </Col>

            <Col span={6}>

              <Card style={{textAlign : 'center'}}>
                {lang.expense}
                <Divider/>
                <Progress type="circle" percent={expensePercent} format={() => this.props.paymentReport.totalExpenses + TL} />
              </Card>

            </Col>


          </Row>
        </div>

        <div style={{marginTop:'25px'}}>
          <ReactHighcharts config={configForBar} />
        </div>

        <div style={{marginTop:'25px'}}>
          <Row>
            {/*{console.log("xx ",this.props.paymentReport)}*/}
            <Table dataSource={this.props.paymentReport ? this.props.paymentReport.itemsAsObject : []  }
                   columns={columns}
                   rowKey={(record) => {
                     return record.timestamp;
                   }}
                   onRow={(record) => {
                     return {
                       onClick: () => this.setState({selected: record})
                     }
                   }}
                   pagination={{ pageSize: 6 }}
                   title={() => <div style={{fontWeight:'bold', fontSize:'16px', textAlign:'center'}}>{lang.incomeAndExpenseList}</div>}
                   footer={() => <div ><Button type="primary" icon="download" onClick={() => this.handleDownload(this.props.dates[0].unix(),this.props.dates[1].unix())}>{lang.downloadExcel}</Button></div>}
            />
          </Row>

        </div>

      </div>

    );
  }
}
function mapStateToProps({reportReducer}) {
  const {paymentReport} = reportReducer;
  return {
    paymentReport
  }
}

const ConnectedPage = connect (mapStateToProps,{retrievePaymentReport})(PaymentReport);
const WrappedPage = Form.create()(ConnectedPage);
export { WrappedPage as PaymentReport }
