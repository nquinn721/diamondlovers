import React from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { Constants } from 'expo';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { login } from './redux/actions/login';
import Nav from './components/nav';
import gStyles from './config/globalStyles';
import Loader from './screens/loading';
import Login from './screens/login';

class App extends React.Component{
  componentDidMount(){
    this.props.login();
  }

  
  render(){
    const {isFetching} = this.props.user;
    return (
      <View style={gStyles.container}>
        <View style={styles.statusBar}></View>
        {isFetching ? 
          <Loader /> : 
          <Login.Choose />
        }
      </View>
      );
  }
}

          // <Nav />

const styles = StyleSheet.create({
  statusBar: {
    height: Constants.statusBarHeight,
    backgroundColor:'white'
  }
})




export default connect(
  (state) => ({user: state.user}), 
  (dispatch) => (bindActionCreators({login}, dispatch))
)(App);