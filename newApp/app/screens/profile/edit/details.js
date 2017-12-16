import React from 'react';
import { Text, View, StyleSheet, Alert, ActivityIndicator, TouchableHighlight, Image, TextInput, Picker, Item, ScrollView } from 'react-native';
import { bindActionCreators } from 'redux';
import { ImagePicker, BlurView } from 'expo';
import { connect } from 'react-redux';
import Config from 'newApp/app/config/config';
import gStyles, { defaults } from 'newApp/app/config/globalStyles';
import { updateProfile } from 'newApp/app/redux/actions/user';
import { addImage, deleteImage, setDefaultImage, sortByDefault } from 'newApp/app/redux/actions/image';
const states = [
  'Alabama',
  'Alaska',
  'Arizona',
  'Arkansas',
  'California',
  'Colorado',
  'Connecticut',
  'Delaware',
  'Florida',
  'Georgia',
  'Hawaii',
  'Idaho',
  'Illinois Indiana',
  'Iowa',
  'Kansas',
  'Kentucky',
  'Louisiana',
  'Maine',
  'Maryland',
  'Massachusetts',
  'Michigan',
  'Minnesota',
  'Mississippi',
  'Missouri',
  'Montana Nebraska',
  'Nevada',
  'New Hampshire',
  'New Jersey',
  'New Mexico',
  'New York',
  'North Carolina',
  'North Dakota',
  'Ohio',
  'Oklahoma',
  'Oregon',
  'Pennsylvania Rhode Island',
  'South Carolina',
  'South Dakota',
  'Tennessee',
  'Texas',
  'Utah',
  'Vermont',
  'Virginia',
  'Washington',
  'West Virginia',
  'Wisconsin',
  'Wyoming',
];

const feet = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];
const inches = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11'];


class Images extends React.Component {
  updateProfile(field, value){
    clearTimeout(this.timer);
    this.timer = setTimeout(function() {
      this.props.updateProfile(field, value);
      
    }.bind(this), 1000);
  }
  renderDetails(user){
    return (
      <View style={styles.details}>
        <View style={styles.item}>
          <Text>Age</Text>
          <TextInput 
            style={styles.itemValue} 
            value={user.profile.age && user.profile.age.toString()} 
            underlineColorAndroid='rgba(0,0,0,0)' 
            onChangeText={(value) => this.updateProfile('age', value)}/>
        </View>
        <View style={styles.item}>
          <Text>City</Text>
          <TextInput 
            style={styles.itemValue} 
            value={user.profile.city} 
            underlineColorAndroid='rgba(0,0,0,0)'
            onChangeText={(value) => this.updateProfile('city', value)}/>
        </View>
        <View style={styles.item}>
          <Text style={{flex: 1}}>State</Text>

          <Picker
           style={{flex: 1}}
           mode="dropdown"
           selectedValue={user.profile.state}
           onValueChange={(state)=> this.updateProfile('state', state)}>
           {states.map((item, index) => <Picker.Item label={item} value={item} key={index} />)}
        </Picker>
          
        </View>
        <View style={styles.item}>
          <Text style={{flex: 1}}>Height</Text>
          <Picker
           style={{flex: 1}}
           mode="dropdown"
           selectedValue={user.profile.height.feet}
           onValueChange={(feet) => this.updateProfile('feet', feet)}>
           {feet.map((item, index) => <Picker.Item label={item} value={item} key={index} />)}
        </Picker>
          <Picker
           style={{flex: 1}}
           mode="dropdown"
           selectedValue={user.profile.height.inches}
           onValueChange={(inches) => this.updateProfile('inches', inches)}>
           {inches.map((item, index) => <Picker.Item label={item} value={item} key={index} />)}
        </Picker>
        </View>
        <View style={styles.item}>
          <Text>Ethnicity</Text>
          <TextInput 
            style={styles.itemValue} 
            value={user.profile.ethnicity} 
            underlineColorAndroid='rgba(0,0,0,0)'
            onChangeText={(value) => this.updateProfile('ethnicity', value)}/>
        </View>
        <View style={styles.item}>
          <Text>Occupation</Text>
          <TextInput 
            style={styles.itemValue} 
            value={user.profile.occupation} 
            underlineColorAndroid='rgba(0,0,0,0)'
            onChangeText={(value) => this.updateProfile('occupation', value)}/>
        </View>
      </View>
    )
  }
// <TextInput 
//             style={styles.itemValue} 
//             value={user.profile.state} 
//             underlineColorAndroid='rgba(0,0,0,0)'
//             onChangeText={(value) => this.updateProfile('state', value)}/>

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
    console.log(user);
    
    return (
      <ScrollView style={styles.container}>
        {this.renderDetails(user)}
        {this.renderAbout(user)}
      </ScrollView>
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
  (dispatch) => (bindActionCreators({updateProfile}, dispatch))
)(Images);