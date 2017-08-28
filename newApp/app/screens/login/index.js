import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

class HomeScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
      	<Text>Login</Text>
      </View>
    )
  }

}

const styles = StyleSheet.create({
  
})




export default connect(
  // (state) => ({users: state.users}), 
  // (dispatch) => (bindActionCreators({userServiceCall, selectUser}, dispatch))
)(HomeScreen);