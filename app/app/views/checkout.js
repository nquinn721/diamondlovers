import React from 'react';
import { StyleSheet, Text, View, ScrollView, Button, TextInput } from 'react-native';
import Settings from 'app/app/components/settings';
var stripe = require('stripe-client')(Settings.stripeApiKey);

var information = {
  card: {
    number: '4242424242424242',
    exp_month: '02',
    exp_year: '21',
    cvc: '999',
    name: 'Billy Joe'
  }
}

  

export default class CheckoutPage extends React.Component{
    state = {}
    async charge(){
        console.log(information);
        // var card = await stripe.createToken(information);
        // var token = card.id;
        // send token to backend for processing
        
    }
    render(){
        return (
            <View style={styles.container}>
                
                <Button
                    onPress={() => this.charge()}
                    title="Add Card"
                />
            </View>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop:30
    }
});