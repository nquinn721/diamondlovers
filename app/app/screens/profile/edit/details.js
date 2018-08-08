import React from 'react';
import { View, StyleSheet, ScrollView, Image, Text, Picker} from 'react-native';
import { ButtonGroup, Button, Input } from 'react-native-elements'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { defaults } from 'app/app/config/globalStyles';
import { updateProfile } from 'app/app/redux/actions/user';
import { feet, inches, age, states } from './detailsInfo';
const img = require('app/app/assets/img/Icon-My-Profile.png');
const diamond = require('app/app/assets/img/Icon-Purchase-Select.png');
/**
 * Looking for (m/f)
 * Date Cost (diamonds)
 * City
 * State
 * Occupation
 * About you
 */

class Details extends React.Component {
  state = {};

  updateProfile(field, value){
    if(!this.state.showingSaveButton)this.state.showingSaveButton = true;
    this.state[field] = value;
    this.setState(this.state);
  }
  saveProfile(){
    this.props.updateProfile(this.state); 
  }
  updateIndex(a,b, c){
    console.log(a, b, c);
  }

  renderDetails(){
    return (
      <View style={{padding: 20}}>
        <Text>Looking For</Text>
        <ButtonGroup
          onPress={(index) => this.updateProfile('lookingFor', index ? 'female' : 'male')}
          buttons={['M', 'F']}
          selectedIndex={this.state.lookingFor === 'male' ? 0 : 1}
          selectedButtonStyle={{backgroundColor: defaults.color}}
          selectedTextStyle={{color: 'white'}}
          containerStyle={{height: 20}}
        />
        <Text>Date Cost</Text>
       <Input
          placeholder='Diamonds...'
          rightIcon={
            <Image source={diamond} style={{width: 20, height: 20}}/>
            
          }
        />
        <Text>State</Text>
        <Picker
          selectedValue={this.state.state}
          style={{ height: 50, width: 100 }}
          onValueChange={(itemValue, itemIndex) => this.setState({language: itemValue})}>
          {states.map(v => <Picker.Item key={v.abbr} label={v.label} value={v} />)}
        </Picker>


      </View>
    )
  }
  renderAbout(){
    
    // return (
    //   <View style={styles.about}>
    //     <Text>About You</Text>
    //     <TextInput
    //       multiline={true}
    //       numberOfLines={8}
    //       onChangeText={(text) => this.updateProfile('about', text)}
    //       value={user.profile.about}/> 
        
    //   </View>
    // )
  }
  render() {
    let { profile } = this.props.navigation.state.params.user;

    this.state = profile;
    console.log('STATE');
    console.log('STATE');
    console.log('STATE');
    console.log('STATE');
    console.log('STATE');
    console.log('STATE');
    console.log('STATE');
    console.log('STATE');
    console.log(this.state);
    return (
      <View style={styles.container}>
        <ScrollView style={{paddingBottom: 50}}>
          {this.renderDetails()}
          {/* {this.renderAbout()} */}
        </ScrollView>
        {
          this.state.showingSaveButton && 
          <View style={styles.save}>
            <Button title="Save Profile" 
                onPress={() => this.saveProfile()} 
                buttonStyle={defaults.defaultButton}
                titleStyle={{color:'white'}}
            />
          </View>
        }
      </View>
    )
  }

}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 10,
  },


  
})




export default connect(
  // (state) => ({user: state.user}), 
  () => ({}),
  (dispatch) => (bindActionCreators({updateProfile}, dispatch))
)(Details);