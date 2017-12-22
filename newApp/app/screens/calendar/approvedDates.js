import React from 'react';
import { Text, View, StyleSheet, Image, ScrollView } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import NoDates from './noDates';
import DateList from './dateList';

class ApprovedDates extends React.Component {
  render() {
    if(!this.props.dates.length)return <NoDates />;
    let {user} = this.props.user,
        dates = this.props.dates


    return (<DateList dates={dates} user={user} screen='approved' />)
  }

}


export default connect(
  (state) => ({dates: state.dates.approvedDates, user: state.user}), 
  // (dispatch) => (bindActionCreators({confirmShowed}, dispatch))
)(ApprovedDates);