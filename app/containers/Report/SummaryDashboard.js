import React, { Component } from 'react';
import { Card, Col, Form, Row, Tooltip, Icon, Divider, Progress, Table, Button,message } from "antd";
// import { Chart, ArgumentAxis, ValueAxis, LineSeries } from "@devexpress/dx-react-chart-material-ui";
import ReactHighcharts from 'react-highcharts';
import Highlight from 'react-highlight';
import {retrieveSummaryDashboardReport} from '../../actions/ReportActions'
import { connect } from 'react-redux';
import moment from 'moment';
import { getDashboardReportExcel } from '../../services/ReportServices'
import { saveAs } from 'file-saver';
import {extractFileName} from "./ExtractFileName";
import {lang} from '../../services/config'

class SummaryDashboard extends Component<Props> {
  props: Props
  constructor(props) {
    super(props);
    this.state = {
      key: 'gross',
      noTitleKey: 'gross',
      downloading: '',
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

  handleDownload(first,last){

    //this.setState({ downloading: 'inProgress' });
    let self = this;

    getDashboardReportExcel(first,last).then((response) => {
     // console.log("Response", response);
      this.setState({ downloading: 'inProgress'});
      //extract file name from Content-Disposition header
      var filename=extractFileName(response.headers['content-disposition']);
      //console.log("File name",filename);
      //invoke 'Save As' dialog
      saveAs(response.data, filename)
      console.log("#1")
      this.setState({ downloading: 'done'});


    })
    //   .then(() => {
    //   if(this.state.downloading === 'done'){
    //     setTimeout(()=> {message.success('Dosya indirme tamamlandı',5)},200);
    //     this.setState({ downloading: ''});
    //   }

    // there is not a possible way to understand if it is downloaded or cancelled
    // so for now I give up showing success message

    // })

      .catch(function (error) {
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
        name: lang.netProfitFromSales,
        data: []
      }],
      credits:{
        enabled: false
      },
    };

    var tabListNoTitle = [{
      key: 'gross',
      tab: lang.totalEarnings,
    }, {
      key: 'net',
      tab: lang.netProfit,
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
        name: lang.totalEarningsFromSales,
        data: []
      }],
      credits:{
        enabled: false
      },
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

    var TL = lang.currency;
    var netProfitPercent = (this.props.dashboardSummaryReport.netProfit *100)/this.props.dashboardSummaryReport.grossProfit;
    var discountPercent = (this.props.dashboardSummaryReport.discount *100)/this.props.dashboardSummaryReport.grossProfit;
    var saleCountPercent = (this.props.dashboardSummaryReport.saleCount *100)/this.props.dashboardSummaryReport.itemCount;
    var saleCountText = this.props.dashboardSummaryReport.saleCount + '/' + this.props.dashboardSummaryReport.itemCount;
    // TODO: update this percentage for basketPercent
    var basketPercent = (this.props.dashboardSummaryReport.saleCount *100)/this.props.dashboardSummaryReport.itemCount;

    const columns = [
      {
        title: lang.totalEarnings,
        dataIndex: 'grossProfit',
        key: 'grossProfit',
      },
      {
        title: lang.netProfit,
        dataIndex: 'netProfit',
        key: 'netProfit',
      },
      {
        title: lang.numOfSale,
        dataIndex: 'saleCount',
        key: 'saleCount',
      },
      {
        title: lang.numOfProduct,
        dataIndex: 'itemCount',
        key: 'itemCount',
      },
      {
        title: lang.numOfCustomer,
        dataIndex: 'customerCount',
        key: 'customerCount',
      },
      {
        title: lang.discount,
        dataIndex: 'discount',
        key: 'discount',
      },
      {
        title: lang.basketValue,
        dataIndex: 'basketValue',
        key: 'basketValue',
        render: (text) => <div>{text.toFixed(2)}</div>
      },
      {
      title: lang.date,
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
                {lang.totalEarnings}
                </div>
                <Divider/>
                <Progress type="circle" percent={100} format={() => this.props.dashboardSummaryReport.grossProfit + TL}  />
              </Card>

            </Col>

            <Col span={4}>

              <Card style={{textAlign : 'center'}}>
                {lang.netProfit}
                <Divider/>
                <Progress type="circle" percent={netProfitPercent} format={() => this.props.dashboardSummaryReport.netProfit + TL} />
              </Card>

            </Col>

            <Col span={4}>

              <Card style={{textAlign : 'center'}}>
                {lang.discount}
                <Divider/>
                <Progress type="circle" percent={discountPercent} format={() => this.props.dashboardSummaryReport.discount + TL} />
              </Card>

            </Col>

            <Col span={4}>

              <Card style={{textAlign : 'center'}}>
                {lang.basketValue}
                <Divider/>
                <Progress type="circle" percent={basketPercent} format={() => this.props.dashboardSummaryReport.basketValue ? this.props.dashboardSummaryReport.basketValue.toFixed(2) + TL: '' } />
              </Card>

            </Col>

            <Col span={4}>

              <Card style={{textAlign : 'center'}}>
                {lang.numOfSaleAndProduct}
                <Divider/>
                <Progress status="exception" type="circle" percent={saleCountPercent} format={() => saleCountText } />
              </Card>

            </Col>

            <Col span={4}>

              <Card style={{textAlign : 'center'}}>
                {lang.numberOfCustomer}
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
                   title={() => <div style={{fontWeight:'bold', fontSize:'16px', textAlign:'center'}}>{lang.saleSummaryList}</div>}
                   footer={() => <div ><Button onClick={() => this.handleDownload(this.props.dates[0].unix(),this.props.dates[1].unix())} type="primary" icon="download" >{lang.downloadExcel}</Button></div>}
                   //footer={() => <div ><a href="http://localhost/index.txt">Download </a> </div>}
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
