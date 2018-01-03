import React from 'react';
import { View, StyleSheet, Image, Text } from 'react-native';
import Config from 'newApp/app/config/config';

export default class Splash extends React.Component {
  render() {
    let img = this.props.default ? 
              require('newApp/app/assets/img/Icon-Purchase-Select.png') : 
              require('newApp/app/assets/img/Icon-Purchase.png');
    return (
      <View style={[this.props.style, styles.dateCost]}>
        <Image source={img} style={[StyleSheet.absoluteFill, styles.dateCost]}/>
        <Text style={[styles.text, (this.props.textColor && {color: this.props.textColor})]}> {this.props.cost}</Text>
      </View>
    )
  }

}

const styles = StyleSheet.create({
  dateCost: {
    width: 45,
    height: 40,
  },
  text: {
    fontSize: 13,
    marginTop: 4,
    marginRight: 4,
    textAlign: 'center',
    color: 'white',
    backgroundColor: 'rgba(0,0,0,0)'
  }
})




