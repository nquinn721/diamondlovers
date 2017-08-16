import React from 'react';
import { StyleSheet, Text, View, Button, Input, ScrollView } from 'react-native';

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

// Nav
import Nav from './app/views/nav';

let formdata = new FormData();
export default class App extends React.Component {
  state = {
    view: <HomePage></HomePage>,
    user: null
  }
  constructor(){
    super();

    User.on('update', () => {
        this.setState({cards: User.user.stripeCust.sources.data})
    });
  }
    
  changeView(page){
    let view;
    if(page === 'home')
      view = <HomePage></HomePage>;
    else if(page === 'purchase')
      view = <CheckoutPage></CheckoutPage>;
    else if(page === 'login')
      view = <LoginPage></LoginPage>;
    else if(page === 'profile')
      view = <ProfilePage changeView={view => this.changeView(view)}></ProfilePage>;
    else if(page === 'profileImages')
      view = <ProfileImages changeView={view => this.changeView(view)}></ProfileImages>;
    else if(page === 'profileCards')
      view = <ProfileCards changeView={view => this.changeView(view)} user={this.state.user}></ProfileCards>;
    else
      view = state.view;

    this.setState({view});
  }
    
  render() {
   
    return (
      <View style={styles.container}>
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
    justifyContent: 'center',
  },
  page: {
    height: Settings.h - 30,
    width: Settings.w
  },

});
