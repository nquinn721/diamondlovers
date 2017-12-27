import React from 'react';
import { Platform, Text, View, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Icon, Button, SearchBar } from 'react-native-elements';
import Config from 'newApp/app/config/config';
import gStyles, { defaults } from 'newApp/app/config/globalStyles';
import Image from 'react-native-image-progress';
import { getDefaultImage } from 'newApp/app/redux/reducers/image';

class SetupDate extends React.Component {
  state = {
    isDateTimePickerVisible: false,
    location: null,
    errorMessage: null,
  };


  renderCost(diamonds, cost){
    let view;

    if(diamonds <= cost){
      view = (
        <View style={gStyles.containerCenter}>
           <Text>You do not have enough diamonds</Text>
           <Text>You currently have {diamonds} diamonds</Text>
           <Text>and your date costs {cost}</Text>
           <Button 
             raised
             icon={{name: 'diamond', size: 15, type: 'font-awesome'}}
             buttonStyle={defaults.defaultButton}
             title="Purchase diamonds"
             onPress={() => this.props.navigation.navigate('Purchase')}
             />
         </View>
       )
    }else{
      view = (
        <View style={styles.container}>
          <View style={{flex: 1, justifyContent: 'space-between', padding: 10}}>
            <View style={[gStyles.row, {justifyContent:'flex-end'}]}>
              <Text style={{fontSize: 18}}>Diamonds: {diamonds} </Text>
              <Icon color={defaults.color} name="diamond"  type="font-awesome" size={20} />
            </View>

            <View style={[gStyles.row, {justifyContent:'flex-end'}]}>
              <Text style={{fontSize: 18}}>Cost: {cost} </Text>
              <Icon color={defaults.color} name="diamond"  type="font-awesome" size={20} />
            </View>
            
            <View style={gStyles.hr}></View>
            <View>
              <Text style={{textAlign: 'right', fontSize: 18}}>Total: {diamonds - cost}</Text>
            </View>
          </View>
          <View style={{flex: 1, justifyContent: 'flex-end', padding: 10}}>
            <Button 
             raised
             buttonStyle={defaults.defaultButton}
             title="Continue"
             onPress={() => this.props.navigation.navigate('Location', this.props.navigation.state.params)}
             />
          </View>
        </View>
          
        
      );
    }

    return view;
  }

  render () {
    let userSwiped = this.props.navigation.state.params,
        {user} = this.props.user,
        cost = userSwiped.profile.cost.date1,
        diamonds = user.diamonds;

    let image = getDefaultImage(userSwiped.profile.defaultImage, userSwiped.images);
    return (
      <View style={styles.container}>
        <View style={{flex: 1}}>
          <Image source={image} style={{height: 300}}/>
        </View>
         {this.renderCost(diamonds, cost)}
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
    padding: 10,
  }
})



export default connect(
  (state) => ({user: state.user}), 
  // (dispatch) => (bindActionCreators({setDate, YelpSearch}, dispatch))
)(SetupDate);