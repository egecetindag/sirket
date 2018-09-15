import React, { Component } from 'react';
import { Card, Col, Form, Row, Divider, Progress, Table, Button } from "antd";
import ReactHighcharts from 'react-highcharts';
import {retrievePaymentReport} from '../../actions/ReportActions'
import { connect } from 'react-redux';
import moment from 'moment';

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
        name : "Ödeme",
        data: []
      },{
        name : "Harcama",
        data: []
      },{
        name : "Tahsilat",
        data: []
      }]
    };

    var TL = '₺';

    configForBar.series[0].data = this.props.paymentReport ? this.props.paymentReport.payments: [] ;
    configForBar.series[1].data = this.props.paymentReport ? this.props.paymentReport.expenses: [] ;
    configForBar.series[2].data = this.props.paymentReport ? this.props.paymentReport.receivings: [] ;
    configForBar.xAxis.categories = this.props.paymentReport.timestamps ? this.props.paymentReport.timestamps : [];

    var totalResult =this.props.paymentReport.totalReceivings - this.props.paymentReport.totalPayments - this.props.paymentReport.totalExpenses;

    var totalResultToDivide = this.props.paymentReport.totalReceivings + this.props.paymentReport.totalPayments + this.props.paymentReport.totalExpenses;


    var receivingPercent = (this.props.paymentReport.totalReceivings*100) / totalResultToDivide;
    var expensePercent = (this.props.paymentReport.totalExpenses*100) / totalResultToDivide;
    var paymentPercent = (this.props.paymentReport.totalPayments*100) / totalResultToDivide;

    console.log("percents: ",receivingPercent,expensePercent,paymentPercent);

    const columns = [
      {
        title: 'Kişi',
        dataIndex: 'person',
        key: 'person',
      },{
        title: 'Miktar',
        dataIndex: 'amount',
        key: 'amount',
        render: (text) => <div style={{color:'red'}}>{text}</div>
      },{
        title: 'Tür',
        dataIndex: 'type',
        key: 'type',
        render: (text) => <div style={{color:'red'}}>{text}</div>
      },{
        title: 'Tarih',
        dataIndex: 'timestamp',
        key: 'timestamp',
        render: (text) => <div>{moment.unix(text).format('DD/MM/YYYY')}</div>
      },{
        title: 'Durum',
        dataIndex: 'status',
        key: 'status',
      },{
        title: 'Detay',
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
                  Toplam
                </div>
                <Divider/>
                <Progress type="circle" percent={100} format={() => totalResult + TL}  />
              </Card>

            </Col>

            <Col span={6}>

              <Card style={{textAlign : 'center'}}>
                Tahsilat
                <Divider/>
                <Progress type="circle" percent={receivingPercent} format={() => this.props.paymentReport.totalReceivings + TL} />
              </Card>

            </Col>

            <Col span={6}>

              <Card style={{textAlign : 'center'}}>
                Ödeme
                <Divider/>
                <Progress type="circle" percent={paymentPercent} format={() => this.props.paymentReport.totalPayments + TL} />
              </Card>

            </Col>

            <Col span={6}>

              <Card style={{textAlign : 'center'}}>
                Harcama
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
            {console.log("xx ",this.props.paymentReport)}
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
                   title={() => <div style={{fontWeight:'bold', fontSize:'16px', textAlign:'center'}}>Gelir/Gider Listesi</div>}
                   footer={() => <div ><Button type="primary" icon="download" >Excel indir</Button></div>}
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
