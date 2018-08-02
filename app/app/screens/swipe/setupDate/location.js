import React from 'react';
import { Platform, Text, View, StyleSheet, ActivityIndicator, TouchableOpacity, Alert } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Icon, Button, SearchBar } from 'react-native-elements';
import Config from 'app/app/config/config';
import gStyles, { defaults } from 'app/app/config/globalStyles';
import Image from 'react-native-image-progress';
import { MapView, Constants, Location, Permissions } from 'expo';
import { YelpSearch } from 'app/app/redux/actions/yelp';

class SetupDate extends React.Component {
  state = {
    location: null,
    errorMessage: null,
  };

  componentWillMount() {
    if (Platform.OS === 'android' && !Constants.isDevice) {
      this.state.searchData = {lat: 37.78825, lng: -122.4324};
      this.getYelpData();
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

    this.state.searchData = await Location.getCurrentPositionAsync({});

    this.getYelpData();
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
  getYelpData(){
    this.props.YelpSearch(this.state.searchData);    
  }

  renderRestaurants(){
    let restaurants = [];
    if(this.props.restaurants.data){
      restaurants = this.props.restaurants.data.map((r, i) => {
        let selected = this.state.pickedRestaurant === r;
         return (
           <TouchableOpacity onPress={() => this.pickRestaurant(r)} key={i} style={[styles.restaurant, gStyles.row, selected && styles.selected]}>
             <Image source={{uri: r.image_url}} style={{width: 50, height: 50, marginRight: 10}} raised/>
             <View>
               <Text style={[selected && styles.lightText, {fontSize: 18}]}> {r.name} </Text>
               <Text style={[styles.lightText, {fontSize: 16}]}> {r.location.address1}</Text>
             </View>
           </TouchableOpacity>
        )
      })
    }

    return (
      <View style={styles.restaurants}>
        {restaurants.length ? restaurants : <View style={gStyles.containerCenter}><ActivityIndicator /></View>}
      </View>
    )
  }

  continue(){
    if(!this.state.pickedRestaurant)return Alert.alert('Choose restaurant', 'Please choose a restaurant from the list', [{text: 'OK'}, ], { cancelable: true } );
    this.props.navigation.navigate('DateTime', {user: this.props.navigation.state.params, location: this.state.pickedRestaurant})
  }


  render () {
    return (
       <View style={styles.container}>
         <View>
           <SearchBar
          onChangeText={(text) => this.searchRestaurant(text)}
          placeholder='Search restaurants..' />
         </View>
        {this.renderRestaurants()}
        <View style={{flex: 1}}>
          <Button 
             buttonStyle={defaults.defaultButton}
             title="Continue"
             onPress={() => this.continue()}
             />
        </View>
       </View>
    )
  }

}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  dateCost: {
    padding: 10
  },
  restaurants: {
    flex: 3,
    padding: 10,
    justifyContent: 'space-around'
  },
  lightText: {
    color: '#aaa'
  },
  restaurant: {
    borderBottomWidth: 1,
    padding: 15,
    alignItems: 'center',
    borderColor: '#aaa',
    borderWidth: 1,
    borderRadius: 15,
    backgroundColor: '#eee',
  },
  selected: {
    backgroundColor: '#555'
  }
})



export default connect(
  (state) => ({user: state.user, restaurants: state.yelp}), 
  (dispatch) => (bindActionCreators({YelpSearch}, dispatch))
)(SetupDate);