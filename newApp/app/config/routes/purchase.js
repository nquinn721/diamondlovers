import React from 'react';
import { TabNavigator, StackNavigator } from 'react-navigation';
import { Icon } from 'react-native-elements';
import Purchase from 'newApp/app/screens/purchase';

const routeConfiguration = {
	Purchase: {
		screen: Purchase.Purchase,
		navigationOptions: {
			title: 'Purchase'
		}
  },
  Charge: {
    screen: Purchase.Charge,
    navigationOptions: {
      title: 'Charge'
    }
  }

}

// going to disable the header for now
const stackNavigatorConfiguration = {
  // headerMode: 'none',
}
export const PurchaseStack = StackNavigator(routeConfiguration,stackNavigatorConfiguration)


export default {
	Purchase: {
		screen: PurchaseStack,
		navigationOptions: {
     		// tabBarIcon: ({tintColor}) => <Icon name="diamond" size={25} color={tintColor} type='font-awesome'/>,
		}
	}
}