import React from 'react';
import { Text, View, StyleSheet, ActivityIndicator, ScrollView, Animated } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Button } from 'react-native-elements';
import Config from 'newApp/app/config/config';
import gStyles from 'newApp/app/config/globalStyles';
import { getDefaultImage } from 'newApp/app/redux/reducers/image';
import { getNearby } from 'newApp/app/redux/actions/nearby';
import Carousel from 'newApp/app/components/carousel';


const FIXED_BAR_WIDTH = 75
const BAR_SPACE = 10



class UserProfile extends React.Component {

  render() {
    let user = this.props.navigation.state.params;
    let profile = user.profile;
    console.log(user);

    return (
      <View style={styles.container}>
          <View style={styles.profileImages}>
              <Carousel
                images={user.images}
                imageStyle={styles.profileImages}
              />
          </View>
          <View style={styles.profileInfo}>
            <View style={styles.item}>
              <Text>
                {profile.displayName}
              </Text>
            </View>
            <View style={styles.item}>
              <Text>
                {profile.city}, {profile.state}
              </Text>
            </View>
          </View>
      </View>
      )
  }

}

const styles = StyleSheet.create({
  profileImages: {
    height: Config.h / 3,
    width: Config.w,
    backgroundColor: 'black'
  },
  container: {
    backgroundColor: 'white',
    flex: 1
  },
  profileInfo: {
    padding: 5
  },
  item: {
    padding: 5
  }
})



export default connect(
  // (state) => ({nearby: state.nearby}), 
  // (dispatch) => (bindActionCreators({getNearby}, dispatch))
)(UserProfile);