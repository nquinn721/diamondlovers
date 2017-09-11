import React from 'react';
import { Platform, Text, View, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Icon, Button, SearchBar } from 'react-native-elements';
import { MapView, Constants, Location, Permissions } from 'expo';
import Config from 'newApp/app/config/config';
import gStyles from 'newApp/app/config/globalStyles';
import DateTimePicker from 'react-native-modal-datetime-picker';
import moment from 'moment';
import Yelp from 'newApp/app/components/yelp';
import Image from 'react-native-image-progress';
import Splash from 'newApp/app/components/splash';
import { setDate } from 'newApp/app/redux/actions/dates';

class SetupDate extends React.Component {
  state = {
    isDateTimePickerVisible: false,
    location: null,
    errorMessage: null,
  };

  constructor(props){
    super();
    this.state.userSwiped = props.navigation.state.params,
    this.state.user = props.user.user;
  }

  componentWillMount() {
    // if (Platform.OS === 'android' && !Constants.isDevice) {
    //   this.setState({
    //     errorMessage: 'Oops, this will not work on Sketch in an Android emulator. Try it on your device!',
    //   });
    // } else {
      this._getLocationAsync();
    // }
  }

  _getLocationAsync = async () => {
    // let { status } = await Permissions.askAsync(Permissions.LOCATION);
    // if (status !== 'granted') {
    //   this.setState({
    //     errorMessage: 'Permission to access location was denied',
    //   });
    // }

    // let location = await Location.getCurrentPositionAsync({});
    this.state.searchData = {lat: 37.78825, lng: -122.4324};

    this.getYelpData();
  };

  getYelpData(){
    Yelp.search(this.state.searchData, (restaurants) => {
      this.setState({ location, restaurants });
    });    
  }

  showDateTimePicker = () => this.setState({ isDateTimePickerVisible: true });
  hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });

  handleDatePicked = (date) => {
    console.log('A date has been picked: ', date);
    this.setState({date, dateString: moment(date).format('MMMM Do YYYY, h:mm a')});
    this.hideDateTimePicker();
  };
  searchRestaurant(text){
    if(text.length > 3){
      clearTimeout(this.isSearching);
      this.state.searchData.term = text;
      this.isSearching = setTimeout(() => {
        this.getYelpData();
      }, 500);
    }
  }
  pickRestaurant(restaurant){
    this.setState({pickedRestaurant: restaurant});
  }

  renderRestaurants(){
    let restaurants = [];
    if(this.state.restaurants){
  	  restaurants = this.state.restaurants.map((r, i) => {
        let selected = this.state.pickedRestaurant === r;
		   	return (
		   		<TouchableOpacity onPress={() => this.pickRestaurant(r)} key={i} style={[styles.restaurant, gStyles.row, selected && styles.selected]}>
			   		<Image source={{uri: r.image_url}} style={{width: 30, height: 30, marginRight: 10}} raised/>
			   		<View>
				   		<Text style={selected && styles.lightText}> {r.name} </Text>
				   		<Text style={styles.lightText}> {r.location.address1}</Text>
				   	</View>
			   	</TouchableOpacity>
			  )
  		})
  	}

    return (
      <View style={styles.restaurants}>
        <SearchBar
        onChangeText={(text) => this.searchRestaurant(text)}
        placeholder='Search restaurants..' />
        {restaurants.length ? restaurants : <View style={gStyles.containerCenter}><ActivityIndicator /></View>}
      </View>
    )
  }

  renderCost(){
    let {userSwiped, user} = this.state;
    let cost = userSwiped.profile.cost.date1;
    return (
      <View style={styles.dateCost}>
        <Text>Cost: {cost} diamonds</Text>
        <Text>You have: {user.diamonds} diamonds </Text>
        <Text>{user.diamonds} - {cost} = {user.diamonds - cost}</Text>
      </View>
    )
  }

  submitDate(){
    if(this.state.pickedRestaurant && this.state.date){
      this.props.setDate(this.state.userSwiped._id, this.state.user._id, this.state.pickedRestaurant, this.state.date);
      this.setState({showSplash: true});
    }  
  }

  renderSplash(){
    return (
      <Splash
        style={{height: 200}}
         content={() => {
            return (
              <View>
                <Text>Congratulations!</Text>
                <Text>Your date is setup for</Text>
                <Text>{this.state.dateString}</Text>
                <Text>At</Text>
                <Text>{this.state.pickedRestaurant.name}</Text>
                <Text>Click on the calendar icon to check out your dates</Text>
                <Button 
                  raised
                  icon={{name: 'calendar', size: 15, type: 'font-awesome'}}
                  buttonStyle={gStyles.button}
                  title="Set the date"
                  onPress={() => this.props.navigation.navigate('Nearby')}
                  />
              </View>
            )
         }}
       />
    )
  }

  render () {
    return (
			<View style={styles.container}>
			  {this.renderRestaurants()}
        {this.renderCost()}
        {this.state.showSplash && this.renderSplash()}
        <Button 
          raised
          icon={{name: 'calendar', size: 15, type: 'font-awesome'}}
          buttonStyle={gStyles.button}
          title="Set the date"
          onPress={this.showDateTimePicker}
          />
        <Button 
          raised
          icon={{name: 'calendar', size: 15, type: 'font-awesome'}}
          buttonStyle={gStyles.button1}
          title="Submit Date"
          onPress={() => this.submitDate()}
          />
        <DateTimePicker
          isVisible={this.state.isDateTimePickerVisible}
          onConfirm={this.handleDatePicked}
          onCancel={this.hideDateTimePicker}
          is24Hour={false}
          mode='datetime'
        />
			</View>
      
    );
  }

}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  selected: {
    backgroundColor: '#555'
  },
  dateCost: {
    padding: 10
  },
  restaurants: {
  	height: Config.h / 2.5
  },
  restaurant: {
  	borderBottomWidth: 1,
  	padding: 10,
    alignItems: 'center',
  	borderBottomColor: '#aaa'
  },
  lightText: {
  	color: '#aaa'
  }
})



export default connect(
  (state) => ({user: state.user}), 
  (dispatch) => (bindActionCreators({setDate}, dispatch))
)(SetupDate);