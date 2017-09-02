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
  state = {
    hasCards: true
  }
  componentDidMount(){
    this.props.getNearby();

  }
  displayNearby(user){
    let image = getDefaultImage(user.profile.defaultImage, user.images) || avatar;

    console.log(user);
    
    return (
      <View style={styles.card} key={user._id}>
        <Image source={image} style={styles.image} />
        <Text style={styles.cardText}>{user.profile.displayName}</Text>
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
    this.props.nearby.users.forEach((v, i) => v.key = i );
    return (
       <SwipeCards
        cards={this.props.nearby.users}
        stack={true}
        renderCard={(cardData) => this.displayNearby(cardData)}
        renderNoMoreCards={() => <View><Text>No more Cards</Text></View>}

        handleYup={this.handleYup}
        handleNope={this.handleNope}
        handleMaybe={this.handleMaybe}
        hasMaybeAction
      />
         
    )
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
   card: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: 300,
    height: 300,
  },
  // image: {
  //   height: Config.h / 2,
  //   width: Config.w - 20
  // },
  // card: {
  //   borderRadius: 4,
  //   borderWidth: 2,
  //   borderColor: '#E8E8E8',
  //   backgroundColor: '#222',
  // },
  // cardText: {
  //   color: 'white'
  // },
  text: {
    textAlign: 'center',
    fontSize: 50,
    backgroundColor: 'transparent'
  }
})



export default connect(
  (state) => ({nearby: state.nearby}), 
  (dispatch) => (bindActionCreators({getNearby}, dispatch))
)(Nearby);