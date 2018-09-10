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
    console.log("teoman2",this.props.paymentReport);
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

    console.log("teoman",this.props.paymentReport);

    configForBar.series[0].data = this.props.paymentReport ? this.props.paymentReport.payments: [] ;
    configForBar.series[1].data = this.props.paymentReport ? this.props.paymentReport.expenses: [] ;
    configForBar.series[2].data = this.props.paymentReport ? this.props.paymentReport.receivings: [] ;
    configForBar.xAxis.categories = this.props.paymentReport.paymentsTime ? this.props.paymentReport.paymentsTime.map(i => moment.unix(i).format("DD/MM")) : [];

    return (
      <div>
        {/*{console.log("config",configForBar)}*/}
        <ReactHighcharts config={configForBar} />
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
