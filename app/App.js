import React from 'react';
import { StyleSheet, Text, View, Button, Input, ScrollView } from 'react-native';
import ProfilePage from './app/views/profile';
import LoginPage from './app/views/login';
import RegisterPage from './app/views/register';

import { Form,
  Separator,InputField, LinkField,
  SwitchField, PickerField,DatePickerField,TimePickerField
} from 'react-native-form-generator';

export default class App extends React.Component {
  state = {
    formData: {
      email: 'natethepcspecialist@gmail.com',
      password: 'nate123'
    }
  }
  constructor(){
    super();
     
  }
    login(){
      console.log('login');
      fetch('http://diamondlovers.herokuapp.com/db/login', {
        method: 'post',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(this.state.formData),
        credentials: 'same-origin'
      }).then(d => d.json()).then(d => console.log(d));
    }

     handleFormChange(formData){
    /*
    formData will contain all the values of the form,
    in this example.

    formData = {
    email:"",
    last_name:"",
    gender: '',
    birthday: Date,
    has_accepted_conditions: bool
    }
    */
    console.log(formData);
    this.setState({formData});
    this.props.onFormChange && this.props.onFormChange(formData);
  }

  handleFormFocus(e, component){
    //console.log(e, component);
  }
  openTermsAndConditionsURL(){

  }
  render() {
    return (
        <ScrollView keyboardShouldPersistTaps="always" style={{paddingLeft:10,paddingRight:10, height:200}}>
      <Form
        ref='registrationForm'
        onFocus={this.handleFormFocus.bind(this)}
        onChange={this.handleFormChange.bind(this)}
        label="Personal Information">
        <Separator />
        <InputField
          ref='email'
          label='Email'
          placeholder='Email'
          helpText={((self)=>{

            if(Object.keys(self.refs).length !== 0){
              if(!self.refs.registrationForm.refs.email.valid){
                return self.refs.registrationForm.refs.email.validationErrors.join("\n");
              }

            }
            // if(!!(self.refs && self.refs.email.valid)){
            // }
          })(this)}
          validationFunction={[(value)=>{
            /*
            you can have multiple validators in a single function or an array of functions
             */

            if(value == '') return "Required";
            //Initial state is null/undefined
            if(!value) return true;
            // Check if First Name Contains Numbers
            var matches = value.match(/\d+/g);
            if (matches != null) {
                return "First Name can't contain numbers";
            }

            return true;
          }, (value)=>{
            ///Initial state is null/undefined
            if(!value) return true;
            if(value.indexOf('4')!=-1){
              return "I can't stand number 4";
            }
            return true;
          }]}
          />
        <InputField ref='password' placeholder='Password'/>
        {/* <InputField
          multiline={true}
          ref='other_input'
          placeholder='Other Input'
          helpText='this is an helpful text it can be also very very long and it will wrap' />
        <Separator />
        <LinkField label="test test test" onPress={()=>{}}/>
        <SwitchField label='I accept Terms & Conditions'
          ref="has_accepted_conditions"
          helpText='Please read carefully the terms & conditions'/>
        <PickerField ref='gender'
          label='Gender'
          options={{
            "": '',
            male: 'Male',
            female: 'Female'
          }}/>
          <DatePickerField ref='birthday'
          minimumDate={new Date('1/1/1900')}
          maximumDate={new Date()}
          placeholder='Birthday'/>
        <TimePickerField ref='alarm_time'
      placeholder='Set Alarm'/>
        <DatePickerField ref='meeting'
          minimumDate={new Date('1/1/1900')}
          maximumDate={new Date()} mode="datetime" placeholder='Meeting'/> */}
          <Button onPress={() => this.login()} title="Login"></Button>
        </Form>
        <Text>{JSON.stringify(this.state.formData)}</Text>

      </ScrollView>
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
