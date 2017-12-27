import React from 'react';
import { Platform, Text, View, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Icon, Button, SearchBar } from 'react-native-elements';
import Config from 'newApp/app/config/config';
import DateTimePicker from 'react-native-modal-datetime-picker';
import moment from 'moment';
import Image from 'react-native-image-progress';
import { setDate } from 'newApp/app/redux/actions/dates';
import Splash from 'newApp/app/components/splash';
import gStyles, { defaults } from 'newApp/app/config/globalStyles';

class SetupDate extends React.Component {
  state = {
    isDateTimePickerVisible: false
  };


  showDateTimePicker = () => this.setState({ isDateTimePickerVisible: true });
  hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });

  handleDatePicked = (date) => {
    this.setState({date, dateString: moment(date).format('MMMM Do YYYY, h:mm a')});
    this.hideDateTimePicker();
  };

  render () {
    let {location, user}= this.props.navigation.state.params;
    return (
      <View>
        <Button 
          icon={{name: 'calendar', size: 15, type: 'font-awesome'}}
          style={defaults.defaultButton}
          />
        <Button 
          style={defaults.defaultButton}
          title="Submit Date"
          onPress={() => this.submitDate()}
          />
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
  // (dispatch) => (bindActionCreators({setDate, YelpSearch}, dispatch))
)(SetupDate);