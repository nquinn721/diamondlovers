import React from 'react';
import { StyleSheet, Text, View, ScrollView, Button } from 'react-native';
import { Form,
  Separator,InputField, LinkField,
  SwitchField, PickerField,DatePickerField,TimePickerField
} from 'react-native-form-generator';  
import Service from 'app/app/components/service';

export default class LoginPage extends React.Component {
  state = {
    formData: {
      email: 'natethepcspecialist@gmail.com',
      password: 'nate123'
    }
  }
  login(){
      console.log('login');
      Service.login(this.state.formData); 
    }
   handleFormChange(formData){
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
      <View style={styles.container}>
      <ScrollView keyboardShouldPersistTaps="always" >
      <Form
        ref='loginform'
        onFocus={this.handleFormFocus.bind(this)}
        onChange={this.handleFormChange.bind(this)}
        label="Personal Information">
        <InputField
          ref='email'
         
          placeholder='Email'
          helpText={((self)=>{

            if(Object.keys(self.refs).length !== 0){
              if(!self.refs.loginform.refs.email.valid){
                return self.refs.loginform.refs.email.validationErrors.join("\n");
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
        <Separator />
          
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
    marginTop:30,
    padding:10
  },
});
