import React from 'react';
import { Text, View, StyleSheet, ActivityIndicator, ScrollView, Animated, Image } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Button, Icon } from 'react-native-elements';
import Config from 'newApp/app/config/config';
import gStyles from 'newApp/app/config/globalStyles';
import { getDefaultImage } from 'newApp/app/redux/reducers/image';
import { getNearby } from 'newApp/app/redux/actions/nearby';
import Carousel from 'newApp/app/components/carousel';
import BottomButtons from './components/bottomButtons';
import { defaults } from 'newApp/app/config/globalStyles';
import DiamondCost from 'newApp/app/components/diamondCost';
const img = require('newApp/app/assets/img/Icon-Profiles.png');


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
  render() {
    let user = this.props.navigation.state.params;
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
  // (state) => ({user: state.nearby.currentUser}), 
  // (dispatch) => (bindActionCreators({getNearby}, dispatch))
)(UserProfile);