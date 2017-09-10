import React from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Config from 'newApp/app/config/config';
import { Button } from 'react-native-elements';


class ApprovedDates extends React.Component {

 
  render() {
    return (
      <View style={styles.container}>
        
        
      </View>
    )
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})




export default connect(
  (state) => ({dates: state.dates.dates.filter(d => d.status === 'approved')}), 
  // (dispatch) => (bindActionCreators({userServiceCall, selectUser}, dispatch))
)(ApprovedDates);