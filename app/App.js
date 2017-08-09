import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import ProfilePage from './app/views/profile';
import LoginPage from './app/views/login';
import RegisterPage from './app/views/register';

export default class App extends React.Component {
  constructor(){
    super();
     
  }
    login(){
      console.log('login');
      fetch('http://localhost:3000/db/login', {
          method: 'post',
          body: {},
          credentials: "same-origin"
      });
    }
  render() {
    return (
      <View style={styles.container}>
        <Button onPress={() => this.login()} title="Login"></Button>
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
