import React from 'react';
import { Text, View, StyleSheet, ActivityIndicator, TouchableOpacity, Image } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Icon, Button } from 'react-native-elements';
import Config from 'app/app/config/config';
import gStyles from 'app/app/config/globalStyles';
import { defaults } from 'app/app/config/globalStyles';
import Swiper from 'react-native-deck-swiper';
import { getDefaultImage } from 'app/app/redux/reducers/image';
import { getNearby } from 'app/app/redux/actions/nearby';
import { getDates } from 'app/app/redux/actions/dates';
import { getChats } from 'app/app/redux/actions/chat';
import ImageProgress from 'react-native-image-progress';
import BottomButtons from './components/bottomButtons';
import { setCurrentUser } from 'app/app/redux/actions/nearby';
import { updateSearchIndex } from 'app/app/redux/actions/user';
import DiamondCost from 'app/app/components/diamondCost';
import Splash from 'app/app/components/splash';
const icon = require('app/app/assets/img/Icon-Profiles.png');

class Nearby extends React.Component {
  state = {noCards: false, currentImage: 0};

  static navigationOptions = {
    tabBarIcon: ({ tintColor }) => (
      <Image
        source={icon}
          style={[{width: defaults.iconWidth, height: defaults.iconHeight}, {tintColor}]}
      />
    ),
  };
  componentDidMount(){
    this.props.getNearby();
    this.props.getDates();
  }

  renderCard(user){
    if(!user)return;
    let image = getDefaultImage(user.profile.defaultImage, user.images);

    return (
      <View style={styles.card} key={user._id}>
        <ImageProgress source={image} style={StyleSheet.absoluteFill} />
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
    let {navigation} = this.props;

    let swiper = (
      <Swiper
          ref={s => {
            if(s)this.swiper = s;
            if(navigation.state && navigation.state.params && navigation.state.params.direction && s && !this.swipedFromNav){
              this.swipedFromNav = true;
              s[navigation.state.params.direction]();
            }
          }}
          cards={users}
          renderCard={(card, cardIndex) => this.renderCard(card, cardIndex)}
          onSwiped={(cardIndex) => {console.log('you swiped', cardIndex)}}
          onSwipedLeft={(index) => {
            if(!navigation.state.params || !navigation.state.params.direction)
              this.swipeLeft();
            else {
              this.props.updateSearchIndex();
              delete navigation.state.params.direction;
              this.swipedFromNav = false;
            }
          }}
          onSwipedRight={(user) => {
            if(!navigation.state.params || !navigation.state.params.direction)
              this.swipeRight();
            else {
              this.props.updateSearchIndex();
              delete navigation.state.params.direction;
              this.swipedFromNav = false;
            }
          }}
          onSwipedAll={() => this.setState({noCards: true})}
          cardVerticalMargin={20}
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
        <BottomButtons swipeRight={this.swipeRight.bind(this)} swipeLeft={this.swipeLeft.bind(this, true)} info={this.info.bind(this)}/>
      </View>
    )
  }

  info(){
    let user = this.swiper.props.cards[0];
    this.props.navigation.navigate('UserProfile', user);
  }
  swipeLeft(swipe){
    this.props.updateSearchIndex();
    let user = this.swiper.props.cards[0];
  }
  swipeRight(swipe){
    let user = this.swiper.props.cards[0];
    this.props.setCurrentUser(user);
    this.props.navigation.navigate('Details', user);
  }
  render() {
    let {users, fetchingNearbyFailed} = this.props.nearby;

    if(!users && !fetchingNearbyFailed)return <View style={styles.container}><ActivityIndicator style={{flex: 1}} size="large" /></View>;

    if(fetchingNearbyFailed || this.state.noCards || !users.length) 
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
    borderRadius: 4,
    marginBottom: 140,
    height: defaults.height - 300,
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
    bottom: 0
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
  (dispatch) => (bindActionCreators({getNearby, getDates, setCurrentUser, updateSearchIndex}, dispatch))
)(Nearby);