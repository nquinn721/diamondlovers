import React from 'react';
import { Text, View, StyleSheet, Alert, ActivityIndicator, TouchableHighlight, Image, TextInput } from 'react-native';
import { bindActionCreators } from 'redux';
import { ImagePicker, BlurView } from 'expo';
import { connect } from 'react-redux';
import Config from 'newApp/app/config/config';
import gStyles, { defaults } from 'newApp/app/config/globalStyles';
import { addImage, deleteImage, setDefaultImage, sortByDefault } from 'newApp/app/redux/actions/image';
console.log(defaults);

class Images extends React.Component {

  renderDetails(user){
    return (
      <View style={styles.details}>
        <View style={styles.item}>
          <Text>Age</Text>
          <TextInput style={styles.itemValue} value={user.profile.age} underlineColorAndroid='rgba(0,0,0,0)'/>
        </View>
        <View style={styles.item}>
          <Text>City</Text>
          <TextInput style={styles.itemValue} value={user.profile.city} underlineColorAndroid='rgba(0,0,0,0)'/>
        </View>
        <View style={styles.item}>
          <Text>State</Text>
          <TextInput style={styles.itemValue} value={user.profile.state} underlineColorAndroid='rgba(0,0,0,0)'/>
        </View>
        <View style={styles.item}>
          <Text>Height</Text>
          <TextInput style={styles.itemValue} value={user.profile.height} underlineColorAndroid='rgba(0,0,0,0)'/>
        </View>
        <View style={styles.item}>
          <Text>Ethnicity</Text>
          <TextInput style={styles.itemValue} value={user.profile.ethnicity} underlineColorAndroid='rgba(0,0,0,0)'/>
        </View>
        <View style={styles.item}>
          <Text>Occupation</Text>
          <TextInput style={styles.itemValue} value={user.profile.occupation} underlineColorAndroid='rgba(0,0,0,0)'/>
        </View>
      </View>
    )
  }


  renderAbout(user){
    return (
      <View style={styles.about}>
        <Text>About You</Text>
        <Text>{user.profile.about}</Text>
      </View>
    )
  }
  render() {
    let {user} = this.props.user;

    return (
      <View style={styles.container}>
        {this.renderDetails(user)}
        {this.renderAbout(user)}
      </View>
    )
  }

}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 10
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10
  },
  itemValue: {
    borderBottomWidth: 1,
    borderBottomColor: '#aaa',
    textAlign: 'right',
    width: defaults.width / 2
  },
  about: {
    padding: 10
  }

  
})




export default connect(
  (state) => ({user: state.user}), 
  // (dispatch) => (bindActionCreators({addImage, deleteImage, setDefaultImage}, dispatch))
)(Images);