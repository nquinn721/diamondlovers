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
const img = require('newApp/app/assets/img/Icon-Profiles.png');


const FIXED_BAR_WIDTH = 75
const BAR_SPACE = 10



class UserProfile extends React.Component {
static navigationOptions = {
      header:null,
    tabBarIcon: ({ tintColor }) => (
      <Image
        source={img}
          style={[{width: defaults.iconWidth, height: defaults.iconHeight}, {tintColor: tintColor}]}
      />
    ),
  };
  render() {
    let user = this.props.user;
    let profile = user.profile;
    console.log(user);
    
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
              <View style={styles.dateCost}>
                <Image source={require  ('newApp/app/assets/img/Icon-Purchase-Select.png')} style={[styles.costDiamond, StyleSheet.absoluteFill]}/>
                <Text style={[styles.cardText, styles.costDiamondText]}> {profile.cost.date1}</Text>
              </View>
            </View>
            <View style={styles.section}>
              <Text>About Me</Text>
              <Text>{profile.about || 'N/A'}</Text>
            </View>
          </View>
      </ScrollView>
      <BottomButtons isProfile={true} navigation={this.props.navigation}/>
      </View>
      )
  }

}

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
    height: 20,
    alignItems: 'center',
    justifyContent: 'center'
  },
  costDiamond: {
    width: 35,
    height: 35
  },
  costDiamondText: {
    color: defaults.color,
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
  (state) => ({user: state.nearby.currentUser}), 
  // (dispatch) => (bindActionCreators({getNearby}, dispatch))
)(UserProfile);