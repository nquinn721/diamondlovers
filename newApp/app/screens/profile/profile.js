import React from 'react';
import { Text, View, StyleSheet, Image, ScrollView, TextInput, Switch } from 'react-native';
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
    this.state.fieldElements = item.split(',');
    this.state.fieldValue = value;
    this.state.fieldField = field;
    console.log('edit item');
    
    this.setState({splash: true});
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
          <View style={[gStyles.group, styles.profileItem]}>
            <Text>Drugs: </Text>
            <Text>{user.profile.drugs ? 'Yes' : 'No'}</Text>
            <Icon name='edit' type='font-awesome' size={15} onPress={() => this.editItem('drugs=boolean', 'drugs', user.profile.drugs)}/>
          </View>
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

  renderSplash(){
    if(!this.state.splash)return;
    return (
      <Splash
        style={{height: 200}}
         content={() => {
           console.log('content');
           
            return (
              <View>
                {
                  this.state.fieldElements.map((v, i) => {
                    let el = v.split('=');                    
                    return (
                      <View key={i} style={gStyles.group}>
                        <Text>{el[0]}</Text>
                        {
                          el[1].match(/number|text/) ?
                            <TextInput 
                              style={styles.textInput}
                              keyboardType = {(el[1] === 'number' ? 'numeric' : 'default')}
                              onChangeText = {(newVal)=> this.state.fieldValue = newVal}
                              value = {this.state.fieldValue}
                            />
                          :  <Switch
                            onValueChange={(fieldValue) => {
                              this.setState({fieldValue})
                            }}
                            value={this.state.fieldValue}
                          />
                        }
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
                    this.props.updateProfile(this.state.fieldField, this.state.fieldValue);
                    this.setState({splash: null});
                  }}
                  />
              </View>
            )
         }}
       />
     );
  }
		
  render() {
    return (
      <View style={styles.container}>
        {this.renderSplash()}
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