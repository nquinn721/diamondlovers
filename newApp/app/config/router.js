import React from 'react';
import { TabNavigator, StackNavigator } from 'react-navigation';
import { Icon } from 'react-native-elements';


// Tab Nav Items
import Swipe 		from 'newApp/app/screens/swipe';
import Profile 		from 'newApp/app/screens/profile';
import Message 		from 'newApp/app/screens/message';
import Purchase		from 'newApp/app/screens/purchase';
console.log(Swipe);

// Stack Nav Items
import Login 		from 'newApp/app/screens/login';
import Registration from 'newApp/app/screens/registration';
import Intro 		from 'newApp/app/screens/intro';

const tabRoutes = {
	Profile: {
		screen: Profile,
		navigationOptions: {
			tabBarIcon: ({tintColor}) => <Icon name="list" size={30} color={tintColor} />,
		}
	},
	Swipe: {
		screen: Swipe,
		navigationOptions: {
			tabBarIcon: ({tintColor}) => <Icon name="list" size={30} color={tintColor} />,
		}
	},
	Purchase: {
		screen: Purchase,
		navigationOptions: {
			tabBarIcon: ({tintColor}) => <Icon name='diamond' type='font-awesome'color={tintColor}/>,
		}
	},
	Message: {
		screen: Message,
		navigationOptions: {
			tabBarIcon: ({tintColor}) => <Icon name='diamond' type='font-awesome'color={tintColor}/>,
		}
	}
};
const tabConfig = {
	tabBarPosition: 'top',
	swipeEnabled: true,
	tabBarOptions: {
		activeTintColor: 'red',
		activeBackgroundColor: 'white',
		inactiveBackgroundColor: 'white'
	}

}

export const TabBar = TabNavigator(tabRoutes, tabConfig);

// const routeConfiguration = {
//   Home: { screen: Home },
//   Profile: { screen: Profile },
// }
// // going to disable the header for now
// const stackNavigatorConfiguration = {
//   headerMode: 'none',
//   initialRouteName: 'Home'
// }
// export const Navigator = StackNavigator(routeConfiguration,stackNavigatorConfiguration)