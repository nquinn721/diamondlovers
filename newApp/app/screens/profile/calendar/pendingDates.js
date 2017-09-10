import React from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Config from 'newApp/app/config/config';
import { Button } from 'react-native-elements';
import moment from 'moment';
import gStyles from 'newApp/app/config/globalStyles';
import { agreeToDate } from 'newApp/app/redux/actions/dates';


class PendingDates extends React.Component {
  approveDate(id){
    this.props.agreeToDate(id);
  }

  render() {
    if(!this.props.dates.length)return <Text>No dates yet</Text>;
    console.log(this.props);
    
    return (
      <View style={styles.container}>
        {this.props.dates.map((date, i) => {
          return (
            <View key={i} style={styles.date}>
              <Text>{date.from.profile.displayName}</Text>
              <Text>{date.location.name}</Text>
              <Text>{date.location.location.address1}</Text>
              <Text>{moment(date.time).format('MMMM Do YYYY, h:mm a')}</Text>
              <Button 
                raised 
                buttonStyle={gStyles.button} 
                title="Approve Date"
                onPress={() => this.approveDate(date._id)}
                />
            </View>
          )            
        })}
        
      </View>
    )
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  date: {
    padding: 10,
    borderBottomWidth: 2,
    borderBottomColor: '#aaa'
  }
})




export default connect(
  (state) => ({dates: state.dates.dates.filter(d => d.status === 'pending')}), 
  (dispatch) => (bindActionCreators({agreeToDate}, dispatch))
)(PendingDates);