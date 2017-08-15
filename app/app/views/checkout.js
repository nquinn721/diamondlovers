import React from 'react';
import { StyleSheet, Text, View, ScrollView, Button, TextInput } from 'react-native';

  

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