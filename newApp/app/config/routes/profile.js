import React from 'react';
import { TabNavigator, StackNavigator } from 'react-navigation';
import { Icon } from 'react-native-elements';
import Profile from 'newApp/app/screens/profile';

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
	}
}