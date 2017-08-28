import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Navigator } from './config/router';
import { Constants } from 'expo';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { addNavigationHelpers } from 'react-navigation';
import { login } from './redux/actions/login';

const NavApp = ({dispatch, nav}) => {
  <Navigator
    navigation={addNavigationHelpers({
      dispatch,
      state: nav
    })}
  />
}

const AppWithNavigation = connect((state) => ({nav: state.nav}))(NavApp);



class App extends React.Component{
  componentDidMount(){
    this.props.login();

  }
  render(){
    return (
      <View style={styles.container}>
        <View style={styles.statusBar}></View>
        {this.props.user.notFound && <Text>Can't login</Text>}
        <AppWithNavigation />
      </View>
      );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  statusBar: {
    height: Constants.statusBarHeight,
    backgroundColor:'#e74c3c'
  }
})




export default connect(
  (state) => ({user: state.user}), 
  (dispatch) => (bindActionCreators({login}, dispatch))
)(App);