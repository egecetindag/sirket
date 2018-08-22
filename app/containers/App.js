// @flow
import * as React from 'react';
import '../assets/styles/stock.css'
import { Login } from './Login'
import { connect } from 'react-redux';
import { loginCheck } from '../actions/AuthActions'
import { Spin, Icon } from 'antd';
const antIcon = <Icon type="loading" style={{ fontSize: '4em' }} spin />;
type Props = {
  children: React.Node
};

class App extends React.Component<Props> {
  props: Props;
  componentDidMount() {
    this.props.loginCheck();
  }
  render() {
    if (this.props.loginCheckSuccess === true ) {
      return (<div>{this.props.children}</div>)
    }
    else if (this.props.loginCheckSuccess === 'loading') {
      return (<Spin style={{height:'90vh', display:'flex', justifyContent:'center', alignItems:'center'}}indicator={antIcon} />)
    }
    else {
      return <Login />
    }
  }
}
function mapStateToProps({ authReducer }) {
  const { loginCheckSuccess, loginCheckRequest } = authReducer;
  return {
    loginCheckSuccess,
  }
}

const ConnectedPage = connect(mapStateToProps, { loginCheck })(App);
export { ConnectedPage as App }
