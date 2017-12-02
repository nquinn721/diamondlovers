import React from 'react';
import { Text, View, StyleSheet, ScrollView } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Config from 'newApp/app/config/config';
import { Button } from 'react-native-elements';
import moment from 'moment';
import gStyles from 'newApp/app/config/globalStyles';
import DateList from './dateList';
import NoDates from './noDates';

class ApprovedDates extends React.Component {

 
  render() {
    if(!this.props.dates.length)return <NoDates />;
    let {user} = this.props.user,
        dates = this.props.dates


    return (<DateList dates={dates} user={user} screen='completed' />)
  }

}

const styles = StyleSheet.create({
})




export default connect(
  (state) => ({dates: state.dates.completedDates}), 
  // (dispatch) => (bindActionCreators({userServiceCall, selectUser}, dispatch))
)(ApprovedDates);