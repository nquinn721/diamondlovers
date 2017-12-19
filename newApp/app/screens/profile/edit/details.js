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
  {name: 'ALABAMA', abbr: 'AL'},
  {name: 'ALASKA', abbr: 'AK'},
  {name: 'ARIZONA', abbr: 'AZ'},
  {name: 'ARKANSAS', abbr: 'AR'},
  {name: 'CALIFORNIA', abbr: 'CA'},
  {name: 'COLORADO', abbr: 'CO'},
  {name: 'CONNECTICUT', abbr: 'CT'},
  {name: 'DELAWARE', abbr: 'DE'},
  {name: 'FLORIDA', abbr: 'FL'},
  {name: 'GEORGIA', abbr: 'GA'},
  {name: 'HAWAII', abbr: 'HI'},
  {name: 'IDAHO', abbr: 'ID'},
  {name: 'ILLINOIS', abbr: 'IL'},
  {name: 'INDIANA', abbr: 'IN'},
  {name: 'IOWA', abbr: 'IA'},
  {name: 'KANSAS', abbr: 'KS'},
  {name: 'KENTUCKY', abbr: 'KY'},
  {name: 'LOUISIANA', abbr: 'LA'},
  {name: 'MAINE', abbr: 'ME'},
  {name: 'MARYLAND', abbr: 'MD'},
  {name: 'MASSACHUSETTS', abbr: 'MA'},
  {name: 'MICHIGAN', abbr: 'MI'},
  {name: 'MINNESOTA', abbr: 'MN'},
  {name: 'MISSISSIPPI', abbr: 'MS'},
  {name: 'MISSOURI', abbr: 'MO'},
  {name: 'MONTANA', abbr: 'MT'},
  {name: 'NEBRASKA', abbr: 'NE'},
  {name: 'NEVADA', abbr: 'NV'},
  {name: 'NEW HAMPSHIRE', abbr: 'NH'},
  {name: 'NEW JERSEY', abbr: 'NJ'},
  {name: 'NEW MEXICO', abbr: 'NM'},
  {name: 'NEW YORK', abbr: 'NY'},
  {name: 'NORTH CAROLINA', abbr: 'NC'},
  {name: 'NORTH DAKOTA', abbr: 'ND'},
  {name: 'OHIO', abbr: 'OH'},
  {name: 'OKLAHOMA', abbr: 'OK'},
  {name: 'OREGON', abbr: 'OR'},
  {name: 'PENNSYLVANIA', abbr: 'PA'},
  {name: 'RHODE ISLAND', abbr: 'RI'},
  {name: 'SOUTH CAROLINA', abbr: 'SC'},
  {name: 'SOUTH DAKOTA', abbr: 'SD'},
  {name: 'TENNESSEE', abbr: 'TN'},
  {name: 'TEXAS', abbr: 'TX'},
  {name: 'UTAH', abbr: 'UT'},
  {name: 'VERMONT', abbr: 'VT'},
  {name: 'VIRGINIA', abbr: 'VA'},
  {name: 'WASHINGTON', abbr: 'WA'},
  {name: 'WEST VIRGINIA', abbr: 'WV'},
  {name: 'WISCONSIN', abbr: 'WI'},
  {name: 'WYOMING', abbr: 'WY'},
];

const feet = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];
const inches = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11'];


class Images extends React.Component {
  updateProfile(field, value){
    console.log('setting state', field, value);
    
    this.setState({about: value});

    // clearTimeout(this.timer);
    // this.timer = setTimeout(function() {
    //   this.props.updateProfile(field, value);
      
    // }.bind(this), 1000);
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
           {states.map((item, index) => <Picker.Item label={item.name} value={item.abbr} key={index} />)}
        </Picker>
          
        </View>
        <View style={styles.item}>
          <Text style={{flex: 1}}>Height</Text>
          <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
            <Text>ft</Text>
            <Picker
             style={{flex: 1, height: 20}}
             mode="dropdown"
             selectedValue={user.profile.height && user.profile.height.feet}
             onValueChange={(feet) => this.updateProfile('height.feet', feet)}>
             {feet.map((item, index) => <Picker.Item label={item} value={item} key={index} />)}
          </Picker>
          <Text>in</Text>
            <Picker
             style={{flex: 1}}
             mode="dropdown"
             selectedValue={user.profile.height && user.profile.height.inches}
             onValueChange={(inches) => this.updateProfile('height.inches', inches)}>
             {inches.map((item, index) => <Picker.Item label={item} value={item} key={index} />)}
          </Picker>
        </View>
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

  renderAbout(user){
    console.log(this.state.about);
    
    return (
      <View style={styles.about}>
        <Text>About You</Text>
        <TextInput
          multiline={true}
          numberOfLines={4}
          onChangeText={(text) => this.updateProfile('about', text)}
          value={this.state.about}/>
      </View>
    )
  }
  render() {
    let {user} = this.props.user;
    this.state = {
      ...user.profile
    }
    
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