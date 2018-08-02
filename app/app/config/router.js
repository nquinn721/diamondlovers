import React from 'react';
import { createStackNavigator, createMaterialTopTabNavigator, createBottomTabNavigator } from 'react-navigation';
import { Icon } from 'react-native-elements';
import { defaults } from 'app/app/config/globalStyles';
import { View, Text, Image } from 'react-native';
const img = require('app/app/assets/img/Icon-Date.png');

import Calendar from 'app/app/screens/calendar';
import Chat from 'app/app/screens/chat';
import Profile from 'app/app/screens/profile';
import Purchase from 'app/app/screens/purchase';
import Swipe from 'app/app/screens/swipe';

/**
 * PROFILE EDIT
 */


const Edit = createMaterialTopTabNavigator({
	Images: {
		screen: Profile.Images,
		navigationOptions: {
		  title: 'Photos'
		}
	},
	Details: {
		screen: Profile.Details,
		navigationOptions: {
			title: 'Details'
		}
	}
}, {
	tabBarPosition: 'top',
	swipeEnabled: true,
	tabBarOptions: {
		headerMode: 'float',
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

});
/**
 *  END PROFILE EDIT
 */



/**
 * CALENDAR
 */


const calendarTabRoutes = {
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



const calendarTabConfig = {
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
const CalendarTab = createMaterialTopTabNavigator(calendarTabRoutes, createMaterialTopTabNavigator);

/**
 * END CALENDAR
 */


const tabRoutes = {
	Nearby: {
		screen: Swipe.Nearby,
		navigationOptions: {
	      header: null
	    }
	},
	Purchase: {
		screen: Purchase.Purchase,
		navigationOptions: {
	      header: null
	    }
  	},
  	Chats: {
		screen: Chat.Chats,
		navigationOptions: {
	      header: null
	    }
	},

	Calendar: {
		screen: CalendarTab,
		navigationOptions: {
     		// tabBarIcon: ({tintColor}) => <Icon name="calendar" size={25} color={tintColor} type='font-awesome'/>,
     		tabBarIcon: ({tintColor}) => <Image source={img} style={[{width: defaults.iconWidth, height: defaults.iconHeight}, {tintColor: tintColor}]} />,
	      header: null
	    }
	},
	Profile: {
		screen: Profile.Profile,
		navigationOptions: {
	      header: null
	    }
	},
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





const TabBar = createMaterialTopTabNavigator(tabRoutes, tabConfig);
export default createStackNavigator({
	Main: {
		screen: TabBar,
		navigationOptions: {
			headerMode: 'none'
		}
	},
	Edit: {
		screen: Edit
	},
	UserProfile: {
		screen: Swipe.UserProfile,
		path: 'profile/:name',
		navigationOptions: {
			title: 'User profile'
		}
	},

	// SETUP DATE
	Details: {
		screen: Swipe.Details,
		navigationOptions: {
			title: 'Date Details'
		}
	},
	Location: {
		screen: Swipe.Location,
		navigationOptions: {
			title: 'Pick Location'
		}
	},
	DateTime: {
		screen: Swipe.DateTime,
		navigationOptions: {
			title: 'Pick Date and Time'
		}
	},

	// END SETUP DATE


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



	Charge: {
		screen: Purchase.Charge,
		navigationOptions: {
		  	title: 'Charge'
		}
	},


	Messages: {
		screen: Chat.Messages,
		navigationOptions: {
			title: 'Messages'
		}
	}



}, {

})

