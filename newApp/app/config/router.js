import React from 'react';
import { TabNavigator, StackNavigator, Image } from 'react-navigation';
import { Icon } from 'react-native-elements';
import { defaults } from 'newApp/app/config/globalStyles';
const img = require('newApp/app/assets/img/Icon-Date.png');


// Tab Nav Items
// import Swipe 		from './routes/swipe';
// import Profile 		from './routes/profile';
// import Purchase		from './routes/purchase';
// import Calendar		from './routes/calendar';
// import Chat			from './routes/chat';


import Calendar from 'newApp/app/screens/calendar';
import Chat from 'newApp/app/screens/chat';
import Profile from 'newApp/app/screens/profile';
import Purchase from 'newApp/app/screens/purchase';
import Swipe from 'newApp/app/screens/swipe';

/**
 * PROFILE EDIT
 */


/**
 *  END PROFILE EDIT
 */

const Edit = TabNavigator({
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
const CalendarTab = TabNavigator(calendarTabRoutes, calendarTabConfig);

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
     		tabBarIcon: ({tintColor}) => <Icon name="calendar" size={25} color={tintColor} type='font-awesome'/>,
     		// tabBarIcon: ({tintColor}) => <Image source={img} style={[{width: defaults.iconWidth, height: defaults.iconHeight}, {tintColor: tintColor}]} />,
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




import s from 'newApp/app/screens/swipe';

const TabBar = TabNavigator(tabRoutes, tabConfig);
export default StackNavigator({
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

