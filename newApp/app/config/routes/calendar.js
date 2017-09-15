import React from 'react';
import { TabNavigator, StackNavigator } from 'react-navigation';
import { Icon } from 'react-native-elements';
import Calendar from 'newApp/app/screens/calendar';




const tabRoutes = {
	PendingDates: {
		screen: Calendar.PendingDates,
		navigationOptions: {
			title: 'Pending',
			tabBarIcon: ({tintColor}) => <Icon name='calendar' size={25} type='font-awesome'color={tintColor}/>
		}
	},
	ApprovedDates: {
		screen: Calendar.ApprovedDates,
		navigationOptions: {
			title: 'Approved',
			tabBarIcon: ({tintColor}) => <Icon name='user' size={25} type='font-awesome' color={tintColor}/>
		}
	},
	CompletedDates: {
		screen: Calendar.CompletedDates,
		navigationOptions: {
			title: 'Completed',
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

export default {
	Calendar: {
		screen: CalendarTab,
		navigationOptions: {
			title: 'Calendar',
			tabBarIcon: ({tintColor}) => <Icon name="user-circle-o" size={25} type='font-awesome' color={tintColor} />,
		}
	},

}