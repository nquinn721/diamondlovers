import React from 'react';
import { Text, View, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Icon, Button } from 'react-native-elements';
import Config from 'newApp/app/config/config';
import gStyles from 'newApp/app/config/globalStyles';
import Swiper from 'react-native-deck-swiper';
import { getDefaultImage } from 'newApp/app/redux/reducers/image';
import { getNearby } from 'newApp/app/redux/actions/nearby';
import { getDates } from 'newApp/app/redux/actions/dates';
import Image from 'react-native-image-progress';
import BottomButtons from './components/bottomButtons';
const avatar = require('newApp/app/assets/img/avatar.png');

class Nearby extends React.Component {
  state = {noCards: false, currentImage: 0}
  componentDidMount(){
    this.props.getNearby();
    this.props.getDates();
  }

  renderCard(user){
    let image = getDefaultImage(user.profile.defaultImage, user.images) || avatar;
    return (
      <View style={styles.card} key={user._id}>
        <Image source={image} style={styles.card}/>
        <View style={styles.imageArea}></View>
        <View style={styles.userInfo}>
          <View style={styles.userInfoSection}>
            <View style={styles.cardItem}>
              <Text style={styles.cardText}>{user.profile.displayName}, {user.profile.age || 'N/A'}</Text>
            </View>
            <View style={styles.cardItem}>
              <Text style={styles.cardText}>{user.profile.education || 'N/A'}</Text>
            </View>
            {user.profile.cost && user.profile.cost.date1 && 
              <View style={styles.cardItem}>
                <Icon type='font-awesome' size={10} name='diamond' color='white'/>
                <Text style={styles.cardText}> {user.profile.cost.date1}</Text>
              </View>
            }
            
          </View>
          
          <View style={styles.userInfoSection}>
            <Icon onPress={() => this.props.navigation.navigate('UserProfile', user)} type='font-awesome' name='info-circle' size={25} color='white' />
          </View>
        </View>
      </View>
    )
    
  }
  renderNoCards(){
    return (
      <View style={styles.container}>
        <Icon name="ban" type="font-awesome" size={200} color="#eee"/>
        <Text style={{color: '#ccc'}}>No more cards</Text>
      </View>
    )
  }
  renderSwiper(users){
    return (
      <View style={styles.container}>
        <Swiper
          ref={swiper => this.swiper = swiper}
          cards={users}
          renderCard={(card, cardIndex) => this.renderCard(card, cardIndex)}
          onSwiped={(cardIndex) => {console.log('you swiped', cardIndex)}}
          onSwipedLeft={(user) => this.swipeLeft(user)}
          onSwipedRight={(user) => this.swipeRight(user)}
          onSwipedAll={() => this.setState({noCards: true})}
          cardVerticalMargin={20}
          cardStyle={{height: 330}}
          showSecondCard={false}
          onTapCard={index => console.log(index)}
          backgroundColor={'white'}
          verticalSwipe={false}
          >
        </Swiper>
        <BottomButtons swiper={this.swiper} navigation={this.props.navigation}/>
      </View>
    )
  }
  swipeLeft(cardIndex){
    let user = typeof cardIndex === 'number' ? this.props.nearby.users[cardIndex] : cardIndex;
  }
  swipeRight(cardIndex){
    let user = typeof cardIndex === 'number' ? this.props.nearby.users[cardIndex] : cardIndex;
    this.props.navigation.navigate('SetupDate', user);
  }
  render() {
    let {users} = this.props.nearby;
    if(!users)return <View style={styles.container}><ActivityIndicator size="large" /></View>;


    if(this.state.noCards) return this.renderNoCards();
    return this.renderSwiper(users);
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center'
  },
  card: {
    flex: 1,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: '#E8E8E8',
    justifyContent: 'center',
    backgroundColor: 'white',
    // height: Config.h / 1.45,
  },
  userInfo: {
    backgroundColor:'rgba(0,0,0,0.3)',
    padding: 4,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'absolute',
    left: 0,
    right: 0,
    paddingRight: 10,
    bottom: 0
  },
  cardText: {
    color: 'white'
  },
  cardItem: {
    flexDirection: 'row',
    alignItems: 'center'
  }
})



export default connect(
  (state) => ({nearby: state.nearby}), 
  (dispatch) => (bindActionCreators({getNearby, getDates}, dispatch))
)(Nearby);