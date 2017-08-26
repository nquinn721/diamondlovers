import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Tabs } from './config/router';

export default class App extends React.Component{
  render(){
    return (
      <View style={styles.container}>
        <Tabs />
      </View>
      );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop:24
  }
})