import React, { Component } from 'react';
import { Card, Col, Form, Row } from "antd";
// import { Chart, ArgumentAxis, ValueAxis, LineSeries } from "@devexpress/dx-react-chart-material-ui";
import ReactHighcharts from 'react-highcharts';
import Highlight from 'react-highlight';
import {retrieveSummaryDashboardReport} from '../../actions/ReportActions'
import { connect } from 'react-redux';
const { Meta } = Card;

const config = {
  title:"",
  xAxis: {
    categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  },
  series: [{
    data: [29.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 295.6, 300]
  }]
};


class SummaryDashboard extends Component<Props> {
  props: Props
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  componentDidMount(){
    this.props.retrieveSummaryDashboardReport(0,1534950259);
  }
  
  render() {


    return (
      <div>
        <div style={{ background: '#ECECEC', padding: '30px' }}>
          <Row gutter={16}>
            <Col span={8}>
              <Card title="Card title1" bordered={false}>

                <ReactHighcharts config={config} />

                {/*<Meta*/}
                  {/*// avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}*/}
                  {/*title="Card title"*/}
                  {/*description="This is the description"*/}
                {/*/>*/}

              </Card>
            </Col>
            <Col span={8}>
              <Card title="Card title" bordered={false}>

                <ReactHighcharts config={config} />

              </Card>
            </Col>
            <Col span={8}>
              <Card title="Card title" bordered={false}>

                <ReactHighcharts config={config} />

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
