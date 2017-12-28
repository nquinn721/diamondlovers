import React from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { Constants } from 'expo';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import gStyles from './config/globalStyles';
import Loader from './screens/loading';
import LoginStack from './config/loginRouter';
import Nav from 'newApp/app/components/nav';

class App extends React.Component{
  
  render(){
    let isFetching = false,
        isLoggedIn = this.props.user && this.props.user.user;

    return (
      <View style={gStyles.container}>
        <View style={styles.statusBar}></View>
        {isFetching ? 

          <Loader /> : isLoggedIn ? <Nav /> : <LoginStack />
        }
      </View>
      );
  }
}

const styles = StyleSheet.create({
  statusBar: {
    height: Constants.statusBarHeight,
    backgroundColor:'white'
  }
})




export default connect(
  (state) => ({user: state.user}), 
  // (dispatch) => (bindActionCreators({login}, dispatch))
)(App);