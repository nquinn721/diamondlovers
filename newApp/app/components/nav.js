import React from 'react'
// Navigation
import { addNavigationHelpers } from 'react-navigation'
import { TabBar } from '../config/router'
//Redux
import { connect } from 'react-redux'


const mapStateToProps = (state) => {
 return {
    navigationState: state.nav,
  }
}
class TabBarNavigation extends React.Component {
render(){
    const { dispatch, navigationState } = this.props
    return (
      <TabBar
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
export default connect(mapStateToProps)(TabBarNavigation)