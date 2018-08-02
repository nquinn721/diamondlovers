import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import Config from 'app/app/config/config';
const {width, height} = Dimensions.get('window');

export default class Splash extends React.Component {
  render() {
    return (
      <View style={styles.splash}>
        <View style={[styles.content, this.props.style]}>
          {this.props.content && this.props.content()}
        </View>
      </View>
    )
  }

}

const styles = StyleSheet.create({
  content: {
  	padding: 20,
  	backgroundColor: 'white',
  	height: Config.h / 4.8,
  	alignItems: 'center',
  	width: Config.w - 60,
  	justifyContent: 'space-around'
  },
  splash: {
  	backgroundColor: 'rgba(0, 0, 0, 0.4)',
  	flex: 1,
    top: 0,
    left: 0,
  	alignItems: 'center',
  	justifyContent: 'center',
    position: 'absolute',
    width: width,
    height: height,
    zIndex: 1999
  }
})




