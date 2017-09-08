import React from 'react';
import { Text, View, StyleSheet, ActivityIndicator, ScrollView, Animated } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Button, Icon } from 'react-native-elements';
import Config from 'newApp/app/config/config';
import gStyles from 'newApp/app/config/globalStyles';
import { getDefaultImage } from 'newApp/app/redux/reducers/image';
import { getNearby } from 'newApp/app/redux/actions/nearby';
import Carousel from 'newApp/app/components/carousel';
import BottomButtons from './components/bottomButtons';


const FIXED_BAR_WIDTH = 75
const BAR_SPACE = 10



class UserProfile extends React.Component {

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
                <Icon style={styles.topInfoIcon} name='graduation-cap' type='font-awesome' size={14} color='#aaa' />
                <Text> {profile.education}</Text>
              </View>
              <View style={styles.group}>
                <Icon style={styles.topInfoIcon} name='map-marker' type='font-awesome' size={14} color='#aaa'/>
                <Text> {profile.city}, {profile.state} </Text>
              </View>
            </View>
            <View style={styles.section}>
              <Text>Looking for...</Text>
              <Text>{profile.lookingFor || 'N/A'}</Text>
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
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    paddingTop: 10,
    paddingBottom: 10
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
  // (state) => ({nearby: state.nearby}), 
  // (dispatch) => (bindActionCreators({getNearby}, dispatch))
)(UserProfile);