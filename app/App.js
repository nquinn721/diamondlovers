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
import ProfilePage    from './app/views/profile';
import HomePage       from './app/views/home';

// Profile
import UserProfilePage    from './app/views/userprofile/index';
import UserProfileImages  from './app/views/userprofile/images';
import UserProfileCards   from './app/views/userprofile/cards';

// User
import UserInfo  from './app/views/userInfo';
// Nav
import Nav from './app/views/nav';

let formdata = new FormData();
export default class App extends React.Component {
  state = {
    view: <HomePage/>
  }
  constructor(props) {
    super(props);
    User.on('update', () => {
      console.log('update');
      this.setState({user: User.getUser()})
    });

    Service.on('network error', () => {
      this.setState({networkError: true});
      setTimeout(() => this.setState({networkError: false}), 4000);
    });
  }
 
  changeView(page){
    let view;
    if(page === 'home')
      view = <HomePage/>;
    else if(page === 'purchase')
      view = <PurchasePage/>;
    else if(page === 'login')
      view = <LoginPage/>;
    else if(page === 'userProfile')
      view = <UserProfilePage changeView={view => this.changeView(view)}/>;
    else if(page === 'userProfileImages')
      view = <UserProfileImages changeView={view => this.changeView(view)}/>;
    else if(page === 'userProfileCards')
      view = <UserProfileCards changeView={view => this.changeView(view)} user={this.state.user}/>;
    else
      view = this.state.view;

    this.setState({view});
  }
    
  render() {
   
    return (
      <View style={styles.container}>
        <StatusBarPaddingIOS/>
        {this.state.networkError ? <View style={styles.networkError}><Text style={styles.networkErrorText}>Something went wrong, wait a few seconds and try again</Text></View> : null}
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
  networkError: {
    backgroundColor: '#c0392b',
    height: 30,
    width: Settings.w,
    justifyContent: 'center',
    alignItems: 'center'
  },
  networkErrorText: {
    color: 'white',
    fontSize: 16
  }

});
