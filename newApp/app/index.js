import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Tabs } from './config/router';
import HomeScreen from './screens/home';
import ProfileScreen from './screens/profile';
import { Constants } from 'expo';

export default class App extends React.Component{
  render(){
    return (
      <View style={styles.container}>
        <View style={styles.statusBar}></View>
        <Text>Home</Text>
        <HomeScreen />
        <ProfileScreen />
      </View>
      );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  statusBar: {
    height: Constants.statusBarHeight,
    backgroundColor:'red'
  }
})