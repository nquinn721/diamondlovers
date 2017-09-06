import React from 'react';
import { Text, View, StyleSheet, ActivityIndicator, Image } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Button } from 'react-native-elements';
import Config from 'newApp/app/config/config';
import gStyles from 'newApp/app/config/globalStyles';
import Swiper from 'react-native-deck-swiper';
import { getDefaultImage } from 'newApp/app/redux/reducers/image';
import { getNearby } from 'newApp/app/redux/actions/nearby';
const avatar = require('newApp/app/assets/img/avatar.png');


class UserProfile extends React.Component {
  renderProfileImage(imgs){
    let images = [];
    console.log(imgs);
    if(!imgs.length)return <Image source={avatar} style={styles.profileImages}/>;


    for(let i = 0; i < imgs.length; i++)
      images.push(<Image source={avatar} />)

    return (
      <Swiper style={styles.profileImages} showsButtons={true}>
        {images}  
      </Swiper>
    )

  }

  render() {
    let user = this.props.navigation.state.params;

    return (
      <View style={styles.container}>
        <View style={styles.profileImages}>
          {this.renderProfileImage(user.images)}
        </View>
      </View>
      )
  }

}

const styles = StyleSheet.create({
  profileImages: {
    height: Config.h / 3,
    width: Config.w,
    backgroundColor: '#222'
  }
})



export default connect(
  // (state) => ({nearby: state.nearby}), 
  // (dispatch) => (bindActionCreators({getNearby}, dispatch))
)(UserProfile);