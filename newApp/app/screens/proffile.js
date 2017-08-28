import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { connect } from 'react-redux';

class ProfileScreen extends React.Component {
 
  render(user = this.props.user) {
    if(!user)return <View style={styles.container}><Text>No user selected</Text></View>
    return (
      <View style={styles.container}>
        <Text>Username: {user.name}</Text>
        <Text>Height: {user.height}</Text>
        <Text>Mass: {user.mass}</Text>
        <Text>Hair Color: {user.hair_color}</Text>
        <Text>Skin Color: {user.skin_color}</Text>
      </View>
    )
  }

}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center', 
    justifyContent: 'center', 
    flex: 1
  }
})


export default connect(
  (state) => ({user: state.activeUser})
)(ProfileScreen);