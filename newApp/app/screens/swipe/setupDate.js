import React from 'react';
import { Platform, Text, View, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Icon, Button, Grid, Row } from 'react-native-elements';
import { MapView, Constants, Location, Permissions } from 'expo';
import Config from 'newApp/app/config/config';
import gStyles from 'newApp/app/config/globalStyles';
import DateTimePicker from 'react-native-modal-datetime-picker';
import moment from 'moment';
import Yelp from 'newApp/app/components/yelp';
import Image from 'react-native-image-progress';

class SetupDate extends React.Component {
  state = {
    isDateTimePickerVisible: false,
    location: null,
    errorMessage: null,
  };

  componentWillMount() {
    if (Platform.OS === 'android' && !Constants.isDevice) {
      this.setState({
        errorMessage: 'Oops, this will not work on Sketch in an Android emulator. Try it on your device!',
      });
    } else {
      this._getLocationAsync();
    }
  }

  _getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      this.setState({
        errorMessage: 'Permission to access location was denied',
      });
    }

    let location = await Location.getCurrentPositionAsync({});
    Yelp.search(location.coords, (restaurants) => {
	    this.setState({ location, restaurants });
    });
  };

  showDateTimePicker = () => this.setState({ isDateTimePickerVisible: true });

  hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });

  handleDatePicked = (date) => {
    console.log('A date has been picked: ', date);
    this.setState({date: moment(date).format('MMMM Do YYYY, h:mm a')});
    this.hideDateTimePicker();
  };

  renderRestaurants(){
  	if(this.state.restaurants){
  		return (
  		<View style={styles.restaurants}>
	  		{this.state.restaurants.map((r, i) => {
			   	return (
			   		<View key={i} style={[styles.restaurant, gStyles.row]}>
				   		<Image source={{uri: r.image_url}} style={{width: 30, height: 30}} raised/>
				   		<View>
					   		<Text> {r.name} </Text>
					   		<Text style={styles.lightText}> {r.location.address1}</Text>
					   	</View>
				   	</View>
				  )
	  		})}
  		</View>
  		)
  	}else{
  		return <Text>No restaurants found</Text>;
  	}
  }

  renderMap(){
  	let text = 'Waiting..',
  			{location} = this.state;

  	if (this.state.errorMessage) {
      text = this.state.errorMessage;
    } else if (location) {
      text = JSON.stringify(location);
    }

  	if(this.state.location){ 
      return (
      	<MapView
	        style={{flex: 1}}
	        initialRegion={{
	          latitude: location.coords.latitude,
	          longitude: location.coords.longitude,
	          latitudeDelta: 0.0922,
	          longitudeDelta: 0.0421,
	        }}
	      >
	      	<MapView.Marker
			      coordinate={{latitude: location.coords.latitude, longitude: location.coords.longitude}}
			      title='You are here!'
			    />
	      </MapView>
	    )
	  }else {
	  	return <MapView
	  		style={{flex: 1}}
		    initialRegion={{
		      latitude: 37.78825,
		      longitude: -122.4324,
		      latitudeDelta: 0.0922,
		      longitudeDelta: 0.0421,
		    }}
		  />
	  }
  }

  render () {
  	let userSwiped = this.props.navigation.state.params,
  			{user} = this.props.user;

    




    return (
			<View style={styles.container}>
			  <View style={styles.row}>
        	{this.renderMap()}	
			  </View>
			  <View style={styles.row}>
				  {this.renderRestaurants()}
			  </View>
			  <View style={styles.row}>
				  {this.renderRestaurants()}
			  </View>
			</View>
      
    );
  }

}

// <View style={styles.container}>


        
//         <View style={styles.date}>
//         	<Text>Great! Your date is setup for:</Text>
//         	<Text>
//         		{this.state.date}
//         	</Text>
//         </View>
//         <View style={[gStyles.row, gStyles.center]}>
//         	<Text>
//         		Your date costs {userSwiped.profile.cost.date1}
//         	</Text>
//         	<Icon type='font-awesome' name='diamond' size={12} />
//         </View>
//         <View style={[gStyles.row, gStyles.center]}>
//         	{user.diamonds && user.diamonds > userSwiped.profile.cost.date1 ?
//         		<Text>
//         			You have {user.diamonds} and after purchasing you will have {user.diamonds - userSwiped.profile.cost.date1}
// 	        	</Text>
// 	        	:
// 	        	<View style={gStyles.row}>
// 		        	<Text>
// 		        		You don't have enough diamonds to set up a date with {userSwiped.profile.displayName}, please visit the store and purchase more diamonds
// 		        	</Text>
// 		        	<Button 
// 			          raised
// 			          icon={{name: 'calendar', size: 15, type: 'font-awesome'}}
// 			          buttonStyle={gStyles.button}
// 			          title="Set the date"
// 			          onPress={this.showDateTimePicker}
// 			          />
// 		        </View>
// 	        }
//         </View>
//         <Button 
//           raised
//           icon={{name: 'calendar', size: 15, type: 'font-awesome'}}
//           buttonStyle={gStyles.button}
//           title="Set the date"
//           onPress={this.showDateTimePicker}
//           />
//         <DateTimePicker
//           isVisible={this.state.isDateTimePickerVisible}
//           onConfirm={this.handleDatePicked}
//           onCancel={this.hideDateTimePicker}
//           is24Hour={false}
//           mode='datetime'
//         />
//       </View>

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  title: {
  	fontSize: 18,
  	padding: 10
  },
  row: {
  	height: Config.h / 3.5
  },
  restaurant: {
  	borderBottomWidth: 1,
  	padding: 10,
  	borderBottomColor: '#aaa'
  },
  lightText: {
  	color: '#aaa'

  }
})



export default connect(
  (state) => ({user: state.user}), 
  // (dispatch) => (bindActionCreators({getNearby}, dispatch))
)(SetupDate);