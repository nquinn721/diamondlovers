import React from 'react';
import { StyleSheet, Text, View, Image, Button } from 'react-native';
import { ImagePicker } from 'expo';
import Service from 'app/app/components/service';
import Settings from 'app/app/components/settings';
import User from 'app/app/components/user';

export default class ProfilePage extends React.Component {
  state = {}
   _pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
    });

    if (!result.cancelled) {
      Service.uploadImage(result.uri);
      this.setState({ image: result.uri });
    }
  };
  renderProfilePics(){
    let pics = [];
    for(let i = 0; i < User.user.profile.images.length; i++){
      let pic = User.user.profile.images[i];
      console.log(pic);
      pics.push(
        <Image
          style={{width: 50, height: 50}}
          source={{uri: Settings.baseUrl + pic.location + pic.name}}
          key={i}
        />
      );
    }
    return pics;
  }
  renderProfile(){
    return (
      <View style={styles.container}>
        <Text>Profile</Text>
        {this.renderProfilePics()}
        <Button
          title="Pick an image from camera roll"
          onPress={this._pickImage}
        />

        {this.state.image ? <Image source={{uri: this.state.image}} style={{width:100, height:100}}></Image> : <Text></Text>}
        </View>
        );
  }
  render() { 
     return (
        <View style={styles.container}>
          {User.user ? this.renderProfile() : <Text>Login to see profile</Text>}
        </View>
      );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
});
