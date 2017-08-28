import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Tabs } from './config/router';
import { Constants } from 'expo';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { login } from './redux/actions/login';

class App extends React.Component{
  componentDidMount(){
    this.props.login();
  }
  render(){
    return (
      <View style={styles.container}>
        <View style={styles.statusBar}></View>
        <Tabs />
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


function mapStateToProps(state) {
  return {user: state.user}
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({login}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(App);