import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';

export default class ProfilePage extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Profile</Text>
    <Image source={{uri: 'https://facebook.github.io/react/img/logo_og.png'}}
        style={{width: 400, height: 400}} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
