import React from 'react';
import { StyleSheet, Text, View, Image, Button, Dimensions } from 'react-native';
import { ImagePicker } from 'expo';
import Service from '../components/service';
import Settings from '../components/settings';

console.log(Dimensions.get('window'));
export default class ProfilePage extends React.Component {
  state = {}
   _pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
    });

    console.log(result);

    if (!result.cancelled) {
      console.log('calling upload image from service')
      Service.uploadImage(result.uri);
      this.setState({ image: result.uri });
    }
  };
  render() {
    return (
      <View style={styles.container}>
        <Text>Profile</Text>
        <Button
          title="Pick an image from camera roll"
          onPress={this._pickImage}
        />
        {this.state.image ? <Image source={{uri: this.state.image}} style={{width:100, height:100}}></Image> : <Text></Text>}
        
       
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
