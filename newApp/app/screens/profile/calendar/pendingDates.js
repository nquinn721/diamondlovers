import React from 'react';
import { Text, View, StyleSheet, ScrollView } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Config from 'newApp/app/config/config';
import { Button } from 'react-native-elements';
import moment from 'moment';
import gStyles from 'newApp/app/config/globalStyles';
import { approveDate } from 'newApp/app/redux/actions/dates';


class PendingDates extends React.Component {
  approveDate(id){
    this.props.approveDate(id);
  }

  render() {
    if(!this.props.dates.length)return <Text>No dates yet</Text>;
    let {user} = this.props.user;

    return (
      <ScrollView style={styles.container}>
        {this.props.dates.map((date, i) => {
          let to, from, u, dateUser, showed;

          if(date.from._id === user._id){
            from = true;
            u = date.from;
            dateUser = date.to;
            dateShowed = date.toShowed;
          }else{
            to = true;
            u = date.to;
            dateUser = date.from;
            dateShowed = date.fromShowed;
          }
          return (
            <View key={i} style={styles.date}>
              <Text>{dateUser.profile.displayName}</Text>
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
        
      </ScrollView>
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
  (state) => ({dates: state.dates.pendingDates, user: state.user}), 
  (dispatch) => (bindActionCreators({approveDate}, dispatch))
)(PendingDates);