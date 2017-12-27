import React from 'react';
import { Platform, Text, View, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Icon, Button, SearchBar } from 'react-native-elements';
import Config from 'newApp/app/config/config';
import gStyles, { defaults } from 'newApp/app/config/globalStyles';
const img = require('newApp/app/assets/img/Icon-Profiles.png');

class SetupDate extends React.Component {
  static navigationOptions = {
      header:null,
    tabBarIcon: ({ tintColor }) => (
      <Image
        source={img}
          style={[{width: defaults.iconWidth, height: defaults.iconHeight}, {tintColor: tintColor}]}
      />
    ),
  };
  
  constructor(props){
    super();
    this.state.userSwiped = props.navigation.state.params,
    this.state.user = props.user.user;
  }

  




  

  

  renderCost(){
    let {userSwiped, user} = this.state;
    return (
      <View style={styles.dateCost}>
        <Text>Cost: {this.state.dateCost} diamonds</Text>
        <Text>You have: {user.diamonds} diamonds </Text>
        <Text>{user.diamonds} - {this.state.dateCost} = {user.diamonds - this.state.dateCost}</Text>
      </View>
    )
  }

  submitDate(){
    if(this.state.pickedRestaurant && this.state.date){
      this.props.setDate(this.state.userSwiped._id, this.state.user._id, this.state.pickedRestaurant, this.state.date, this.state.dateCost);
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
    let {user, userSwiped} = this.state;
    let diamonds = user.diamonds;
    this.state.dateCost = userSwiped.profile.cost.date1;
    if(diamonds < this.state.dateCost){
      return (
        <View style={gStyles.containerCenter}>
          <Text>You do not have enough diamonds</Text>
          <Text>You currently have {diamonds} diamonds and your date costs {this.state.dateCost}</Text>
          <Button 
            raised
            icon={{name: 'diamond', size: 15, type: 'font-awesome'}}
            buttonStyle={gStyles.button}
            title="Purchase diamonds"
            onPress={() => this.props.navigation.navigate('Purchase')}
            />
        </View>
      )
    }

    return (
			<View style={styles.container}>
			  {this.renderRestaurants()}
        {this.renderCost()}
        {this.state.showSplash && this.renderSplash()}
        
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
  (state) => ({user: state.user, restaurants: state.yelp}), 
  (dispatch) => (bindActionCreators({setDate, YelpSearch}, dispatch))
)(SetupDate);