import React from 'react';
import { Platform, Text, View, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Icon, Button, SearchBar } from 'react-native-elements';
import Config from 'app/app/config/config';
import DateTimePicker from 'react-native-modal-datetime-picker';
import moment from 'moment';
import Image from 'react-native-image-progress';
import { setDate } from 'app/app/redux/actions/dates';
import Splash from 'app/app/components/splash';
import gStyles, { defaults } from 'app/app/config/globalStyles';

class SetupDate extends React.Component {
  state = {
    isDateTimePickerVisible: false
  };


  showDateTimePicker = () => this.setState({ isDateTimePickerVisible: true });
  hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });

  handleDatePicked = (dateSet) => {
    this.setState({dateSet, dateString: moment(dateSet).format('MMMM Do YYYY, h:mm a')});
    this.hideDateTimePicker();
  };

  submitDate(){
    this.props.setDate(this.state.userSwiped._id, this.props.user.user._id, this.state.pickedRestaurant, this.state.dateSet, this.state.dateCost);
    this.setState({showSplash: true});
  }

  renderSplash(){
    
    return (
      <Splash
        style={{height: 300}}
         content={() => {
            return (
              <View style={{padding: 15, justifyContent: 'space-between', flex: 1}}>
                <Text>Congratulations!</Text>
                <Text>Click on the calendar icon to check out your dates</Text>
                <Button 
                  buttonStyle={defaults.defaultButton}
                  title="Continue"
                  onPress={() => this.props.navigation.navigate('Nearby', {direction: 'swipeRight'})}
                  />
              </View>
            )
         }}
       />
    )
  }

  render () {
    let {location, user}= this.props.navigation.state.params;
    this.state.pickedRestaurant = location;
    this.state.userSwiped = user;
    this.state.dateCost = user.profile.cost.date1;

    return (
      <View style={styles.container}>
        {this.state.showSplash && this.renderSplash()}
        <View style={{flex: 1}}>
          <Image source={{uri: location.image_url}} style={{flex: 1}}/>
        </View>
        <View style={{flex: 1}}>
          <View style={{padding: 10, borderBottomWidth: 1, borderBottomColor: '#aaa', margin: 10}}>
            <Text style={{fontSize: 18, fontWeight: 'bold'}}>Your Date</Text>
          </View>
          <View style={{flexDirection: 'row', flex: 1, alignItems: 'center', justifyContent: 'space-between', padding: 10}}>
            <Text>Where:</Text>
            <Text>{location.name}</Text>
          </View>
          <View style={{flexDirection: 'row', flex: 1, alignItems: 'center', justifyContent: 'space-between', padding: 10}}>
            <Text>Who:</Text>
            <Text>{user.profile.displayName}</Text>
          </View>
        </View>
        <View style={{flex: 1, paddingBottom: 15, justifyContent: 'flex-end'}}>
          { this.state.dateSet ? 
              <Button 
                buttonStyle={[defaults.defaultButton, {backgroundColor: defaults.green, color: 'black'}]}
                title="Confirm Date"
                onPress={() => this.submitDate()}
                /> :
                <Button 
                icon={{name: 'calendar', size: 15, type: 'font-awesome'}}
                buttonStyle={defaults.defaultButton}
                title="Choose Time"
                onPress={this.showDateTimePicker}
                />
          }
        </View>
        <DateTimePicker
          isVisible={this.state.isDateTimePickerVisible}
          onConfirm={this.handleDatePicked}
          onCancel={this.hideDateTimePicker}
          is24Hour={false}
          mode='datetime'
        />
      </View>
    )
  }

}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  }
})



export default connect(
  (state) => ({user: state.user}), 
  (dispatch) => (bindActionCreators({setDate}, dispatch))
)(SetupDate);