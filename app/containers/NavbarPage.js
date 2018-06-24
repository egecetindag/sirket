import React, { Component } from 'react';
import Navbar from '../components/Navbar';

type Props = {};

export default class NavbarPage extends Component<Props> {
  props: Props;

  render() {
    return <Navbar />;
  }
}