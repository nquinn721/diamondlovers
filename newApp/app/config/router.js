import React from 'react';
import { TabNavigator, StackNavigator } from 'react-navigation';
import { Icon } from 'react-native-elements';


// Tab Nav Items
import Swipe 		from './routes/swipe';
import Profile 		from './routes/profile';
import Purchase		from './routes/purchase';
import Calendar		from './routes/calendar';
import Chat			from './routes/chat';




const tabRoutes = {
	...Swipe,
	...Purchase,
	...Calendar,
	...Chat,
	...Profile,
};
const mainNavBackground = 'rgb(250, 250, 250)';
const tabConfig = {
	tabBarPosition: 'top',
	swipeEnabled: false,
	lazyLoad: true,
	animationEnabled: false,
	tabBarOptions: {
		showIcon: true,
		showLabel: false,
		activeTintColor: 'rgb(205, 59, 135)',
		inactiveTintColor: 'grey',
		activeBackgroundColor: mainNavBackground,
		inactiveBackgroundColor: mainNavBackground,
		style: {
		    backgroundColor: mainNavBackground,
		},
		indicatorStyle: {
			backgroundColor: mainNavBackground
		}
	}

}

export const TabBar = TabNavigator(tabRoutes, tabConfig);

