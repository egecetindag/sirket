import React, { Component } from 'react';
import { Card, Col, Form, Row, Tooltip, Icon,Divider } from "antd";
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

    var configForBar = {
      title: "",
      xAxis: {
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
      },
      plotOptions: {
        series: {
          allowPointSelect: true
        }
      },
      series: [{
        name : "Ödeme",
        data: [29.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 95.6, 54.4]
      },{
        name : "Masraf",
        data: [119.9, 81.5, 156.4, 180.2, 155.0, 216.0, 85.6, 118.5, 116.4, 144.1, 195.6, 154.4]
      }]
    };

    var configForPie = {
      chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: 'pie'
      },
      title: {
        text: ''
      },
      tooltip: {
        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
      },
      plotOptions: {
        pie: {
          allowPointSelect: true,
          cursor: 'pointer',
          dataLabels: {
            enabled: true,
            format: '<b>{point.name}</b>: {point.percentage:.1f} %',
            style: {
              color: (ReactHighcharts.theme && ReactHighcharts.theme.contrastTextColor) || 'black'
            }
          }
        }
      },
      series: [{
        name: 'Brands',
        colorByPoint: true,
        data: [{
          name: 'Ödenmiş',
          y: 61.41,
          sliced: true,
          selected: true
        }, {
          name: 'Gecikme',
          y: 31.84
        }, {
          name: 'Bekliyor',
          y: 7.85
        }]
      }]
    }

    console.log("dates: ", this.props.dates);

    configGross.series[0].data = this.props.dashboardSummaryReport ? this.props.dashboardSummaryReport.grossProfits: [];
    configGross.xAxis.categories = this.props.dashboardSummaryReport.timestamps ? this.props.dashboardSummaryReport.timestamps.map(i => moment.unix(i).format("DD/MM")) : [];
    console.log("config:",configGross);

    configNet.series[0].data = this.props.dashboardSummaryReport ? this.props.dashboardSummaryReport.netProfits: [];
    configNet.xAxis.categories = this.props.dashboardSummaryReport.timestamps ? this.props.dashboardSummaryReport.timestamps.map(i => moment.unix(i).format("DD/MM")) : [];
    console.log("configNet:",configNet);

    return (
      <div>
        <div >
          <Row gutter={12}>
            <Col span={6} >
              <Card
                title={
                  <div >
                    Satış Sayısı&nbsp;
                    <Tooltip title="Verilen zaman diliminde yapılan toplam satış sayısı.">
                      <Icon type="question-circle-o" />
                    </Tooltip>
                  </div>}
                style={{textAlign : 'center'}}
              >
                {this.props.dashboardSummaryReport.saleCount}

              </Card>
            </Col>
            <Col span={6}>
              <Card
                title={
                  <div>
                    Ürün Sayısı&nbsp;
                    <Tooltip title="Satışlardaki toplam ürün sayısı.">
                      <Icon type="question-circle-o" />
                    </Tooltip>
                  </div>}
                style={{textAlign : 'center'}}
              >
                {this.props.dashboardSummaryReport.itemCount}

              </Card>
            </Col>
            <Col span={6}>
              <Card
                title={
                  <div>
                    Müşteri Sayısı&nbsp;
                    <Tooltip title="Toplam satış yapılan müşteri sayısı.">
                      <Icon type="question-circle-o" />
                    </Tooltip>
                  </div>}
                style={{textAlign : 'center'}}
              >
                {this.props.dashboardSummaryReport.customerCount}

              </Card>
            </Col>
            <Col span={6}>
              <Card
                title={
                  <div>
                    İndirim Miktarı&nbsp;
                    <Tooltip title="Yapılan toplam indirim miktarı.">
                      <Icon type="question-circle-o" />
                    </Tooltip>
                  </div>}
                style={{textAlign : 'center'}}
              >
                {this.props.dashboardSummaryReport.discount} ₺

              </Card>
            </Col>
          </Row>
        </div>
        {/*<br />*/}

        <div style={{marginTop:'20px'}}>
        {/*<div>*/}
          {/*<Row gutter={12}>*/}
            {/*<Col span={6}>*/}
              {/*<Card*/}
                {/*title={*/}
                  {/*<div>*/}
                    {/*Sepet Boyu&nbsp;*/}
                    {/*<Tooltip title="Sepetteki ürün sayısı.">*/}
                      {/*<Icon type="question-circle-o" />*/}
                    {/*</Tooltip>*/}
                  {/*</div>}*/}
                {/*style={{textAlign : 'center'}}*/}
              {/*>*/}
                {/*{this.props.dashboardSummaryReport.basketSize ? this.props.dashboardSummaryReport.basketSize.toFixed(2): ''}*/}

              {/*</Card>*/}
            {/*</Col>*/}
            {/*<Col span={6}>*/}
              {/*<Card*/}
                {/*title={*/}
                  {/*<div>*/}
                    {/*Sepet Değeri&nbsp;*/}
                    {/*<Tooltip title="Sepetteki ürünlerin toplam değeri.">*/}
                      {/*<Icon type="question-circle-o" />*/}
                    {/*</Tooltip>*/}
                  {/*</div>}*/}
                {/*style={{textAlign : 'center'}}*/}
              {/*>*/}
                {/*{this.props.dashboardSummaryReport.basketValue ? this.props.dashboardSummaryReport.basketValue.toFixed(2) : ''}*/}

              {/*</Card>*/}
            {/*</Col>*/}
            {/*<Col span={6}>*/}
              {/*<Card*/}
                {/*title={*/}
                  {/*<div>*/}
                    {/*Sepet Boyu&nbsp;*/}
                    {/*<Tooltip title="Sepetteki ürün sayısı.">*/}
                      {/*<Icon type="question-circle-o" />*/}
                    {/*</Tooltip>*/}
                  {/*</div>}*/}
                {/*style={{textAlign : 'center'}}*/}
              {/*>*/}
                {/*{this.props.dashboardSummaryReport.basketSize ? this.props.dashboardSummaryReport.basketSize.toFixed(2): ''}*/}

              {/*</Card>*/}
            {/*</Col>*/}
            {/*<Col span={6}>*/}
              {/*<Card*/}
                {/*title={*/}
                  {/*<div>*/}
                    {/*Sepet Değeri&nbsp;*/}
                    {/*<Tooltip title="Sepetteki ürünlerin toplam değeri.">*/}
                      {/*<Icon type="question-circle-o" />*/}
                    {/*</Tooltip>*/}
                  {/*</div>}*/}
                {/*style={{textAlign : 'center'}}*/}
              {/*>*/}
                {/*{this.props.dashboardSummaryReport.basketValue ? this.props.dashboardSummaryReport.basketValue.toFixed(2) : ''}*/}

              {/*</Card>*/}
            {/*</Col>*/}
          {/*</Row>*/}
          {/*<br />*/}

          {/*<Divider />*/}
          <Row >
            <Col span={18}>

              <Card
                tabList={tabListNoTitle}
                activeTabKey={this.state.noTitleKey}
                onTabChange={(key) => { this.onTabChange(key, 'noTitleKey'); }}
              >
                {contentListNoTitle[this.state.noTitleKey]}
              </Card>

            </Col>

            <Col span={6}>

              <div style={{marginLeft:'10px'}}>
                <Card
                  title={
                    <div>
                      Bürüt Kazanç&nbsp;
                      <Tooltip title="">
                        <Icon type="question-circle-o" />
                      </Tooltip>
                    </div>}
                  style={{textAlign : 'center'}}
                >
                {this.props.dashboardSummaryReport.grossProfit} ₺

                </Card>

                <Card
                  title={
                    <div>
                      Net Kazanç&nbsp;
                      <Tooltip title="">
                        <Icon type="question-circle-o" />
                      </Tooltip>
                    </div>}
                  style={{textAlign : 'center'}}
                >

                  {this.props.dashboardSummaryReport.netProfit} ₺

                </Card>

                <Card
                  title={
                    <div>
                      Sepet Değeri&nbsp;
                      <Tooltip title="Sepetteki ürünlerin toplam değeri.">
                        <Icon type="question-circle-o" />
                      </Tooltip>
                    </div>}
                  style={{textAlign : 'center'}}
                >
                  {this.props.dashboardSummaryReport.basketValue ? this.props.dashboardSummaryReport.basketValue.toFixed(2) : ''} ₺

                </Card>

                <Card
                title={
                <div>
                Sepet Boyu&nbsp;
                <Tooltip title="Sepetteki ürün sayısı.">
                <Icon type="question-circle-o" />
                </Tooltip>
                </div>}
                style={{textAlign : 'center'}}
                >
                {this.props.dashboardSummaryReport.basketSize ? this.props.dashboardSummaryReport.basketSize.toFixed(2): ''}

                </Card>


              </div>
              {/*<Card title="Toplam Sonuç" bordered={false}>*/}
                {/*<ul>*/}
                  {/*<li><b>Total Satış</b>*/}
                    {/*<div>*/}
                      {/*{this.props.dashboardSummaryReport.grossProfit}*/}
                    {/*</div>*/}
                  {/*</li>*/}
                  {/*<li><b>Total Satış</b>*/}
                    {/*<div>*/}
                      {/*{this.props.dashboardSummaryReport.grossProfit}*/}
                    {/*</div>*/}
                  {/*</li>*/}
                {/*</ul>*/}
                {/*<b>En düşük:</b> {this.props.dashboardSummaryReport.grossProfit} <br />*/}
                {/*<b>En yüksek:</b> {this.props.dashboardSummaryReport.grossProfit} <br />*/}
              {/*</Card>*/}

          </Col>

          </Row>

          {/*<Divider />*/}


          {/*<Row>*/}

            {/*<Col span={14}>*/}

              {/*<Card title="Ödemeler & Masraf" bordered={false}>*/}

                {/*<ReactHighcharts config={configForBar} />*/}

              {/*</Card>*/}

            {/*</Col>*/}

            {/*<Col span={10}>*/}

              {/*<Card title="" bordered={false}>*/}

                {/*<ReactHighcharts config={configForPie} />*/}

              {/*</Card>*/}

            {/*</Col>*/}

          {/*</Row>*/}


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
