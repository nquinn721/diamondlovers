import React from 'react';
import { Text, View, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Icon } from 'react-native-elements';
import Config from 'newApp/app/config/config';
import gStyles from 'newApp/app/config/globalStyles';

class BottomButtons extends React.Component {
  buttons = {
    swipeBack: (
      <TouchableOpacity onPress={() => this.props.swiper.swipeBack(() => {})}> 
        <Icon name="undo" type="font-awesome" size={25} color="#95a5a6" raised/> 
      </TouchableOpacity>
    ),
    no: (
      <TouchableOpacity onPress={() => this.props.swiper.swipeLeft()}>
        <Icon name="ban" type="font-awesome" size={25} color="#e74c3c" raised/>
      </TouchableOpacity>
    ),
    yes: (
      <TouchableOpacity onPress={() => this.props.swiper.swipeRight()}>
        <Icon name="check" type="font-awesome" size={25} color="#2ecc71" raised/>
      </TouchableOpacity>
    ),
    calendar: (
      <TouchableOpacity onPress={() => this.props.navigation.navigate('Calendar')}>
        <Icon name="calendar" type="font-awesome" size={25} color="#f39c12" raised/>
      </TouchableOpacity>
    )
  }
  renderNearby(){
    return (
      <View style={styles.bottomButtonsFloat}>
        <View style={styles.bottomButtonsItem}>
          {this.buttons.swipeBack}
        </View>
        <View  style={[styles.bottomButtonsItem, styles.center]}>
          {this.buttons.no}
          {this.buttons.yes}     
        </View>
        <View style={styles.bottomButtonsItem}>
          {this.buttons.calendar}
        </View>
      </View>
    )
  }

  renderProfile(){
    return (
      <View style={styles.bottomButtonsFloat}>
        <View style={[styles.bottomButtonsItem]}>
          {this.buttons.no}
        </View>
        <View  style={[styles.bottomButtonsItem]}>
          {this.buttons.yes}
        </View>
        <View style={[styles.bottomButtonsItem]}>
          {this.buttons.calendar}
        </View>
      </View>
    )
  }

  render() {  
    if(!this.props.isProfile)
      return this.renderNearby();
    else
      return this.renderProfile();
  }

}

const styles = StyleSheet.create({
  bottomButtonsFloat: {
    backgroundColor: 'transparent',
    position: 'absolute',
    width: Config.w,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    bottom: 20
  },
  circle: {
    borderRadius: 100,
    width: 50,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    height: 50,
    shadowColor: '#aaa',
    shadowRadius: 5,
    shadowOpacity: 1
  },
  bottomButtonsItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1
  },
  center: {
    justifyContent: 'space-around',
  }

})



export default connect(
  // (state) => ({nearby: state.nearby}), 
  // (dispatch) => (bindActionCreators({getNearby}, dispatch))
)(BottomButtons);