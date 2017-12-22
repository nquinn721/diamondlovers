import React from 'react';
import { Text, View, StyleSheet, ScrollView, Image } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import gStyles, { defaults } from 'newApp/app/config/globalStyles';
const img = require('newApp/app/assets/img/Icon-Date.png');


class Screen extends React.Component {
  static navigationOptions = {
      tabBarIcon: ({ tintColor }) => (
        <Image
          source={img}
          style={[{width: defaults.iconWidth, height: defaults.iconHeight}, {tintColor: tintColor}]}
        />
      ),
    };
  render() {
      this.props.navigation.navigate('Calendar');
     return (<View></View>)
  }

}

const styles = StyleSheet.create({
})




export default connect(
  // (state) => ({dates: state.dates.Screen, user: state.user}), 
  // (dispatch) => (bindActionCreators({approveDate}, dispatch))
)(Screen);