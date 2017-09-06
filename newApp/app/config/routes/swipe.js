import React from 'react';
import { TabNavigator, StackNavigator } from 'react-navigation';
import { Icon } from 'react-native-elements';
import Swipe from 'newApp/app/screens/swipe';

const routeConfiguration = {
	Nearby: {
		screen: Swipe.Nearby,
		navigationOptions: {
			title: 'Swipe'
		}
	},
  UserProfile: {
    screen: Swipe.UserProfile,
    navigationOptions: {
      title: 'User profile'
    }
  }

}

// going to disable the header for now
const stackNavigatorConfiguration = {
  // headerMode: 'none',
}
export const SwipeStack = StackNavigator(routeConfiguration,stackNavigatorConfiguration)


export default {
	Swipe: {
		screen: SwipeStack,
		navigationOptions: {
     tabBarIcon: ({tintColor}) => <Icon name="list" size={25} color={tintColor} />,
		}
	}
}