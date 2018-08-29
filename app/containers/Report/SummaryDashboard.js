import React, { Component } from 'react';
import { Card, Col, Form, Row, Tooltip, Icon } from "antd";
// import { Chart, ArgumentAxis, ValueAxis, LineSeries } from "@devexpress/dx-react-chart-material-ui";
import ReactHighcharts from 'react-highcharts';
import Highlight from 'react-highlight';
import {retrieveSummaryDashboardReport} from '../../actions/ReportActions'
import { connect } from 'react-redux';
import moment from 'moment';

// const configGross = {
//   title:"",
//   xAxis: {
//     categories: []
//   },
//   yAxis: {
//     title: {
//       text: null
//     }
//   },
//   series: [{
//     name: "Brüt Kazanç",
//     data: []
//   }]
// };
//
//
//
// const contentListNoTitle = {
//   gross: <ReactHighcharts config={configGross} />,
//   net: <ReactHighcharts config={configNet} />,
// };


class SummaryDashboard extends Component<Props> {
  props: Props
  constructor(props) {
    super(props);
    this.state = {
      key: 'gross',
      noTitleKey: 'gross',
    }
  }

  onTabChange = (key, type) => {
    console.log(key, type);
    this.setState({ [type]: key });
  }

  componentDidMount(){
    this.props.retrieveSummaryDashboardReport(this.props.dates[0].unix(),this.props.dates[1].unix());
  }

  componentWillReceiveProps(nextProps) {
    // You don't have to do this check first, but it can help prevent an unneeded render
    if (nextProps.dates !== this.props.dates) {
      this.props.retrieveSummaryDashboardReport(nextProps.dates[0].unix(),nextProps.dates[1].unix());
    }
  }
  
  render() {

    var configNet = {
      title:"",
      xAxis: {
        categories: []
      },
      yAxis: {
        title: {
          text: null
        }
      },
      series: [{
        name: "Brüt Kazanç",
        data: []
      }]
    };

    var tabListNoTitle = [{
      key: 'gross',
      tab: 'Satış Tablosu',
    }, {
      key: 'net',
      tab: 'Kar Tablosu',
    }];
    // console.log(this.props.dashboardSummaryReport) ;

    const configGross = {
      title:"",
      xAxis: {
        categories: []
      },
      yAxis: {
        title: {
          text: null
        }
      },
      series: [{
        name: "Brüt Kazanç",
        data: []
      }]
    };



    const contentListNoTitle = {
      gross: <ReactHighcharts config={configGross} />,
      net: <ReactHighcharts config={configNet} />,
    };

    console.log("dates: ", this.props.dates);

    configGross.series[0].data = this.props.dashboardSummaryReport ? this.props.dashboardSummaryReport.grossProfits: [];
    configGross.xAxis.categories = this.props.dashboardSummaryReport.timestamps ? this.props.dashboardSummaryReport.timestamps.map(i => moment.unix(i).format("DD/MM")) : [];
    console.log("config:",configGross);

    configNet.series[0].data = this.props.dashboardSummaryReport ? this.props.dashboardSummaryReport.netProfits: [];
    configNet.xAxis.categories = this.props.dashboardSummaryReport.timestamps ? this.props.dashboardSummaryReport.timestamps.map(i => moment.unix(i).format("DD/MM")) : [];
    console.log("configNet:",configNet);

    return (
      <div >
        <div >
          <Row gutter={12}>
            <Col span={4}>
              <Card
                title={
                  <div>
                    <b>Satış Sayısı </b>
                    <Tooltip title="Verilen zaman diliminde yapılan toplam satış sayısı.">
                      <Icon type="question-circle-o" />
                    </Tooltip>
                  </div>}
                style={{textAlign : 'center'}}
              >
                {this.props.dashboardSummaryReport.saleCount}

              </Card>
            </Col>
            <Col span={4}>
              <Card
                title={
                  <div>
                    <b>Ürün Sayısı </b>
                    <Tooltip title="Satışlardaki toplam ürün sayısı.">
                      <Icon type="question-circle-o" />
                    </Tooltip>
                  </div>}
                style={{textAlign : 'center'}}
              >
                {this.props.dashboardSummaryReport.itemCount}

              </Card>
            </Col>
            <Col span={4}>
              <Card
                title={
                  <div>
                    Müşteri Sayısı
                    <Tooltip title="Toplam satış yapılan müşteri sayısı.">
                      <Icon type="question-circle-o" />
                    </Tooltip>
                  </div>}
                style={{textAlign : 'center'}}
              >
                {this.props.dashboardSummaryReport.customerCount}

              </Card>
            </Col>
            <Col span={4}>
              <Card
                title={
                  <div>
                    <b>İndirim Miktarı </b>
                    <Tooltip title="Yapılan toplam indirim miktarı.">
                      <Icon type="question-circle-o" />
                    </Tooltip>
                  </div>}
                style={{textAlign : 'center'}}
              >
                {this.props.dashboardSummaryReport.discount}

              </Card>
            </Col>
          </Row>
          <br />

          <Row >
            <Col span={16}>

              <Card
                tabList={tabListNoTitle}
                activeTabKey={this.state.noTitleKey}
                onTabChange={(key) => { this.onTabChange(key, 'noTitleKey'); }}
              >
                {contentListNoTitle[this.state.noTitleKey]}
              </Card>

            </Col>
            <Col span={8}>

              <Card title="Toplam Sonuç" bordered={false}>

                <b>Total Satış:</b> {this.props.dashboardSummaryReport.grossProfit} <br />
                <b>En düşük:</b> {this.props.dashboardSummaryReport.grossProfit} <br />
                <b>En yüksek:</b> {this.props.dashboardSummaryReport.grossProfit} <br />

              </Card>
            </Col>

          </Row>
        </div>
      </div>

    );
  }
}
function mapStateToProps({reportReducer}) {
  const {dashboardSummaryReport} = reportReducer;
  return {
    dashboardSummaryReport
  }
}

const ConnectedPage = connect (mapStateToProps,{retrieveSummaryDashboardReport})(SummaryDashboard);
const WrappedPage = Form.create()(ConnectedPage);
export { WrappedPage as SummaryDashboard }
