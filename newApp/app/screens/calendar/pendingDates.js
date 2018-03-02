import React from 'react';
import { Text, View, StyleSheet, ScrollView, Image } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import NoDates from './noDates';
import DateList from './dateList';


class PendingDates extends React.Component {
  render() {
    if(!this.props.dates.length)return <NoDates />;
    let {user} = this.props.user,
        dates = this.props.dates,
        navigation = this.props.navigation;


    return (<DateList navigation={navigation} dates={dates} user={user} screen='pending' />)
  }

}


export default connect(
  (state) => ({dates: state.dates.pendingDates, user: state.user}), 
  // (dispatch) => (bindActionCreators({approveDate}, dispatch))
)(PendingDates);