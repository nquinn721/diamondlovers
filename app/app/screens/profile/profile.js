import React from 'react';
import { Text, View, StyleSheet, Image, ScrollView, TextInput, Switch, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Config from 'app/app/config/config';
import { Icon, Button } from 'react-native-elements';
import gStyles, { defaults } from 'app/app/config/globalStyles';
import Splash from 'app/app/components/splash';
import DiamondCost from 'app/app/components/diamondCost';
import CircleImage from 'app/app/components/circleImage';
import Index from 'app/app/index';
import { logout } from 'app/app/redux/actions/login';
const avatar = require('app/app/assets/img/avatar.png');
const img = require('app/app/assets/img/Icon-My-Profile.png');


class Profile extends React.Component {
  state = {}
  static navigationOptions = {
      tabBarIcon: ({ tintColor }) => (
        <Image
          source={img}
          style={[{width: defaults.iconWidth, height: defaults.iconHeight}, {tintColor: tintColor}]}
        />
      ),
    };


  bottomNav(){
    return(
      <View style={{height: 100, justifyContent: 'flex-end', paddingBottom: 15}}>
        <View style={{flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center'}}>
          <TouchableOpacity onPress={() => this.props.navigation.navigate('Edit', {user: this.props.user.user})}>
            <Image source={require('app/app/assets/img/Icon-Edit.png')} style={styles.bottomNavItem} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.props.navigation.navigate('Cards')}>
            <Image source={require('app/app/assets/img/Icon-Add-Card.png')} style={styles.bottomNavItem} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.props.logout()}>
            <Icon name="sign-out" size={25} type='font-awesome' color={defaults.color} />
          </TouchableOpacity>
        </View>
      </View>
    )
  }
        // <Image source={require('app/app/assets/img/Icon-Settings.png')} style={styles.bottomNavItem} />
  
  displayProfileInfo({user} = this.props.user){
    
      return (
        <View style={styles.profileInfo}>
         <DiamondCost cost={user.profile.cost.date1} style={styles.profileDiamonds}/>
          
          <Text style={[styles.profileText, styles.userName]}>{defaults.capitalize(user.profile.displayName)}</Text>
          <View style={gStyles.row}>
            <Text style={styles.profileText}>{user.profile.age || 'N/A'}, </Text>
            <Text style={styles.profileText}>{defaults.capitalize(user.profile.career) || 'N/A'}</Text>
          </View>
          <Text style={styles.profileText}>{(defaults.capitalize(user.profile.city) || 'N/A') + ', ' + (defaults.capitalize(user.profile.state) || 'N/A')}</Text>
          <View style={styles.profileAbout}>
            <Text style={styles.profileText}>{defaults.capitalize(user.profile.about) || 'N/A'}</Text>
          </View>
        </View>
      )
  }
  
  displayUser({user} = this.props.user, {image} = this.props){    
    if(!user || !image)return;
    
    let img =  image.defaultImage || avatar;
    
    return (
      <View style={styles.profileImage}>
        <Image source={img} style={styles.profileImage} />
        <CircleImage source={img} container={styles.mainImage} />
        <View style={[styles.profileImageOverlay, StyleSheet.absoluteFill]}></View>
        {this.displayProfileInfo()}
      </View>

    )
  }

  
  render() {
    return (
      <View style={styles.container}>
        <KeyboardAvoidingView
          style={styles.container}
          behavior="padding"
        >
        {this.displayUser()}
        {this.bottomNav()}
        </KeyboardAvoidingView>
      </View>
    )
  }

}

const styles = StyleSheet.create({
   container: {
     flex: 1,
     backgroundColor: 'white'
   },
   profileImage: {
     flex: 2,
     position: 'relative'
   },
   profileImageOverlay: {
     backgroundColor: 'rgba(0,0,0,0.6)'
   },
   mainImage: {
     position: 'absolute',
     top: 50,
     left: (defaults.width / 2) - 75,
     width: 150,
     height: 150,
     // borderRadius: 100,
     // overflow: 'hidden',
     borderWidth: 2,
     borderColor: 'white',
     zIndex: 1
   },
   bottomNavItem: {
     width: 60,
     height: 60   
   },
   profileInfo: {
     position: 'absolute',
     bottom: 0,
     width: defaults.width,
     padding: 10,
     zIndex: 1
   },
   profileText: {
     color: 'white',
     fontSize: 16,
     backgroundColor: 'rgba(0,0,0,0)'
   },
   userName: {
     fontSize: 24
   },
   profileAbout: {
     marginTop: 15
   },
   profileDiamonds: {
    position: 'absolute',
    right: 30,
    marginTop: 15
   },
    costDiamond: {
      width: 50,
      height: 50,

    },
    costDiamondText: {
      fontSize: 13,
      color: 'white',
      marginTop: 7,
      backgroundColor: 'rgba(0,0,0,0)',
    }
})




export default connect(
  (state) => ({user: state.user, image: state.image}), 
  (dispatch) => (bindActionCreators({logout}, dispatch))
)(Profile);