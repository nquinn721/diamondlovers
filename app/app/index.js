import React from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { Constants } from 'expo';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import gStyles from './config/globalStyles';
import Loader from './screens/loading';
import LoginStack from './config/loginRouter';
import Nav from 'app/app/components/nav';
import { checkLoggedIn } from 'app/app/redux/actions/login';

class App extends React.Component{
  componentWillMount(){
    if(!this.props.user.notLoggedIn && !this.props.user.checkingLoggedIn){
      this.props.checkLoggedIn();
    }

  }

  render(){
    let { isFetching, loggedIn } = this.props.user;
    return (
      <View style={gStyles.container}>
        {
          isFetching ? <Loader /> : 
          loggedIn ? <Nav /> : <LoginStack />
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
  (dispatch) => (bindActionCreators({checkLoggedIn}, dispatch))
)(App);