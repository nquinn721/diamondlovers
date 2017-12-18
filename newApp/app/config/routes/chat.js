import React from 'react';
import { TabNavigator, StackNavigator } from 'react-navigation';
import { Icon } from 'react-native-elements';
import Chat from 'newApp/app/screens/chat';

const routeConfiguration = {
	Chats: {
		screen: Chat.Chats,
		navigationOptions: {
			title: 'Chat Activity'
		}
	},
	Messages: {
		screen: Chat.Messages,
		navigationOptions: {
			title: 'Messages'
		}
	}

}

// going to disable the header for now
const stackNavigatorConfiguration = {
  // headerMode: 'none',
}
export const ChatStack = StackNavigator(routeConfiguration,stackNavigatorConfiguration)


export default {
	Chat: {
		screen: ChatStack,
		navigationOptions: {
     		// tabBarIcon: ({tintColor}) => <Icon name="comments-o" size={25} color={tintColor} type='font-awesome'/>,
		}
	}
}