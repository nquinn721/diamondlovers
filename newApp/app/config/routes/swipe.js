import React from 'react';
import { createTabNavigator, createStackNavigator, Image } from 'react-navigation';
import { Icon } from 'react-native-elements';
import Swipe from 'newApp/app/screens/swipe';
const img = require('newApp/app/assets/img/Icon-Profiles.png');

const routeConfiguration = {
	Nearby: {
		screen: Swipe.Nearby,
		navigationOptions: {
			title: 'Swipe',
			
		}
	},
	UserProfile: {
		screen: Swipe.UserProfile,
		path: 'profile/:name',
		navigationOptions: {
			title: 'User profile'
		}
	},
	SetupDate: {
		screen: Swipe.SetupDate,
		navigationOptions: {
			title: 'Setup date'
		}
	}

}

// going to disable the header for now
const stackNavigatorConfiguration = {
  // headerMode: 'none',
}
export const SwipeStack = createStackNavigator(routeConfiguration,stackNavigatorConfiguration)


export default {
	Swipe: {
		screen: SwipeStack,
		navigationOptions: {
     		// tabBarIcon: ({tintColor}) => <Icon name="list" size={25} color={tintColor} />,
     		// tabBarIcon: ({tintColor}) => {
     		// 	return (<Image
			    //     source={require('newApp/app/assets/img/Icon-Profiles.png')}
			    //     style={{tintColor: 'blue'}}
			    //   />)
     		// },
     		// tabBarIcon: ({tintColor}) => <Image source={img} style={[{tintColor: tintColor}]}/>,
		}
	}
}