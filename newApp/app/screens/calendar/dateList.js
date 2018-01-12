import React from 'react';
import { Text, View, StyleSheet, Image, ScrollView, Button, TouchableOpacity } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import gStyles, { defaults } from 'newApp/app/config/globalStyles';
import moment from 'moment';
import { approveDate, confirmShowed } from 'newApp/app/redux/actions/dates';

class DateList extends React.Component {

  renderMessage(screen, to, from, date){
    let view;



      if(screen === 'pending'){
        if(to) view = (
          <Text style={{color: defaults.green}}>Waiting your approval</Text>
        );
        else view = (
          <Text style={{color: defaults.red}}>Waiting for approval</Text>
        );
        
      // case 'completed':
      }else if(screen === 'approved'){
        if((!date.fromShowed && to) || (!date.toShowed && from))view = (<Text style={{color: defaults.green}}>Confirm your date showed</Text>)
        else if((date.fromShowed && to) || (date.toShowed && from))view = (<Text style={{color: defaults.red}}>Waiting for your date to confirm</Text>)
      }else if(screen = 'completed'){
        view = (<Text style={{color: defaults.green}}>Completed!</Text>)
      }

    return view;
  }

  renderSubmitButton(screen, to, from, date){
    let view;

    if(screen === 'pending' && to){
      view = (
        <TouchableOpacity style={{padding: 10, backgroundColor: defaults.green, borderRadius: 10}} onPress={() => this.props.approveDate(date._id)}>
          <Text style={{color: 'white'}}>Approve</Text>
        </TouchableOpacity>
      )
    }else if(screen === 'approved'){
        console.log(date);
        if((!date.fromShowed && to) || (!date.toShowed && from))view = (
           <TouchableOpacity style={{padding: 10, backgroundColor: defaults.green, borderRadius: 10}} onPress={() => this.props.confirmShowed(date._id, date.chatId)}>
            <Text style={{color: 'white'}}>Confirm</Text>
          </TouchableOpacity>
        )
      }

    return view;
  }
 
  render() {
    let { user, screen } = this.props;
    return (
      <ScrollView style={styles.container}>
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
              <View style={{alignItems: 'center', flexDirection: 'row'}}>
                <View style={styles.dateTime}>
                  <Text style={styles.month}>{moment(date.time).format('MMM D')}</Text>
                  <Text>{moment(date.time).format('h:mm a')}</Text>
                </View>
                <View style={styles.userInfo}>
                  <Text>{defaults.capitalize(dateUser.profile.displayName)}</Text>
                  <Text>{date.location.name}</Text>
                  <Text>{date.location.location.address1}</Text>
                  {this.renderMessage(screen, to, from, date)}
                </View>
              </View>
              <View style={styles.submitButton}>
                  {this.renderSubmitButton(screen, to, from, date)}
              </View>
            </View>
          )            
        })}
        
      </ScrollView>
    )
  }

}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1
  },
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
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomColor: '#eee'
  },
  submitButton: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  userInfo: {
    padding: 10
  }
})

export default connect(
  (state) => ({}), 
  (dispatch) => (bindActionCreators({approveDate, confirmShowed}, dispatch))
)(DateList);

