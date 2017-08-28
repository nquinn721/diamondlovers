import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Constants } from 'expo';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { login } from './redux/actions/login';
import Nav from './components/nav';



class App extends React.Component{
  componentDidMount(){
    this.props.login();

    console.log(this.props);
  }
  render(){
    return (
      <View style={styles.container}>
        <View style={styles.statusBar}></View>
        <Nav />
        {this.props.user.notFound && <Text>Can't login</Text>}
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