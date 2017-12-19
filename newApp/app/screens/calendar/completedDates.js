import React from 'react';
import { Text, View, StyleSheet, ScrollView, Image } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Config from 'newApp/app/config/config';
import { Button } from 'react-native-elements';
import moment from 'moment';
import gStyles, { defaults }  from 'newApp/app/config/globalStyles';
import DateList from './dateList';
import NoDates from './noDates';
const img = require('newApp/app/assets/img/Icon-Date.png');

class ApprovedDates extends React.Component {
 static navigationOptions = {
      tabBarIcon: ({ tintColor }) => (
        <Image
          source={img}
          style={[{width: defaults.iconWidth, height: defaults.iconHeight}, {tintColor: tintColor}]}
        />
      ),
    };

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
  (state) => ({dates: state.dates.completedDates, user: state.user}), 
  // (dispatch) => (bindActionCreators({userServiceCall, selectUser}, dispatch))
)(ApprovedDates);