import React from 'react';
import { TabNavigator, StackNavigator } from 'react-navigation';
import { Icon } from 'react-native-elements';


// Tab Nav Items
import Swipe 		from './routes/swipe';
import Profile 		from './routes/profile';
import Purchase		from './routes/purchase';
import Message 		from 'newApp/app/screens/message';

// Stack Nav Items
import Login 		from 'newApp/app/screens/login';
import Registration from 'newApp/app/screens/registration';
import Intro 		from 'newApp/app/screens/intro';



const tabRoutes = {
	...Purchase,
	...Swipe,
	...Profile,
	Message: {
		screen: Message,
		navigationOptions: {
			tabBarIcon: ({tintColor}) => <Icon name='comments-o' size={25} type='font-awesome'color={tintColor}/>,
		}
	}
};
const tabConfig = {
	tabBarPosition: 'top',
	swipeEnabled: false,
	tabBarOptions: {
		activeTintColor: '#2980b9',
		activeBackgroundColor: 'white',
		inactiveBackgroundColor: 'white'
	}

}

export const TabBar = TabNavigator(tabRoutes, tabConfig);

