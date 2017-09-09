import React from 'react';
import { TabNavigator, StackNavigator } from 'react-navigation';
import { Icon } from 'react-native-elements';
import Profile from 'newApp/app/screens/profile';

const tabRoutes = {
	PendingDates: {
		screen: Profile.PendingDates,
		navigationOptions: {
			tabBarIcon: ({tintColor}) => <Icon name='calendar' size={25} type='font-awesome'color={tintColor}/>
		}
	},
	ApprovedDates: {
		screen: Profile.ApprovedDates,
		navigationOptions: {
			tabBarIcon: ({tintColor}) => <Icon name='user' size={25} type='font-awesome' color={tintColor}/>
		}
	},
	CompletedDates: {
		screen: Profile.CompletedDates,
		navigationOptions: {
			tabBarIcon: ({tintColor}) => <Icon name='user' size={25} type='font-awesome' color={tintColor}/>
		}
	}
};

const tabConfig = {
	tabBarPosition: 'top',
	swipeEnabled: true,
	tabBarOptions: {
		activeTintColor: '#2980b9',
		activeBackgroundColor: 'white',
		inactiveBackgroundColor: 'white'
	}

}
const CalendarTab = TabNavigator(tabRoutes, tabConfig);


const routeConfiguration = {
	Profile: {
		screen: Profile.Profile,
		navigationOptions: {
			title: 'Profile'
		}
	},
	AddCard: { 
		screen: Profile.AddCard,
		navigationOptions: {
			title: 'Add Card'
		}
	},
	Cards: {
		screen: Profile.Cards,
		navigationOptions: {
		  	title: 'Cards'
		}
	},
	Images: {
		screen: Profile.Images,
		navigationOptions: {
		  title: 'Profile Images'
		}
	},
	Calendar: {
		screen: CalendarTab,
		navigationOptions: {
			title: 'Calendar'
		},
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
			tabBarIcon: ({tintColor}) => <Icon name="user-circle-o" size={25} type='font-awesome' color={tintColor} />,
		}
	},

}