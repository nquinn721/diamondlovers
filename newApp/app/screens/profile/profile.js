import React from 'react';
import { Text, View, StyleSheet, Image, ScrollView, TextInput } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Config from 'newApp/app/config/config';
import { Icon, Button } from 'react-native-elements';
import gStyles from 'newApp/app/config/globalStyles';
import Splash from 'newApp/app/components/splash';
import { updateProfile } from 'newApp/app/redux/actions/user';
const avatar = require('newApp/app/assets/img/avatar.png');


class Profile extends React.Component {
  state = {}
  editItem(item, field, value){
    let elements = item.split(',');
    this.setState({splash: (
      <Splash
        style={{height: 200}}
         content={() => {
            return (
              <View>
                {
                  elements.map((v, i) => {
                    let el = v.split('=');                    
                    return (
                      <View key={i} style={gStyles.group}>
                        <Text>{el[0]}</Text>
                        <TextInput 
                          style={styles.textInput}
                          keyboardType = 'numeric'
                          onChangeText = {(newVal)=> value = newVal}
                          value = {value}
                        />
                      </View>
                    ) 
                  })
                }
                
                <Button 
                  raised
                  icon={{name: 'check', size: 15, type: 'font-awesome'}}
                  buttonStyle={gStyles.button}
                  title=""
                  onPress={() => {
                    this.props.updateProfile(field, value);
                    this.setState({splash: null});
                  }}
                  />
              </View>
            )
         }}
       />
      )});
  }
 	displayUser({isFetching, user}){
    let page = [];
		if(user){
      return (
        <View style={gStyles.padding}>
          <Text>{user.profile.age}, {user.profile.sex}</Text>
          <Text>{user.profile.city}, {user.profile.state} {user.profile.zip}</Text>
          <View style={gStyles.group}>
            <Icon name='diamond' type='font-awesome' size={15} />
            <Text> {user.diamonds}</Text> 
          </View>
          <View style={gStyles.group}>
            <Icon name='graduation-cap' type='font-awesome' size={15} />
            <Text>{user.profile.education}</Text>
          </View>
          <Text>{user.email}</Text>
          <View style={[gStyles.group, styles.profileItem]}>
            <Text>Height:</Text>
            <Text>{user.profile.height}</Text>
            <Icon name='edit' type='font-awesome' size={15} onPress={() => this.editItem('feet=number,inches=number', 'height', user.profile.height)}/>
          </View>
          <Text>Drugs: {user.profile.drugs}</Text>
          <Text>Drinks: {user.profile.drinks}</Text>
          <Text>Smokes: {user.profile.smokes}</Text>
          <View style={gStyles.paragraph}>
            <Text>About...</Text>
            <Text>{user.profile.about}</Text>
          </View>
        </View>
      );
    } 

    return <View>{page}</View>
	}

  displayDefaultImage({user} = this.props.user, {image} = this.props){    
    if(!user || !image)return;
    
    let img =  image.defaultImage || avatar;
    
    return <Image source={img} style={styles.profileImage} />   
  }
		
  render() {
    return (
      <View style={styles.container}>
        {this.state.splash}
        <ScrollView style={styles.container}>
          {this.displayDefaultImage()}
          <Button 
            raised
            icon={{name: 'credit-card', size: 15}}
            buttonStyle={styles.profileButton}
            textStyle={{textAlign: 'center'}}
            title="Cards"
            onPress={() => this.props.navigation.navigate('Cards')}
          />
          <Button 
            raised
            icon={{name: 'image', size: 15}}
            buttonStyle={styles.profileButton}
            textStyle={{textAlign: 'center'}}
            title="Profile Images"
            onPress={() => this.props.navigation.navigate('Images')}
          />
          {this.displayUser(this.props.user)}

          <Button 
            raised
            icon={{name: 'image', size: 15}}
            buttonStyle={styles.profileButton}
            title="Logout"
            onPress={() => this.props.navigation.navigate('Images')}
          />

        </ScrollView>
      </View>
    )
  }

}

const styles = StyleSheet.create({
  profileButton:{
    backgroundColor: '#2980b9', 
    borderRadius: 5
  },
  profileImage: {
    width:Config.w,
    height:Config.h / 2
  },
  profileItem: {
    justifyContent: 'space-between'
  }
})




export default connect(
  (state) => ({user: state.user, image: state.image}), 
  (dispatch) => (bindActionCreators({updateProfile}, dispatch))
)(Profile);