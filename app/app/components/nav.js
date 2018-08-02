import React from 'react'
// Navigation
import { addNavigationHelpers } from 'react-navigation'
import Nav from '../config/router'
//Redux
import { connect } from 'react-redux'


class TabBarNavigation extends React.Component {
render(){
    const { dispatch, navigationState } = this.props;
    return (
      <Nav
      />
    )
  }
}
export default connect(
  (state) => ({navigationState: state.nav })
)(TabBarNavigation)