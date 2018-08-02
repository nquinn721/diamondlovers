import React from 'react';
import { Platform, Text, View, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Icon, Button, SearchBar } from 'react-native-elements';
import Config from 'app/app/config/config';
import gStyles, { defaults } from 'app/app/config/globalStyles';
const img = require('app/app/assets/img/Icon-Profiles.png');

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