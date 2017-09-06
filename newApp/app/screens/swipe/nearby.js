import React from 'react';
import { Text, View, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Icon } from 'react-native-elements';
import Config from 'newApp/app/config/config';
import gStyles from 'newApp/app/config/globalStyles';
import Swiper from 'react-native-deck-swiper';
import { getDefaultImage } from 'newApp/app/redux/reducers/image';
import { getNearby } from 'newApp/app/redux/actions/nearby';
import Image from 'react-native-image-progress';
import ProgressBar from 'react-native-progress/Bar';
const avatar = require('newApp/app/assets/img/avatar.png');

class Nearby extends React.Component {
  state = {noCards: false, currentImage: 0}
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
                <Text style={styles.cardText}>{user.profile.cost.date1}</Text>
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
  renderBottomButtons(user){
    return (
      <View style={styles.bottomButtons}>
        <View style={styles.bottomButtonsItem}>
          <TouchableOpacity onPress={() => this.undoCard(user)}>
            <Icon name="undo" type="font-awesome" size={30} color="#95a5a6" />
          </TouchableOpacity>
        </View>
        <View  style={[styles.bottomButtonsItem, styles.center]}>
          <TouchableOpacity onPress={() => this.handleNope(user)}>
            <Text style={styles.no}>X</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.handleYup(user)}>
            <Icon name="check" type="font-awesome" size={30} color="#2ecc71" />
          </TouchableOpacity>
        </View>
        <View style={styles.bottomButtonsItem}>
          <TouchableOpacity onPress={() => this.gotToCalendar(user)}>
            <Icon name="calendar" type="font-awesome" size={30} color="#f39c12" />
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  swiper(users){
    if(this.state.noCards) return (<Text>No cards Left</Text>)
    return (
      <Swiper
          cards={users}
          renderCard={(card, cardIndex) => this.displayNearby(card, cardIndex)}
          onSwiped={(cardIndex) => {console.log('you swiped', cardIndex)}}
          onSwipedLeft={(user) => this.handleNope(user)}
          onSwipedRight={(user) => this.handleYup(user)}
          onSwipedAll={() => this.setState({noCards: true})}
          cardIndex={0}
          showSecondCard={false}
          cardVerticalMargin={20}
          cardStyle={styles.card}
          onTapCard={index => console.log(index)}
          backgroundColor={'white'}>

      </Swiper>
    )
  }
  handleNope(cardIndex){
    let user = typeof cardIndex === 'number' ? this.props.nearby.users[cardIndex] : cardIndex;
    console.log(user);
  }
  handleYup(cardIndex){
    let user = typeof cardIndex === 'number' ? this.props.nearby.users[cardIndex] : cardIndex;
    console.log(user);
  }
  undoCard(user){
    
  }
  render() {
    let {users} = this.props.nearby;
    if(!users)return <View style={styles.container}><ActivityIndicator size="large" /></View>;


      
    return (
      <View style={styles.container}>
        {this.swiper(users)}
        {this.renderBottomButtons()}
       </View>
      )
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  bottomButtonsItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    justifyContent: 'center',
    flex: 1
  },
  center: {
    justifyContent: 'space-around',
  },
  no: {
    color: '#e74c3c',
    fontWeight: '900',
    fontSize: 30
  },
   card: {
    flex: 1,
    justifyContent: 'space-between',
    width: Config.w - 50,
    height: Config.h / 1.45,
    backgroundColor: '#aaa',
    borderRadius: 4
  },
  userInfo: {
    backgroundColor:'rgba(0,0,0,0.2)',
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
  dots: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    top: 0,
    width: Config.w - 50,
    zIndex: 1000,
    justifyContent: 'center'
  },
  dot: {
    backgroundColor: '#eee',
    width: 8,
    height: 8,
    margin: 5,
    borderRadius: 100
  },
  selectedDot: {
    backgroundColor: '#3498db',
  },
  bottomButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: Config.h / 10,
    position: 'absolute',
    bottom: 0,
    width: Config.w
  },
  cardItem: {
    flexDirection: 'row',
    alignItems: 'center'
  }
})



export default connect(
  (state) => ({nearby: state.nearby}), 
  (dispatch) => (bindActionCreators({getNearby}, dispatch))
)(Nearby);