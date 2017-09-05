import React from 'react';
import { Text, View, StyleSheet, ActivityIndicator, Image } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { FormLabel, FormInput, FormValidationMessage, Button } from 'react-native-elements';
import Config from 'newApp/app/config/config';
import gStyles from 'newApp/app/config/globalStyles';
import SwipeCards from 'react-native-swipe-cards';
import Swiper from 'react-native-deck-swiper';
import { getDefaultImage } from 'newApp/app/redux/reducers/image';
import { getNearby } from 'newApp/app/redux/actions/nearby';
const avatar = require('newApp/app/assets/img/avatar.png');


class Nearby extends React.Component {
  state = {noCards: false}
  componentDidMount(){
    this.props.getNearby();

  }
  displayNearby(user){
    let image = getDefaultImage(user.profile.defaultImage, user.images) || avatar;

    
    return (
      <View style={styles.card} key={user._id}>
        <Image source={image} style={[StyleSheet.absoluteFill, styles.card]}/>
        <View style={styles.imageArea}></View>
        <View style={styles.userInfo}>
          <Text style={styles.cardText}>{user.profile.displayName}, {user.profile.age || 'N/A'}</Text>
          <Text style={styles.cardText}>{user.profile.education || 'N/A'}</Text>
        </View>
      </View>
    )
    
  }
  handleYup(){
    console.log('yup');
    
  }
  handleNope(){  
    console.log('nope');
    
  }
  handleMaybe(){

  }
  render() {
    if(!this.props.nearby.users)return <View style={styles.container}><ActivityIndicator size="large" /></View>;
    return (
      <View style={styles.container}>
      {this.state.noCards ? 
        <Text>No Cards Left</Text>
        : 
          <Swiper
              cards={this.props.nearby.users}
              renderCard={(card) => this.displayNearby(card)}
              onSwiped={(cardIndex) => {console.log(cardIndex)}}
              onSwipedAll={() => {this.setState({noCards: true})}}
              cardIndex={0}
              cardVerticalMargin={20}
              cardStyle={styles.card}
              backgroundColor={'white'}>
          </Swiper>
        }
        <View style={styles.bottomButtons}>
           
        </View>
       </View>
      )
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
   card: {
    flex: 1,
    justifyContent: 'space-between',
    width: Config.w - 50,
    height: Config.h / 1.6,
    backgroundColor: '#aaa',
    borderRadius: 4
  },
  userInfo: {
    backgroundColor:'rgba(0,0,0,0.2)',
    height: 40,
    padding: 4
  },
  cardText: {
    color: 'white'
  }
})



export default connect(
  (state) => ({nearby: state.nearby}), 
  (dispatch) => (bindActionCreators({getNearby}, dispatch))
)(Nearby);