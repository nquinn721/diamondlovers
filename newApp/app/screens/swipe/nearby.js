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
import { getChats } from 'newApp/app/redux/actions/chat';
import Image from 'react-native-image-progress';
import BottomButtons from './components/bottomButtons';
import { setCurrentUser } from 'newApp/app/redux/actions/nearby';
import DiamondCost from 'newApp/app/components/diamondCost';
const icon = require('newApp/app/assets/img/Icon-Profiles.png');

class Nearby extends React.Component {
  state = {noCards: false, currentImage: 0};
  currentUserIndex = 0;

  static navigationOptions = {
      header:null,
    tabBarIcon: ({ tintColor }) => (
      <Image
        source={icon}
          style={[{width: defaults.iconWidth, height: defaults.iconHeight}, {tintColor: tintColor}]}
      />
    ),
  };
  componentDidMount(){
    this.props.getNearby();
    this.props.getDates();
  }

  renderCard(user){
    let image = getDefaultImage(user.profile.defaultImage, user.images);

    return (
      <View style={styles.card} key={user._id}>
        <Image source={image} style={StyleSheet.absoluteFill} />
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
          
         <DiamondCost cost={user.profile.cost.date1} style={styles.dateCost}/>
          
        </View>
      </View>
    )
    
  }

  

  renderNoCards(){
    return (
      <View style={[styles.container, {alignItems: 'center', justifyContent: 'center'}]}>
        <Icon name="ban" type="font-awesome" size={200} color="#eee"/>
        <Text style={{color: '#ccc'}}>No more cards</Text>
      </View>
    )
  }
  renderSwiper(users){
    let swiper = (
      <Swiper
          ref={s => {
            if(s)this.swiper = s;
            // if(this.props.navigation.state.params && this.props.navigation.state.params.direction && s){
            //   this[this.props.navigation.state.params.direction](true);
            //   delete this.props.navigation.state.params.direction;
            // }
          }}
          cards={users}
          renderCard={(card, cardIndex) => this.renderCard(card, cardIndex)}
          onSwiped={(cardIndex) => {console.log('you swiped', cardIndex)}}
          onSwipedLeft={(index) => this.swipeLeft()}
          onSwipedRight={(user) => this.swipeRight()}
          onSwipedAll={() => this.setState({noCards: true})}
          cardVerticalMargin={20}
          style={{flex: 1}}
          showSecondCard={false}
          onTapCard={index => console.log(index)}
          backgroundColor={'white'}
          verticalSwipe={false}
          >
        </Swiper>
    );

    

    return (
      <View style={styles.container}>
        <View style={{flex: 1, backgroundColor: 'red', marginBottom: 10}}>{swiper}</View>
        <BottomButtons  swipeRight={this.swipeRight.bind(this)} swipeLeft={this.swipeLeft.bind(this, true)} info={this.info.bind(this)}/>
      </View>
    )
  }

  info(){
    let user = this.swiper.props.cards[this.currentUserIndex];
    this.props.navigation.navigate('UserProfile', user);
  }
  swipeLeft(swipe){
    console.log('swiping left');
    this.currentUserIndex++;
    let user = this.swiper.props.cards[this.currentUserIndex];
    swipe && this.swiper.swipeLeft();
  }
  swipeRight(){
    let user = this.swiper.props.cards[this.currentUserIndex];
    this.props.navigation.navigate('Details', user);
  }
  render() {
    console.log('render');
    let {users} = this.props.nearby;
    if(!users)return <View style={styles.container}><ActivityIndicator size="large" /></View>;

    if(this.props.nearby.fetchingNearbyFailed || this.state.noCards) 
      return this.renderNoCards();
    
  
    return this.renderSwiper(users);
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  card: {
    flex: 1,
    borderRadius: 4,
    marginBottom: 140,
    borderWidth: 2,
    borderColor: '#E8E8E8',
    backgroundColor: 'white',
    overflow: 'hidden'
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
    bottom: 10
  },
  cardText: {
    color: 'white'
  },
  cardItem: {
    flexDirection: 'row',
    alignItems: 'center'
  },
})



export default connect(
  (state) => ({nearby: state.nearby}), 
  (dispatch) => (bindActionCreators({getNearby, getDates, setCurrentUser}, dispatch))
)(Nearby);