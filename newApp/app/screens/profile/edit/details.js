import React from 'react';
import { Text, View, StyleSheet, Alert, ActivityIndicator, TouchableHighlight, Image, TextInput, Picker, Item, ScrollView } from 'react-native';
import { bindActionCreators } from 'redux';
import { ImagePicker, BlurView } from 'expo';
import { connect } from 'react-redux';
import Config from 'newApp/app/config/config';
import gStyles, { defaults } from 'newApp/app/config/globalStyles';
import { updateProfile } from 'newApp/app/redux/actions/user';
import { addImage, deleteImage, setDefaultImage, sortByDefault } from 'newApp/app/redux/actions/image';
import ModalPicker from 'react-native-modal-picker'


const states = [
  {label: 'ALABAMA', abbr: 'al', key: 'al'},
  {label: 'ALASKA', abbr: 'ak', key: 'ak'},
  {label: 'ARIZONA', abbr: 'az', key: 'az'},
  {label: 'ARKANSAS', abbr: 'ar', key: 'ar'},
  {label: 'CALIFORNIA', abbr: 'ca', key: 'ca'},
  {label: 'COLORADO', abbr: 'co', key: 'co'},
  {label: 'CONNECTICUT', abbr: 'ct', key: 'ct'},
  {label: 'DELAWARE', abbr: 'de', key: 'de'},
  {label: 'FLORIDA', abbr: 'fl', key: 'fl'},
  {label: 'GEORGIA', abbr: 'ga', key: 'ga'},
  {label: 'HAWAII', abbr: 'hi', key: 'hi'},
  {label: 'IDAHO', abbr: 'id', key: 'id'},
  {label: 'ILLINOIS', abbr: 'il', key: 'il'},
  {label: 'INDIANA', abbr: 'in', key: 'in'},
  {label: 'IOWA', abbr: 'ia', key: 'ia'},
  {label: 'KANSAS', abbr: 'ks', key: 'ks'},
  {label: 'KENTUCKY', abbr: 'ky', key: 'ky'},
  {label: 'LOUISIANA', abbr: 'la', key: 'la'},
  {label: 'MAINE', abbr: 'me', key: 'me'},
  {label: 'MARYLAND', abbr: 'md', key: 'md'},
  {label: 'MASSACHUSETTS', abbr: 'ma', key: 'ma'},
  {label: 'MICHIGAN', abbr: 'mi', key: 'mi'},
  {label: 'MINNESOTA', abbr: 'mn', key: 'mn'},
  {label: 'MISSISSIPPI', abbr: 'ms', key: 'ms'},
  {label: 'MISSOURI', abbr: 'mo', key: 'mo'},
  {label: 'MONTANA', abbr: 'mt', key: 'mt'},
  {label: 'NEBRASKA', abbr: 'ne', key: 'ne'},
  {label: 'NEVADA', abbr: 'nv', key: 'nv'},
  {label: 'NEW HAMPSHIRE', abbr: 'nh', key:  'nh'},
  {label: 'NEW JERSEY', abbr: 'nj', key:  'nj'},
  {label: 'NEW MEXICO', abbr: 'nm', key:  'nm'},
  {label: 'NEW YORK', abbr: 'ny', key:  'ny'},
  {label: 'NORTH CAROLINA', abbr: 'nc', key:  'nc'},
  {label: 'NORTH DAKOTA', abbr: 'nd', key:  'nd'},
  {label: 'OHIO', abbr: 'oh', key: 'oh'},
  {label: 'OKLAHOMA', abbr: 'ok', key: 'ok'},
  {label: 'OREGON', abbr: 'or', key: 'or'},
  {label: 'PENNSYLVANIA', abbr: 'pa', key: 'pa'},
  {label: 'RHODE ISLAND', abbr: 'ri', key:  'ri'},
  {label: 'SOUTH CAROLINA', abbr: 'sc', key:  'sc'},
  {label: 'SOUTH DAKOTA', abbr: 'sd', key:  'sd'},
  {label: 'TENNESSEE', abbr: 'tn', key: 'tn'},
  {label: 'TEXAS', abbr: 'tx', key: 'tx'},
  {label: 'UTAH', abbr: 'ut', key: 'ut'},
  {label: 'VERMONT', abbr: 'vt', key: 'vt'},
  {label: 'VIRGINIA', abbr: 'va', key: 'va'},
  {label: 'WASHINGTON', abbr: 'wa', key: 'wa'},
  {label: 'WEST VIRGINIA', abbr: 'wv', key:  'wv'},
  {label: 'WISCONSIN', abbr: 'wi', key: 'wi'},
  {label: 'WYOMING', abbr: 'wy', key: 'wy'},
];

const feet = [
  {label: '1', key: 1},
  {label: '2', key: 2},
  {label: '3', key: 3},
  {label: '4', key: 4},
  {label: '5', key: 5},
  {label: '6', key: 6},
  {label: '7', key: 7},
  {label: '8', key: 8},
  {label: '9', key: 9},
  {label: '10', key: 10}
];
const inches = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11'];



//   <Picker
//    style={{flex: 1}}
//    mode="dropdown"
//    selectedValue={user.profile.state}
//    onValueChange={(state)=> this.updateProfile('state', state)}>
//    {states.map((item, index) => <Picker.Item label={item.name} value={item.abbr} key={index} />)}
// </Picker>


class Images extends React.Component {
  updateProfile(field, value){
    
    this.setState({[field]: value});

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

        <ModalPicker
          data={states}
          initValue={user.profile.state}
          onChange={(option)=>{ this.updateProfile('state', option.abbr) }} />
          
        </View>
        <View style={styles.item}>
          <Text style={{flex: 1}}>Height</Text>
          <View style={{flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end'}}>
            <Text>ft</Text>

            <ModalPicker
              data={feet}
              style={{marginLeft: 10, marginRight: 10}}
              initValue={(user.profile.height && user.profile.height.feet) || '0'}
              onChange={(feet)=>{ this.updateProfile('height.feet', feet.label) }} />
          <Text>in</Text>
            <ModalPicker
              data={feet}
              style={{marginLeft: 10, marginRight: 10}}
              initValue={(user.profile.height && user.profile.height.inches) || '0'}
              onChange={(inches)=>{ this.updateProfile('height.inches', inches.label) }} />
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
          style={{borderWidth: 1, borderColor: '#eee', borderRadius: 5}}
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