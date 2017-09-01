import React from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { Constants } from 'expo';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { login } from './redux/actions/login';
import { getNearby } from './redux/actions/nearby';
import Nav from './components/nav';
import gStyles from './config/globalStyles';


class App extends React.Component{
  componentDidMount(){
    this.props.login();
    if(this.props.user.isLoggedIn){
      this.props.getNearby();
    }
  }

  
  render(){
    console.log('render in App');
    
    const {isFetching} = this.props.user;
    return (
      <View style={gStyles.container}>
        <View style={styles.statusBar}></View>
        {isFetching ? 
          <View style={gStyles.containerCenter}><ActivityIndicator size="large" color="red"/></View> : 
          <Nav />
        }
      </View>
      );
  }
}


const styles = StyleSheet.create({
  statusBar: {
    height: Constants.statusBarHeight,
    backgroundColor:'#e74c3c'
  }
})




export default connect(
  (state) => ({user: state.user}), 
  (dispatch) => (bindActionCreators({login, getNearby}, dispatch))
)(App);