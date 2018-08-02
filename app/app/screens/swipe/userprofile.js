import React from 'react';
import { Text, View, StyleSheet, ActivityIndicator, ScrollView, Animated, Image } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Button, Icon } from 'react-native-elements';
import Config from 'app/app/config/config';
import gStyles from 'app/app/config/globalStyles';
import { getDefaultImage } from 'app/app/redux/reducers/image';
import { getCurrentUser } from 'app/app/redux/actions/nearby';
import Carousel from 'app/app/components/carousel';
import BottomButtons from './components/bottomButtons';
import { defaults } from 'app/app/config/globalStyles';
import DiamondCost from 'app/app/components/diamondCost';
const img = require('app/app/assets/img/Icon-Profiles.png');


const FIXED_BAR_WIDTH = 75
const BAR_SPACE = 10



class UserProfile extends React.Component {
static navigationOptions = {
    tabBarIcon: ({ tintColor }) => (
      <Image
        source={img}
          style={[{width: defaults.iconWidth, height: defaults.iconHeight}, {tintColor: tintColor}]}
      />
    ),
  };

  swipeRight(){
    this.props.navigation.navigate('Nearby', {direction:'swipeRight'});
  }
  swipeLeft(){
    this.props.navigation.navigate('Nearby', {direction: 'swipeLeft'});
  }
  getUser(){
    let user = this.props.navigation.state.params,
        {users, currentUser} = this.props.nearby,
        id = user && user._id ? user._id.toString() : user;


    if(user){
      for(let i in users){
        if(users[i]._id.toString() === id)
          return users[i];
      }
      if(currentUser && currentUser._id.toString() === id){
        return currentUser;
      }
    }
    

  }
  render() {
    let user = this.getUser();
    
    
    if(!user && !this.props.nearby.getCurrentUserFailed){
      let id = this.props.navigation.state.params;

      id = id && id._id ? id._id : id;

      this.props.getCurrentUser(id);
      return <ActivityIndicator style={{flex: 1}} size="large" />;
    }
      


    let profile = user.profile;

     
    return (
      <View style={{height: Config.h, flex: 1}}>
      <ScrollView style={styles.container}>
          <View style={styles.profileImages}>
            <Carousel
              images={user.images}
              imageStyle={styles.profileImages}
            />
          </View>
          <View style={styles.profileInfo}>
            <View style={styles.section}>
              <Text style={styles.profileName}>
                {profile.displayName}, {profile.age || 'N/A'}
              </Text>
              <View style={styles.group}>
                <Text> {profile.city}, {profile.state} </Text>
              </View>
               <DiamondCost cost={profile.cost.date1} default={true} style={styles.dateCost} textColor={defaults.color}/>
            </View>
            <View style={styles.section}>
              <Text>About Me</Text>
              <Text>{profile.about || 'N/A'}</Text>
            </View>
          </View>
      </ScrollView>
      </View>
      )
    
  }

}
// <BottomButtons isProfile={true} swipeRight={this.swipeRight.bind(this)} swipeLeft={this.swipeLeft.bind(this)}/>

const styles = StyleSheet.create({
  profileImages: {
    height: Config.h / 2,
    width: Config.w,
    backgroundColor: 'black'
  },
  container: {
    backgroundColor: 'white',
    flex: 1
  },
  profileName: {
    fontSize: 24
  },
  profileInfo: {
    padding: 5,
    marginBottom: 100
  },
  section: {
    padding: 5,
    paddingTop: 10,
    paddingBottom: 10
  },
  dateCost: {
    position: 'absolute',
    right: 40,
    width: 20,
    marginTop: 15,
  },
  costDiamondText: {
    color: defaults.color,
    backgroundColor: 'rgba(0,0,0,0)'
  },
  topInfoIcon: {
    width: 15,
    justifyContent: 'center',
    alignItems: 'center'
  },
  group: {
    flexDirection: 'row'
  }
})



export default connect(
  (state) => ({nearby: state.nearby}),
  (dispatch) => (bindActionCreators({getCurrentUser}, dispatch))
)(UserProfile);