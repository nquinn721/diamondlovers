import React from 'react';
import { StyleSheet, Text, View, ScrollView, Button, TouchableOpacity } from 'react-native';
import Service from '../components/service';
import User from '../components/user';

export default class PurchasePage extends React.Component{
    purchaseDiamonds(amount){
        Service.chargeCard(amount * 100, () => {

        })
    }
    render(){
        return(
            <View style={styles.container}>
                <Text>Purchase</Text>
                <TouchableOpacity style={styles.purchaseButton} onPress={() => this.purchaseDiamonds(10)}>
                    <Text style={styles.diamonds}>100 diamonds</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.purchaseButton} onPress={() => this.purchaseDiamonds(100)}>
                    <Text style={styles.diamonds}>1,000 diamonds</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.purchaseButton} onPress={() => this.purchaseDiamonds(1000)}>
                    <Text style={styles.diamonds}>10,000 diamonds</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.purchaseButton} onPress={() => this.purchaseDiamonds(10000)}>
                    <Text style={styles.diamonds}>100,000 diamonds</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  purchaseButton: {
      backgroundColor: '#0e99e5',
      flex:1,
      height: 20,
      margin: 10,
      justifyContent: 'center',
      alignItems: 'center'
  },
    diamonds: {
        color: 'white'
    }
});
