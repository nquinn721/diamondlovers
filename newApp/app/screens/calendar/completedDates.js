import React from 'react';
import { Text, View, StyleSheet, ScrollView } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Config from 'newApp/app/config/config';
import { Button } from 'react-native-elements';
import moment from 'moment';
import gStyles from 'newApp/app/config/globalStyles';

class ApprovedDates extends React.Component {

 
  render() {
    if(!this.props.dates.length)return <Text>No dates have been completed yet</Text>;
    return (
      <ScrollView style={gStyles.container}>
        {this.props.dates.map((date, i) => {
          return (
            <View key={i} style={styles.date}>
              <Text>{date.from.profile.displayName}</Text>
              <Text>{date.location.name}</Text>
              <Text>{date.location.location.address1}</Text>
              <Text>{moment(date.time).format('MMMM Do YYYY, h:mm a')}</Text>
              
            </View>
          )            
        })}
      </ScrollView>
    )
  }

}

const styles = StyleSheet.create({
})




export default connect(
  (state) => ({dates: state.dates.completedDates}), 
  // (dispatch) => (bindActionCreators({userServiceCall, selectUser}, dispatch))
)(ApprovedDates);