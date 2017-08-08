import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import ProfilePage from './app/views/profile';
import LoginPage from './app/views/login';
import RegisterPage from './app/views/register';

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <ProfilePage></ProfilePage>
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
