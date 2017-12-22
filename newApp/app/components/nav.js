import React from 'react'
// Navigation
import { addNavigationHelpers } from 'react-navigation'
import Nav from '../config/router'
//Redux
import { connect } from 'react-redux'


class TabBarNavigation extends React.Component {
render(){
    const { dispatch, navigationState } = this.props
    return (
      <Nav
        navigation={
          addNavigationHelpers({
            dispatch: dispatch,
            state: navigationState,
          })
        }
      />
    )
  }
}
export default connect(
  (state) => ({navigationState: state.nav })
)(TabBarNavigation)