import React from 'react';
import { TabNavigator, StackNavigator } from 'react-navigation';
import { Icon } from 'react-native-elements';

import Home from 'newApp/app/screens/home';
import Profile from 'newApp/app/screens/profile';

// export const Tabs = TabNavigator({
// 	Home: {
// 		screen: Home,
// 		navigationOptions: {
// 			tabBarIcon: ({tintColor}) => <Icon name="list" size={30} color={tintColor} />,
// 		}
// 	},
// 	Profile: {
// 		screen: Profile,
// 		navigationOptions: {
// 			tabBarIcon: ({tintColor}) => <Icon name='diamond' type='font-awesome'color={tintColor}/>,
// 		}
// 	}
// });

const routeConfiguration = {
  Home: { screen: Home },
  Profile: { screen: Profile },
}
// going to disable the header for now
const stackNavigatorConfiguration = {
  headerMode: 'none',
  initialRouteName: 'Home'
}
export const Navigator = StackNavigator(routeConfiguration,stackNavigatorConfiguration)