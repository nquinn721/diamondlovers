import React from 'react';
import { Text, View, StyleSheet, ActivityIndicator, TouchableOpacity, Image } from 'react-native';
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
      <TouchableOpacity onPress={() => this.props.swipeLeft()} style={[styles.button, styles.circle]}>
        <Image source={require('newApp/app/assets/img/Icon-Delete.png')} style={styles.button}/>
      </TouchableOpacity>
    ),
    yes: (
      <TouchableOpacity onPress={() => this.props.swipeRight()} style={[styles.button, styles.circle]}>
        <Image source={require('newApp/app/assets/img/Icon-Like.png')} style={styles.button}/>
      </TouchableOpacity>
    ),
    calendar: (
      <TouchableOpacity onPress={() => this.props.navigation.navigate('Calendar')}>
      </TouchableOpacity>
    ),
    info: (
      <TouchableOpacity onPress={() => {
        this.props.info();        
        // this.props.navigation.navigate('UserProfile')
      }} style={[styles.button, styles.circle]}>
        <Image source={require('newApp/app/assets/img/Icon-Details.png')} style={styles.button}/>
      </TouchableOpacity>
    )
  }
  renderNearby(){
    return (
      <View style={styles.bottomButtonsFloat}>
        <View style={styles.bottomButtonsItem}>
          {this.buttons.no}
        </View>
        <View  style={[styles.bottomButtonsItem, styles.center]}>
          {this.buttons.info}
        </View>
        <View style={styles.bottomButtonsItem}>
          {this.buttons.yes}     
        </View>
      </View>
    )
  }

  renderProfile(){
    return (
      <View style={styles.profileBottomButtons}>
        <View style={[styles.bottomButtonsItem]}>
          {this.buttons.no}
        </View>
        <View  style={[styles.bottomButtonsItem]}>
          {this.buttons.yes}
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
    height: 100,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  profileBottomButtons: {
    backgroundColor: 'white',
    position: 'absolute',
    width: Config.w,
    flexDirection: 'row',
    alignItems: 'center',
    bottom: 0,
    padding: 10,
    justifyContent: 'space-around'
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
  button: {
    width: 50,
    height: 50,
    overflow: 'hidden'
  },
  center: {
    justifyContent: 'space-around',
  }

})



export default connect(
  // (state) => ({nearby: state.nearby}), 
  // (dispatch) => (bindActionCreators({getNearby}, dispatch))
)(BottomButtons);