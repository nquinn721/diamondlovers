import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

class Charge extends React.Component {
  render() {
    return (
      <View style={styles.container}>
      	<Text>Purchase</Text>
      </View>
    )
  }

}

const styles = StyleSheet.create({
  
})




export default connect(
  // (state) => ({users: state.users}), 
  // (dispatch) => (bindActionCreators({userServiceCall, selectUser}, dispatch))
)(Charge);