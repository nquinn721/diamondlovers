import React from 'react';
import { StyleSheet, Text, View, Image, Button, ScrollView, TouchableOpacity} from 'react-native';
import { Form,
  Separator,InputField, LinkField,
  SwitchField, PickerField,DatePickerField,TimePickerField
} from 'react-native-form-generator'; 
import Service from 'app/app/components/service';
import Settings from 'app/app/components/settings';
import User from 'app/app/components/user';

export default class ProfileImages extends React.Component{
    state = {
        cards: [],
        formDate: {
            cvc: "123",
            exp_month:"05",
            exp_year:"22",
            number:"4242424242424242"
        }
    }

    addCard(){
    }
   
    handleFormChange(formData){
        this.setState({formData});
    }
    handleFormFocus(){

    }

    render(){
        return (
            <View style={styles.container}>
                <Text>Cards</Text>
                <Button onPress={() => this.props.changeView('profile')} title="Back"/>
                <Button onPress={() => this.setState({addCard: true})} title="New Card" />
                
                {this.state.addCard ?
                    <Form
                        ref='addcardform'
                        onFocus={this.handleFormFocus.bind(this)}
                        onChange={this.handleFormChange.bind(this)}
                        label="Card info">
                        <InputField ref='number' placeholder='Card Number' value="4242424242424242"/>
                        <InputField ref='exp_month' placeholder='Month(MM)' value="05"/>
                        <InputField ref='exp_year' placeholder='Year(YY)' value="22"/>
                        <InputField ref='cvc' placeholder='CVC' value="123"/>
                        <Button onPress={() => this.addCard()} title="Add Card" />
                    </Form>
                : null}
            </View>
        );
    }
}
console.log(Settings.w, Settings.h / 2)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        marginTop:30
    }
});
