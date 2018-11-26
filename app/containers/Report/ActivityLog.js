import React, { Component } from 'react';
import { Button, Form, Icon, Popconfirm,Input, Table,Row, Timeline ,Divider} from "antd";
const Search = Input.Search;
import moment from 'moment';
import {retrieveActivityLog} from '../../actions/ReportActions'
import connect from "react-redux/es/connect/connect";

import {lang} from '../../services/config'


var typeIcons = {
  Sale: "shopping-cart",
  Stock: "shop",
  Payment: "credit-card",
  Receiving: "clock-circle-o",
  Expense: "shopping-cart"
  // etc.
};

var typeColors = {
  Sale: "green",
  Stock: "blue",
  Payment: "red",
  Receiving: "black",
  Expense: "red"
  // etc.
};

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

  componentWillReceiveProps(nextProps) {
    // You don't have to do this check first, but it can help prevent an unneeded render
    if (nextProps.dates !== this.props.dates) {
      this.props.retrieveActivityLog(nextProps.dates[0].unix(),nextProps.dates[1].unix());
    }
  }


  render(){


    return (
      <div>
        <div className='page-header'>

          <h3>Activity Logs </h3>

          <div>
            <Input placeholder={lang.choosePerson}/>
          </div>

        </div>


        <div>

          <Timeline style={{marginLeft:'10px'}}>

            {
              this.props.activityLog.map(log =>

                <Timeline.Item color={typeColors[log.activityType]} dot={<Icon type={typeIcons[log.activityType]} style={{ fontSize: '16px' }} />}>
                  <div style={{fontSize:'16px'}}>
                    {log.title}
                  </div>
                  <div style={{fontSize:'14px'}}>
                    {log.description}
                  </div>
                  <div style={{fontSize:'12px'}}>
                    <b>operator:</b> {log.user}, <b>{lang.date}:</b> {moment.unix(log.date).format('DD/MM/YYYY')}
                  </div>


                  </Timeline.Item>

              )
            }

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
