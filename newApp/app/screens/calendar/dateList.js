import React from 'react';
import { Text, View, StyleSheet, Image, ScrollView, Button } from 'react-native';
import gStyles from 'newApp/app/config/globalStyles';
import { defaults } from 'newApp/app/config/globalStyles';
import moment from 'moment';

export default class DateList extends React.Component {

  renderMessage(to, from){
    let screen = this.props.screen,
      view;

    switch(screen){
      case 'pending':

      case 'approved':
      case 'completed':

    }

    return view;
  }
 
  render() {
    let user = this.props.user;
    return (
      <ScrollView style={gStyles.container}>
        {this.props.dates.map((date, i) => {
          let to, from, u, dateUser, showed;
          
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
              <View style={styles.dateTime}>
                <Text style={styles.month}>{moment(date.time).format('MMM D')}</Text>
                <Text>{moment(date.time).format('h:mm a')}</Text>
              </View>
              <View style={styles.userInfo}>
                <Text>{dateUser.profile.displayName}</Text>
                <Text>{date.location.name}</Text>
                <Text>{date.location.location.address1}</Text>
                {this.renderMessage(to, from)}
              </View>
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
  dateTime: {
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderRightWidth: 1,
    borderRightColor: '#eee',

  },
  month: {
    fontSize: 18
  },
  date: {
    padding: 10,
    borderBottomWidth: 2,
    flexDirection: 'row',
    borderBottomColor: '#eee'
  },
  userInfo: {
    padding: 10
  }
})

