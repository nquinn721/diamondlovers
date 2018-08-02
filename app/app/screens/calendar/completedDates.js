import React from 'react';
import { Text, View, StyleSheet, ScrollView, Image } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import DateList from './dateList';
import NoDates from './noDates';

class ApprovedDates extends React.Component {

  render() {
    if(!this.props.dates.length)return <NoDates />;
    let {user} = this.props.user,
        dates = this.props.dates,
        navigation = this.props.navigation;


    return (<DateList navigation={navigation} dates={dates} user={user} screen='completed' />)
  }

}

const styles = StyleSheet.create({
})




export default connect(
  (state) => ({dates: state.dates.completedDates, user: state.user}), 
  // (dispatch) => (bindActionCreators({userServiceCall, selectUser}, dispatch))
)(ApprovedDates);