import React, { Component } from 'react';
import { Button, Form, Icon, Popconfirm,Input, Table,Row, Timeline ,Divider} from "antd";
const Search = Input.Search;
import moment from 'moment';
import {retrieveActivityLog} from '../../actions/ReportActions'
import connect from "react-redux/es/connect/connect";


class ActivityLog extends Component<Props> {
  props: Props
  constructor(props) {
    super(props);
    this.state = {
      dates : [moment().subtract(30, 'days').unix(),moment().unix()]
    }
      // name : '',
      // selected: {},
      // searchType : 'barcode'

  }

  componentDidMount(){
    this.props.retrieveActivityLog(this.state.dates[0],this.state.dates[1],0);
  }


  render(){


    return (
      <div>
        <div className='page-header'>

          <h3>Activity Logs</h3>

        </div>


        <div>

          <Timeline>

            {
              this.props.activityLog.map(log =>

                <Timeline.Item>{log.description}</Timeline.Item>

              )
            }


            {/*<Timeline.Item>Create a services site 2015-09-01</Timeline.Item>*/}
            {/*<Timeline.Item>Solve initial network problems 2015-09-01</Timeline.Item>*/}
            {/*<Timeline.Item dot={<Icon type="clock-circle-o" style={{ fontSize: '16px' }} />} color="red">Technical testing 2015-09-01*/}
              {/*<Divider/>*/}
            {/*</Timeline.Item>*/}
            {/*<Timeline.Item>Network problems being solved 2015-09-01</Timeline.Item>*/}
            {/*<Timeline.Item dot={<Icon type="user" style={{ fontSize: '16px' }} />}>Create a services site 2015-09-01</Timeline.Item>*/}
            {/*<Timeline.Item color="green">Solve initial network problems 2015-09-01</Timeline.Item>*/}
            {/*<Timeline.Item dot={<Icon type="exclamation-circle-o" style={{ fontSize: '16px' }} />}>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, doloremque laudantium, totam rem aperiam</Timeline.Item>*/}
            {/*<Timeline.Item color="red">Network problems being solved 2015-09-01</Timeline.Item>*/}
            {/*<Timeline.Item>Create a services site 2015-09-01</Timeline.Item>*/}
            {/*<Timeline.Item dot={<Icon type="check" style={{ fontSize: '16px' }} />}>Technical testing 2015-09-01</Timeline.Item>*/}
            {/*<Timeline.Item>Create a services site 2015-09-01</Timeline.Item>*/}
            {/*<Timeline.Item>Solve initial network problems 2015-09-01</Timeline.Item>*/}
            {/*<Timeline.Item dot={<Icon type="clock-circle-o" style={{ fontSize: '16px' }} />} color="red">Technical testing 2015-09-01</Timeline.Item>*/}
            {/*<Timeline.Item>Network problems being solved 2015-09-01</Timeline.Item>*/}
            {/*<Timeline.Item>Create a services site 2015-09-01</Timeline.Item>*/}
            {/*<Timeline.Item color="green">Solve initial network problems 2015-09-01</Timeline.Item>*/}
            {/*<Timeline.Item dot={<Icon type="exclamation-circle-o" style={{ fontSize: '16px' }} />}>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, doloremque laudantium, totam rem aperiam</Timeline.Item>*/}
            {/*<Timeline.Item color="red">Network problems being solved 2015-09-01</Timeline.Item>*/}
            {/*<Timeline.Item>Create a services site 2015-09-01</Timeline.Item>*/}
            {/*<Timeline.Item dot={<Icon type="clock-circle-o" style={{ fontSize: '16px' }} />}>Technical testing 2015-09-01</Timeline.Item>*/}
          </Timeline>

        </div>

      </div>

    );
  }
}
function mapStateToProps({ reportReducer }) {
  const { activityLog } = reportReducer
  return {
      activityLog
  }
}

const ConnectedPage = connect (mapStateToProps,{retrieveActivityLog})(ActivityLog);
const WrappedPage = Form.create()(ConnectedPage);
export { WrappedPage as ActivityLog }
