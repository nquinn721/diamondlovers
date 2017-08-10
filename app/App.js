import React from 'react';
import { StyleSheet, Text, View, Button, Input, ScrollView } from 'react-native';
import ProfilePage from './app/views/profile';
import LoginPage from './app/views/login';
import RegisterPage from './app/views/register';
import Service from './app/components/service';

let formdata = new FormData();
export default class App extends React.Component {
  state = {

  }
  constructor(){
    super();
    Service.on('loggedin', (user) => {
      console.log('service is done', user);
      this.setState({user})
    });
  }
    

    
  render() {
    if(this.state.user) 
      return (<ProfilePage></ProfilePage>); 
    else {
      return (<LoginPage></LoginPage>);
    }
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
