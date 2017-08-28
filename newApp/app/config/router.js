import React from 'react';
import { TabNavigator } from 'react-navigation';
import { Icon } from 'react-native-elements';

import Home from 'newApp/app/screens/home';
import Profile from 'newApp/app/screens/profile';

export const Tabs = TabNavigator({
	Home: {
		screen: Home,
		navigationOptions: {
			tabBarIcon: ({tintColor}) => <Icon name="list" size={30} color={tintColor} />,
		}
	},
	Profile: {
		screen: Profile,
		navigationOptions: {
			tabBarIcon: ({tintColor}) => <Icon name='diamond' type='font-awesome'color={tintColor}/>,
		}
	}
});