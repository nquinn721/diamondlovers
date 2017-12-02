import React from 'react';
import { Text, View, StyleSheet, ScrollView } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Config from 'newApp/app/config/config';
import { Button } from 'react-native-elements';
import moment from 'moment';
import gStyles from 'newApp/app/config/globalStyles';
import { defaults } from 'newApp/app/config/globalStyles';
import { approveDate } from 'newApp/app/redux/actions/dates';
import NoDates from './noDates';
import DateList from './dateList';
const img = require('newApp/app/assets/img/Icon-Date.png');


class PendingDates extends React.Component {
  static navigationOptions = {
      tabBarIcon: ({ tintColor }) => (
        <Image
          source={img}
          style={[{width: defaults.iconWidth, height: defaults.iconHeight}, {tintColor: tintColor}]}
        />
      ),
    };
  approveDate(id){
    this.props.approveDate(id);
  }

  render() {
    if(!this.props.dates.length)return <NoDates />;
    let {user} = this.props.user,
        dates = this.props.dates


    return (<DateList dates={dates} user={user} screen='pending' />)
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




export default connect(
  (state) => ({dates: state.dates.pendingDates, user: state.user}), 
  (dispatch) => (bindActionCreators({approveDate}, dispatch))
)(PendingDates);