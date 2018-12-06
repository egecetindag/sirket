// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styles from './Home.css';
import { Button, Select, Menu, Icon } from 'antd'
import 'antd/dist/antd.css'
import history from '../store/configureStore'
const Option = Select.Option;
type Props = {};

export default class Home extends Component<Props> {
  props:Props


  render() {
    return (
      <div>
        Home
      </div>
        );
      }
    }
