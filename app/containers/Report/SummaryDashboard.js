import React, { Component } from 'react';
import { Card, Col, Form, Row, Tooltip, Icon, Divider, Progress, Table, Button } from "antd";
// import { Chart, ArgumentAxis, ValueAxis, LineSeries } from "@devexpress/dx-react-chart-material-ui";
import ReactHighcharts from 'react-highcharts';
import Highlight from 'react-highlight';
import {retrieveSummaryDashboardReport} from '../../actions/ReportActions'
import { connect } from 'react-redux';
import moment from 'moment';

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
      chart: {
        type: 'column'
      },
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
        name: "Net Kazanç",
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

    var configGross = {
      chart: {
        type: 'column'
      },
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

    var contentListNoTitle = {
      gross: <ReactHighcharts config={configGross} />,
      net: <ReactHighcharts config={configNet} />,
    };


    //console.log("dates: ", this.props.dates);

    configGross.series[0].data = this.props.dashboardSummaryReport ? this.props.dashboardSummaryReport.grossProfits: [];
    configGross.xAxis.categories = this.props.dashboardSummaryReport.timestamps ? this.props.dashboardSummaryReport.timestamps.map(i => moment.unix(i).format("DD/MM")) : [];
    // console.log("config:",configGross);

    configNet.series[0].data = this.props.dashboardSummaryReport ? this.props.dashboardSummaryReport.netProfits: [];
    configNet.xAxis.categories = this.props.dashboardSummaryReport.timestamps ? this.props.dashboardSummaryReport.timestamps.map(i => moment.unix(i).format("DD/MM")) : [];
    // console.log("configNet:",configNet);

    var TL = '₺';
    var netProfitPercent = (this.props.dashboardSummaryReport.netProfit *100)/this.props.dashboardSummaryReport.grossProfit;
    var discountPercent = (this.props.dashboardSummaryReport.discount *100)/this.props.dashboardSummaryReport.grossProfit;
    var saleCountPercent = (this.props.dashboardSummaryReport.saleCount *100)/this.props.dashboardSummaryReport.itemCount;
    var saleCountText = this.props.dashboardSummaryReport.saleCount + '/' + this.props.dashboardSummaryReport.itemCount;
    // TODO: update this percentage for basketPercent
    var basketPercent = (this.props.dashboardSummaryReport.saleCount *100)/this.props.dashboardSummaryReport.itemCount;

    const columns = [
      {
        title: 'Toplam Kazanç',
        dataIndex: 'grossProfit',
        key: 'grossProfit',
      },
      {
        title: 'Net Kazanç',
        dataIndex: 'netProfit',
        key: 'netProfit',
      },
      {
        title: 'Satış Sayısı',
        dataIndex: 'saleCount',
        key: 'saleCount',
      },
      {
        title: 'Ürün Sayısı',
        dataIndex: 'itemCount',
        key: 'itemCount',
      },
      {
        title: 'Müşteri Sayısı',
        dataIndex: 'customerCount',
        key: 'customerCount',
      },
      {
        title: 'İndirim',
        dataIndex: 'discount',
        key: 'discount',
      },
      {
        title: 'Sepet Değeri',
        dataIndex: 'basketValue',
        key: 'basketValue',
        render: (text) => <div>{text.toFixed(2)}</div>
      },
      {
      title: 'Tarih',
      dataIndex: 'timestamp',
      key: 'timestamp',
      render: (text) => <div>{moment.unix(text).format('DD/MM/YYYY')}</div>
    }];

    return (
      <div>
        <div >
          <Row gutter={12}>

            <Col span={4} >

              <Card style={{textAlign : 'center'}}>
                <div>
                Toplam Kazanç
                </div>
                <Divider/>
                <Progress type="circle" percent={100} format={() => this.props.dashboardSummaryReport.grossProfit + TL}  />
              </Card>

            </Col>

            <Col span={4}>

              <Card style={{textAlign : 'center'}}>
                Net Kazanç
                <Divider/>
                <Progress type="circle" percent={netProfitPercent} format={() => this.props.dashboardSummaryReport.netProfit + TL} />
              </Card>

            </Col>

            <Col span={4}>

              <Card style={{textAlign : 'center'}}>
                İndirim
                <Divider/>
                <Progress type="circle" percent={discountPercent} format={() => this.props.dashboardSummaryReport.discount + TL} />
              </Card>

            </Col>

            <Col span={4}>

              <Card style={{textAlign : 'center'}}>
                Sepet Değeri
                <Divider/>
                <Progress type="circle" percent={basketPercent} format={() => this.props.dashboardSummaryReport.basketSize ? this.props.dashboardSummaryReport.basketSize.toFixed(2) + TL: '' } />
              </Card>

            </Col>

            <Col span={4}>

              <Card style={{textAlign : 'center'}}>
                Satış/Ürün Sayısı
                <Divider/>
                <Progress status="exception" type="circle" percent={saleCountPercent} format={() => saleCountText } />
              </Card>

            </Col>

            <Col span={4}>

              <Card style={{textAlign : 'center'}}>
                Müşteri Sayısı
                <Divider/>
                <Progress type="circle" percent={0} format={() => this.props.dashboardSummaryReport.customerCount } />
              </Card>

            </Col>



          </Row>
        </div>
        {/*<br />*/}

        <div style={{marginTop:'20px'}}>

          <Row >
            <Col span={24}>

              <Card
                tabList={tabListNoTitle}
                activeTabKey={this.state.noTitleKey}
                onTabChange={(key) => { this.onTabChange(key, 'noTitleKey'); }}
              >
                {contentListNoTitle[this.state.noTitleKey]}
              </Card>

            </Col>

            {/*<Col span={6}>*/}



            {/*</Col>*/}


          </Row>
        </div>
        <div style={{marginTop:'25px'}}>
          <Row>
            <Table dataSource={this.props.dashboardSummaryReport.asObject ? this.props.dashboardSummaryReport.asObject.items : []  }
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
                   title={() => <div style={{fontWeight:'bold', fontSize:'16px', textAlign:'center'}}>Satış Özet Listesi</div>}
                   footer={() => <div ><Button type="primary" icon="download" >Excel indir</Button></div>}
            />
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
