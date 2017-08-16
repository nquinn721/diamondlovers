import React from 'react';
import { StyleSheet, Text, View, Button, Input, ScrollView } from 'react-native';
import StatusBarPaddingIOS from 'react-native-ios-status-bar-padding';

// Components
import Service  from './app/components/service';
import Settings from './app/components/settings';
import User     from './app/components/user';

// Pages
import LoginPage      from './app/views/login';
import RegisterPage   from './app/views/register';
import PurchasePage   from './app/views/purchase';
import CheckoutPage   from './app/views/checkout';
import HomePage       from './app/views/home';

// Profile
import ProfilePage    from './app/views/profile/index';
import ProfileImages  from './app/views/profile/images';
import ProfileCards   from './app/views/profile/cards';

// User
import UserInfo  from './app/views/userInfo';
// Nav
import Nav from './app/views/nav';

let formdata = new FormData();
export default class App extends React.Component {
  state = {
    view: <HomePage/>
  }
 
  changeView(page){
    let view;
    if(page === 'home')
      view = <HomePage/>;
    else if(page === 'purchase')
      view = <PurchasePage/>;
    else if(page === 'login')
      view = <LoginPage/>;
    else if(page === 'profile')
      view = <ProfilePage changeView={view => this.changeView(view)}/>;
    else if(page === 'profileImages')
      view = <ProfileImages changeView={view => this.changeView(view)}/>;
    else if(page === 'profileCards')
      view = <ProfileCards changeView={view => this.changeView(view)} user={this.state.user}/>;
    else
      view = state.view;

    this.setState({view});
  }
    
  render() {
   
    return (
      <View style={styles.container}>
        <StatusBarPaddingIOS/>
        <UserInfo></UserInfo>
        <View style={styles.page}>
          {this.state.view}
        </View>
        <Nav changeView={view => this.changeView(view)}></Nav>
      </View>
    );
  }
} 

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  page: {
    height: Settings.h - 100,
    width: Settings.w
  },

});
