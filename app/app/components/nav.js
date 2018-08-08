import React from 'react';
import { View, Text } from 'react-native';
import Nav from '../config/router';
import { connect } from 'react-redux';


class TabBarNavigation extends React.Component {
render(){
    return (
      <Nav/>
    )
  }
}
export default connect()(TabBarNavigation)