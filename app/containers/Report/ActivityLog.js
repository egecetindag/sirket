import React, { Component } from 'react';
import moment from "moment";
import { Button, Form, Icon, Popconfirm,Input, Table,Row, Timeline } from "antd";
const Search = Input.Search;
// import {retrieveActivityLog} from '../../actions/ReportActions'
import connect from "react-redux/es/connect/connect";
import {
  createPayment,
  deletePayment,
  retrievePayments,
  setPaymentStatus,
  updatePayment
} from "../../actions/PaymentActions";
import { retrieveDealers } from "../../actions/DealerActions";

class ActivityLog extends Component<Props> {
  props: Props
  constructor(props) {
    super(props);
    this.state = {
      // name : '',
      // selected: {},
      // searchType : 'barcode'
    }
  }

  componentDidMount(){
    // this.props.retrieveActivityLog('','','');
  }


  render() {


    return (
      <div>
        <div className='page-header'>

          <h3>Activity Logs</h3>

        </div>


        <div>

          <Timeline>
            <Timeline.Item>Create a services site 2015-09-01</Timeline.Item>
            <Timeline.Item>Solve initial network problems 2015-09-01</Timeline.Item>
            <Timeline.Item dot={<Icon type="clock-circle-o" style={{ fontSize: '16px' }} />} color="red">Technical testing 2015-09-01</Timeline.Item>
            <Timeline.Item>Network problems being solved 2015-09-01</Timeline.Item>
            <Timeline.Item dot={<Icon type="user" style={{ fontSize: '16px' }} />}>Create a services site 2015-09-01</Timeline.Item>
            <Timeline.Item color="green">Solve initial network problems 2015-09-01</Timeline.Item>
            <Timeline.Item dot={<Icon type="exclamation-circle-o" style={{ fontSize: '16px' }} />}>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, doloremque laudantium, totam rem aperiam</Timeline.Item>
            <Timeline.Item color="red">Network problems being solved 2015-09-01</Timeline.Item>
            <Timeline.Item>Create a services site 2015-09-01</Timeline.Item>
            <Timeline.Item dot={<Icon type="check" style={{ fontSize: '16px' }} />}>Technical testing 2015-09-01</Timeline.Item>
            <Timeline.Item>Create a services site 2015-09-01</Timeline.Item>
            <Timeline.Item>Solve initial network problems 2015-09-01</Timeline.Item>
            <Timeline.Item dot={<Icon type="clock-circle-o" style={{ fontSize: '16px' }} />} color="red">Technical testing 2015-09-01</Timeline.Item>
            <Timeline.Item>Network problems being solved 2015-09-01</Timeline.Item>
            <Timeline.Item>Create a services site 2015-09-01</Timeline.Item>
            <Timeline.Item color="green">Solve initial network problems 2015-09-01</Timeline.Item>
            <Timeline.Item dot={<Icon type="exclamation-circle-o" style={{ fontSize: '16px' }} />}>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, doloremque laudantium, totam rem aperiam</Timeline.Item>
            <Timeline.Item color="red">Network problems being solved 2015-09-01</Timeline.Item>
            <Timeline.Item>Create a services site 2015-09-01</Timeline.Item>
            <Timeline.Item dot={<Icon type="clock-circle-o" style={{ fontSize: '16px' }} />}>Technical testing 2015-09-01</Timeline.Item>
          </Timeline>,

        </div>

      </div>

    );
  }
}
function mapStateToProps({  }) {
  return {

  }
}

const ConnectedPage = connect (mapStateToProps,{})(ActivityLog);
const WrappedPage = Form.create()(ConnectedPage);
export { WrappedPage as ActivityLog }
