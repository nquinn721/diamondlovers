import React from 'react';
import { TabNavigator, StackNavigator } from 'react-navigation';
import { Icon } from 'react-native-elements';


// Tab Nav Items
import Swipe 		from 'newApp/app/screens/swipe';
import Profile 		from './routes/profile';
import Message 		from 'newApp/app/screens/message';
import Purchase		from 'newApp/app/screens/purchase';

// Stack Nav Items
import Login 		from 'newApp/app/screens/login';
import Registration from 'newApp/app/screens/registration';
import Intro 		from 'newApp/app/screens/intro';



const tabRoutes = {
	...Profile,
	Swipe: {
		screen: Swipe,
		navigationOptions: {
			tabBarIcon: ({tintColor}) => <Icon name="list" size={25} color={tintColor} />,
		}
	},
	Purchase: {
		screen: Purchase,
		navigationOptions: {
			tabBarIcon: ({tintColor}) => <Icon name='diamond' size={25} type='font-awesome'color={tintColor}/>,
		}
	},
	Message: {
		screen: Message,
		navigationOptions: {
			tabBarIcon: ({tintColor}) => <Icon name='comments-o' size={25} type='font-awesome'color={tintColor}/>,
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

export const TabBar = TabNavigator(tabRoutes, tabConfig);

