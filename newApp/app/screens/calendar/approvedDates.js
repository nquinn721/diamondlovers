import React from 'react';
import { Text, View, StyleSheet, Image, ScrollView } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Config from 'newApp/app/config/config';
import { Button } from 'react-native-elements';
import moment from 'moment';
import gStyles from 'newApp/app/config/globalStyles';
import { confirmShowed } from 'newApp/app/redux/actions/dates';
import NoDates from './noDates';
import DateList from './dateList';

class ApprovedDates extends React.Component {
  confirmShowed(dateId){
    this.props.confirmShowed(dateId);
  }
 
  render() {
    if(!this.props.dates.length)return <NoDates />;
    let {user} = this.props.user,
        dates = this.props.dates


    return (<DateList dates={dates} user={user} screen='approved' />)
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})




export default connect(
  (state) => ({dates: state.dates.approvedDates, user: state.user}), 
  (dispatch) => (bindActionCreators({confirmShowed}, dispatch))
)(ApprovedDates);