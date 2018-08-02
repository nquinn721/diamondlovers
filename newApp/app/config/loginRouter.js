import React from 'react';
import { createTabNavigator, createStackNavigator } from 'react-navigation';
import { Icon } from 'react-native-elements';
import Login from 'newApp/app/screens/login';


const routeConfiguration = {
  Choose: {
    screen: Login.Choose,
    navigationOptions: {
      header: null
    }
  },
  SignUp: {
    screen: Login.Register,
    navigationOptions: {
      title: 'Sign Up'
    }
  },
  SignIn: {
    screen: Login.Login,
    navigationOptions: {
      title: 'Sign In'
    }
  }
};

// going to disable the header for now
const stackNavigatorConfiguration = {
  headerMode: 'screen'
}
export default createStackNavigator(routeConfiguration,stackNavigatorConfiguration)
