import React from 'react';
import { StyleSheet, Text, View, ScrollView, Button } from 'react-native';
import Service from 'app/app/components/service';

export default class HomePage extends React.Component{
    state = {}

    updateUser(user){
        // console.log('home page', user);

    }
    loginUser(user){
        console.log('login from home');
        // this.state.user = user;
        Service.getNearby((users) => {
            this.setState({users});
        });
    }

    render(){
        return (
            <View style={styles.container}>
                <Text>Home</Text>
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
  },
});
