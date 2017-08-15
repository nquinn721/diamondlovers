import React from 'react';
import { StyleSheet, Text, View, Image, Button } from 'react-native';
import User from 'app/app/components/user';

export default class ProfilePage extends React.Component {
  renderProfile(){
    return (
      <View style={styles.container}>
        <Text>Profile</Text>
        <Button 
          title="Cards"
          onPress={() => this.props.changeView('profileCards')}
        />
        <Button
          title="Images"
          onPress={() => this.props.changeView('profileImages')}
        />

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
