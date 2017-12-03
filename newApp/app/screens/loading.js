import React from 'react';
import { Text, View, StyleSheet, Image, ScrollView, Button } from 'react-native';
import gStyles from 'newApp/app/config/globalStyles';
import { defaults } from 'newApp/app/config/globalStyles';
import { Constants } from 'expo';
const bg = require('newApp/app/assets/img/splash-Bg.png');
const logo = require('newApp/app/assets/img/Splash-Logo.png');

export default class Loading extends React.Component {
 
  render() {
    return (
      <View style={styles.container}>
        <Image source={bg} style={{width: defaults.width, height: defaults.height, position: 'absolute'}} />
        <Image source={logo} style={{width: defaults.width - 130, height: 200}} />
      </View>
    )
  }

}

const styles = StyleSheet.create({
 container: {
   flex: 1,
   alignItems: 'center',
   justifyContent: 'center'
 },
})

