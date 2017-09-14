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
    return (<View><Text style={styles.black}>Hello</Text></View>)
    if(!this.props.dates.length)return <Text>No dates yet</Text>;
    let {user} = this.props.user;

    return (
      <ScrollView style={gStyles.container}>
        {this.props.dates.map((date, i) => {
          let to, from, u, dateUser, showed;
          console.log(user._id, date);
          if(date.from._id === user._id){
            from = true;
            u = date.from;
            dateUser = date.to;
          }else{
            to = true;
            u = date.to;
            dateUser = date.from;
          }
          return (
            <View key={i} style={styles.date}>
              <Text>{dateUser.profile.displayName}</Text>
              <Text>{date.location.name}</Text>
              <Text>{date.location.location.address1}</Text>
              <Text>{moment(date.time).format('MMMM Do YYYY, h:mm a')}</Text>
              {to ? <Button 
                raised 
                buttonStyle={gStyles.button} 
                title="Approve Date"
                onPress={() => this.approveDate(date._id)}
                /> : <Text>Waiting for {dateUser.profile.displayName} to approve your date!</Text>}
            </View>
          )            
        })}
        
      </ScrollView>
    )
  }

}

const styles = StyleSheet.create({
  black: {
    color: 'black'
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