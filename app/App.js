import React from 'react';
import { StyleSheet, Text, View, Button, Input, ScrollView, Image } from 'react-native';
import StatusBarPaddingIOS from 'react-native-ios-status-bar-padding';

// Components
import Service  from './app/components/service';
import Settings from './app/components/settings';
import User     from './app/components/user';

// Pages
import LoadingPage    from './app/views/loading';
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
    view: <HomePage ref={ref => this.children.homePage = ref}/>
  }
  children = {};

  constructor(props) {
    super(props);
    User.on('update', () => {
      let user = User.getUser();
      console.log('update');
      
      for(let i in this.children){
        this.children[i].updateUser && this.children[i].updateUser(user);
      }
    });

    User.on('login', () => {
      console.log('logged in');
      this.setState({loggedIn: true});
      let user = User.getUser();
      for(let i in this.children){
        this.children[i].loginUser && this.children[i].loginUser(user);
      }
    });
    Service.on('network error', () => {
      // this.setState({networkError: true});
      // setTimeout(() => this.setState({networkError: false}), 4000);
    });
  }
 
  changeView(page){
    let view;
    if(page === 'home')
      view = <HomePage ref={ref => this.children.homePage = ref}/>;
    else if(page === 'purchase')
      view = <PurchasePage/>;
    else if(page === 'login')
      view = <LoginPage/>;
    else if(page === 'userProfile')
      view = <UserProfilePage changeView={view => this.changeView(view)}/>;
    else if(page === 'userProfileImages')
      view = <UserProfileImages ref={ref => this.children.userProfileImages = ref} changeView={view => this.changeView(view)}/>;
    else if(page === 'userProfileCards')
      view = <UserProfileCards changeView={view => this.changeView(view)} user={this.state.user}/>;
    else
      view = this.state.view;

    this.setState({view});
  }
    
  render() {
    let page = (
      <View style={styles.container}>
        <StatusBarPaddingIOS/>
        {this.state.networkError ? <View style={styles.networkError}><Text style={styles.networkErrorText}>Something went wrong, wait a few seconds and try again</Text></View> : null}
        <View style={styles.page}>
          {this.state.view}
        </View>   
        <Nav ref={ref => this.children.nav = ref} changeView={view => this.changeView(view)}></Nav>
      </View>
    );
    if(this.state.loggedIn)
      return page;
    else return <LoadingPage />;
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
  },
  loader: {
    width: 20,
    height: 20
  }

});
