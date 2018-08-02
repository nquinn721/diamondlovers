import React from 'react';
import { createTabNavigator, createStackNavigator } from 'react-navigation';
import { Icon } from 'react-native-elements';
import Calendar from 'newApp/app/screens/calendar';
import { defaults } from 'newApp/app/config/globalStyles';




const tabRoutes = {
	PendingDates: {
		screen: Calendar.PendingDates,
		navigationOptions: {
			title: 'Pending',
		}
	},
	ApprovedDates: {
		screen: Calendar.ApprovedDates,
		navigationOptions: {
			title: 'Approved',
		}
	},
	CompletedDates: {
		screen: Calendar.CompletedDates,
		navigationOptions: {
			title: 'Completed',
		}
	}
};



const tabConfig = {
	tabBarPosition: 'top',
	swipeEnabled: true,
	tabBarOptions: {
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
const CalendarTab = createTabNavigator(tabRoutes, tabConfig);

export default {
	Calendar: {
		screen: CalendarTab,
		navigationOptions: {
			title: 'Calendar',
			// tabBarIcon: ({tintColor}) => <Icon name="user-circle-o" size={25} type='font-awesome' color={tintColor} />,
		}
	},

}