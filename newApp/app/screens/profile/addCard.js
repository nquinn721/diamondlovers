import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

class HomeScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
      </View>
    )
  }

}

const styles = StyleSheet.create({
  
})




export default connect(
  // (state) => ({user: state.user}), 
  // (dispatch) => (bindActionCreators({userServiceCall, selectUser}, dispatch))
)(HomeScreen);