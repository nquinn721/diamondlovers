import React from 'react';
import { View, StyleSheet } from 'react-native';
import Config from 'newApp/app/config/config';

export default class Splash extends React.Component {
  render() {
    return (
      <View style={styles.splash}>
        <View style={[styles.content, this.props.style]}>
          {this.props.content()}
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
  	alignItems: 'center',
  	justifyContent: 'center',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1999
  }
})




