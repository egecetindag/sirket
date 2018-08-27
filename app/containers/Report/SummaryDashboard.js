import React, { Component } from 'react';
import { Card, Col, Row } from 'antd';
// import { Chart, ArgumentAxis, ValueAxis, LineSeries } from "@devexpress/dx-react-chart-material-ui";

class SummaryDashboard extends Component<Props> {
  props: Props
  constructor(props) {
    super(props);
    this.state = {

    }
  }
  
  render() {

    return (
      <div>
        <div style={{ background: '#ECECEC', padding: '30px' }}>
          <Row gutter={16}>
            <Col span={8}>
              <Card title="Card title1" bordered={false}>



              </Card>
            </Col>
            <Col span={8}>
              <Card title="Card title" bordered={false}>Card content</Card>
            </Col>
            <Col span={8}>
              <Card title="Card title" bordered={false}>Card content</Card>
            </Col>
          </Row>
        </div>
      </div>

    );
  }
}
function mapStateToProps({  }) {

  return {

  }
}

export { SummaryDashboard }
