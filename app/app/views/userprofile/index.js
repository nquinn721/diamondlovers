import React from 'react';
import { StyleSheet, Text, View, Image, Button, TouchableOpacity} from 'react-native';
import User from 'app/app/components/user';
import Settings from 'app/app/components/settings';

export default class ProfilePage extends React.Component {
  renderProfile(){
    return (
      <View style={styles.container}>
        <Text>Profile</Text>
        <View style={styles.profileImage}>
          <Image 
            style={styles.profileImageImg}
            source={User.getDefaultImage()}
            />
        </View>
        <View style={styles.profilePages}>
          <TouchableOpacity style={styles.profilePageButton} onPress={() => this.props.changeView('userProfileCards')}>
            <Text style={styles.whiteColor}>Cards</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.profilePageButton} onPress={() => this.props.changeView('userProfileImages')}>
            <Text style={styles.whiteColor}>Images</Text>
          </TouchableOpacity>
        </View>
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
    justifyContent: 'center',
    margin: 10
  },
  whiteColor: {
    color: 'white'
  },
  profilePages: {
    flex: 1,
    height: Settings.h / 2,
    width: Settings.w
  },
  profilePageButton: {
    height: 20,
    backgroundColor: '#3297d3',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    width: Settings.w
  },
  profileImage: {
    flex: 1,
    height: Settings.h / 2,
    width: Settings.w
  },
  profileImageImg: {
    flex: 1,
    width: Settings.w
  }
});
