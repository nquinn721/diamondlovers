import React from 'react';
import { TabNavigator, StackNavigator } from 'react-navigation';
import { Icon } from 'react-native-elements';
import { defaults } from 'newApp/app/config/globalStyles';
import Profile from 'newApp/app/screens/profile';

const tabRoutes = {
	Images: {
		screen: Profile.Images,
		navigationOptions: {
		  title: 'Photos'
		}
	},
	Details: {
		screen: Profile.Details,
		navigationOptions: {
			title: 'Details'
		}
	}
}

const tabConfig = {
	tabBarPosition: 'top',
	swipeEnabled: true,
	tabBarOptions: {
		headerMode: 'float',
		activeTintColor: defaults.color,
		inactiveTintColor: 'black',
		style: {
			backgroundColor: 'white',
		},
		labelStyle: {
		    fontSize: 14,
		},
		indicatorStyle: {
			backgroundColor: defaults.color,
			borderRadius: defaults.borderRadius,
			height: 5
		},
		activeBackgroundColor: '#fff',
		inactiveBackgroundColor: '#fff'
	}

}
const Edit = TabNavigator(tabRoutes, tabConfig);

const routeConfiguration = {
	Profile: {
		screen: Profile.Profile,
		navigationOptions: {
			title: 'Profile'
		}
	},
	
	Edit: {
		screen: Edit,
		navigationOptions: {
			title: 'Edit Profile'
		}
	}
}

// going to disable the header for now
const stackNavigatorConfiguration = {
  // headerMode: 'none',
}
export const ProfileStack = StackNavigator(routeConfiguration,stackNavigatorConfiguration)




export default {
	Profile: {
		screen: ProfileStack,
		navigationOptions: {
			// tabBarIcon: ({tintColor}) => <Icon name="user-circle-o" size={25} type='font-awesome' color={tintColor} />,
		}
	},

}