import React from 'react';
import { TabNavigator, StackNavigator } from 'react-navigation';
import { Icon } from 'react-native-elements';


// Tab Nav Items
import Swipe 		from './routes/swipe';
import Profile 		from './routes/profile';
import Purchase		from './routes/purchase';
import Calendar		from './routes/calendar';
import Message 		from 'newApp/app/screens/message';

// Stack Nav Items
import Login 		from 'newApp/app/screens/login';
import Registration from 'newApp/app/screens/registration';
import Intro 		from 'newApp/app/screens/intro';



const tabRoutes = {
	...Swipe,
	...Purchase,
	...Profile,
	...Calendar,
	Message: {
		screen: Message,
		navigationOptions: {
			tabBarIcon: ({tintColor}) => <Icon name='comments-o' size={25} type='font-awesome'color={tintColor}/>,
		}
	}
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

