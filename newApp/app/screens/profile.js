import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { connect } from 'react-redux';

class ProfileScreen extends React.Component {

  render() {
    if(!this.props.user)return <View style={styles.container}><Text>No user selected</Text></View>
    return (
      <View style={styles.container}>
        <Text>Username: {this.props.user.name}</Text>
        <Text>Height: {this.props.user.height}</Text>
        <Text>Mass: {this.props.user.mass}</Text>
        <Text>Hair Color: {this.props.user.hair_color}</Text>
        <Text>Skin Color: {this.props.user.skin_color}</Text>
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

function mapStateToProps(state) {
    return {user: state.activeUser}
}

export default connect(mapStateToProps)(ProfileScreen);