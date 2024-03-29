import React from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';
import gStyles from 'app/app/config/globalStyles';
import { defaults } from 'app/app/config/globalStyles';

export default class NoDates extends React.Component {

 
  render() {
    return (
      <View style={styles.container}>
        <Image style={styles.img} source={require('app/app/assets/img/Icon-No-dates.png')} />
        <Text>No Dates Yet</Text>
      </View>
    )
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center'
  },
  img: {
    width: 50,
    height: 50
  }
})




