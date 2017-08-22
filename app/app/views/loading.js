import React from 'react';
import { StyleSheet, View, Image } from 'react-native';
const loader = require('../assets/img/ajax-loader.gif');


let formdata = new FormData();
export default class App extends React.Component {

  render() {
     return (
       <View style={styles.container}>
         <Image source={loader} style={styles.loader}/>
       </View>
      )
  }
} 

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  loader: {
    width: 20,
    height: 20
  }

});
