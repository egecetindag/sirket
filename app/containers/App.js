// @flow
import * as React from 'react';
import '../assets/styles/stock.css'
import {Login} from './Login'
import { connect } from 'react-redux';

type Props = {
  children: React.Node
};

class App extends React.Component<Props> {
  props: Props;

  render() {
    console.log('aaaa',this.props.loginCheckSuccess)
    if (this.props.loginCheckSuccess) {
      return (<div>{this.props.children}</div>)
    }
    else {
      return <Login />
    }
  }
}
function mapStateToProps({authReducer }) {
  const {loginCheckSuccess} = authReducer;
  return {
      loginCheckSuccess,
  }
}

const ConnectedPage = connect(mapStateToProps, {})(App);
export { ConnectedPage as App }
