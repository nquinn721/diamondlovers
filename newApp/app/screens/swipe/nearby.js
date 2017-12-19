import React from 'react';
import { Text, View, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Icon, Button } from 'react-native-elements';
import Config from 'newApp/app/config/config';
import gStyles from 'newApp/app/config/globalStyles';
import { defaults } from 'newApp/app/config/globalStyles';
import Swiper from 'react-native-deck-swiper';
import { getDefaultImage } from 'newApp/app/redux/reducers/image';
import { getNearby } from 'newApp/app/redux/actions/nearby';
import { getDates } from 'newApp/app/redux/actions/dates';
import Image from 'react-native-image-progress';
import BottomButtons from './components/bottomButtons';
import { setCurrentUser } from 'newApp/app/redux/actions/nearby';
const avatar = require('newApp/app/assets/img/avatar.png');
const img = require('newApp/app/assets/img/Icon-Profiles.png');

class Nearby extends React.Component {
  state = {noCards: false, currentImage: 0};
  static navigationOptions = {
      header:null,
    tabBarIcon: ({ tintColor }) => (
      <Image
        source={img}
          style={[{width: defaults.iconWidth, height: defaults.iconHeight}, {tintColor: tintColor}]}
      />
    ),
  };
  componentDidMount(){
    this.props.getNearby();
    this.props.getDates();
  }

  renderCard(user){
    let image = getDefaultImage(user.profile.defaultImage, user.images) || avatar;

    if(!this.state.currentUser){
      this.props.setCurrentUser(user);
      this.state.currentUser = user;
    }

    return (
      <View style={styles.card} key={user._id}>
        <Image source={image} style={styles.card}/>
        <View style={styles.imageArea}></View>
        <View style={styles.userInfo}>
          <View style={styles.cardSection}>
            <View style={styles.cardItem}>
              <Text style={[styles.cardText, styles.name]}>{defaults.capitalize(user.profile.displayName)}, {user.profile.age || 'N/A'}</Text>
            </View>
            <View style={styles.cardItem}>
              <Text style={[styles.cardText, styles.location]}>{defaults.capitalize(user.profile.city) || 'N/A'},</Text>
              <Text style={[styles.cardText, styles.location]}>{defaults.capitalize(user.profile.state) || 'N/A'}</Text>
            </View>
            
              
            
          </View>
          
          <View style={styles.cardSection}>
            <Image source={require  ('newApp/app/assets/img/Icon-Purchase.png')} style={[styles.costDiamond, StyleSheet.absoluteFill]}/>
            <Text style={[styles.cardText, styles.costDiamondText]}> {user.profile.cost.date1}</Text>
          </View>
        </View>
      </View>
    )
    
  }

  // <View style={styles.userInfoSection}>
  //           <Icon onPress={() => this.props.navigation.navigate('UserProfile', user)} type='font-awesome' name='info-circle' size={25} color='white' />
  //         </View>
  renderNoCards(){
    return (
      <View style={styles.container}>
        <Icon name="ban" type="font-awesome" size={200} color="#eee"/>
        <Text style={{color: '#ccc'}}>No more cards</Text>
      </View>
    )
  }
  renderSwiper(users){
    let swiper = (
      <Swiper
          ref={s => {
            if(this.props.navigation.state.params === 'swipeRight' && s)
              s.swipeRight();
          }}
          cards={users}
          renderCard={(card, cardIndex) => this.renderCard(card, cardIndex)}
          onSwiped={(cardIndex) => {console.log('you swiped', cardIndex)}}
          onSwipedLeft={(user) => this.swipeLeft(user)}
          onSwipedRight={(user) => this.swipeRight(user)}
          onSwipedAll={() => this.setState({noCards: true})}
          cardVerticalMargin={20}
          cardStyle={{height: defaults.availableHeight - 120}}
          showSecondCard={false}
          onTapCard={index => console.log(index)}
          backgroundColor={'white'}
          verticalSwipe={false}
          >
        </Swiper>
    );

    

    return (
      <View style={styles.container}>
        {swiper}      
        <BottomButtons navigation={this.props.navigation}/>
      </View>
    )
  }
  swipeLeft(cardIndex){
    this.currentUser = false;
    let user = typeof cardIndex === 'number' ? this.props.nearby.users[cardIndex] : cardIndex;
  }
  swipeRight(cardIndex){
    this.currentUser = false;
    let user = typeof cardIndex === 'number' ? this.props.nearby.users[cardIndex] : cardIndex;
    this.props.navigation.navigate('SetupDate', user);
  }
  render() {
    
    let {users} = this.props.nearby;


    if(this.props.nearby.fetchingNearbyFailed || this.state.noCards) 
      return this.renderNoCards();
    
    if(!users)return <View style={styles.container}><ActivityIndicator size="large" /></View>;
  
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
  },
  cardSection: {
    padding: 10
  },
  name: {
    fontSize: 20
  },
  location: {
    fontSize: 13
  },
  userInfo: {
    backgroundColor:'rgba(0,0,0,0.6)',
    padding: 4,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'absolute',
    left: 2,
    right: 2,
    display: 'flex',
    bottom: 2
  },
  cardText: {
    color: 'white'
  },
  cardItem: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  costDiamond: {
    width: 30,
    height: 30,
    marginLeft: -10
  },
  costDiamondText: {
    fontSize: 11,
    marginTop: -7,
    marginLeft: -15
  }
})



export default connect(
  (state) => ({nearby: state.nearby}), 
  (dispatch) => (bindActionCreators({getNearby, getDates, setCurrentUser}, dispatch))
)(Nearby);