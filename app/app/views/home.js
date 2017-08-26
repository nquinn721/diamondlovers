import React from 'react';
import { StyleSheet, Text, View, ScrollView, Button, Image } from 'react-native';
import Service from 'app/app/components/service';
import Settings from 'app/app/components/settings';
import SwipeCards from 'react-native-swipe-cards';

const face = require('../assets/img/avatar.png');


export default class HomePage extends React.Component{
    state = {
        users: []
    }
    constructor(props){
        super();

        if(props.nearby)
            this.state.users = props.nearby;        
    }

    updateUser(user){
    }
    loginUser(user){
    }

    nearby(users){
        this.setState({users})
    }
    displayNearby(user){
        return (
            <View>
                <Image source={user.getDefaultImage()} style={styles.image} />
                <Text>{user.displayName()}</Text>
            </View>
        )
    }

    handleYup (card) {
    }
    handleNope (card) {
    }
    handleMaybe (card) {
    }

    render(){
        if(!this.state.users.length)return <View><Text>No Users</Text></View>;
        // return (<Text>Home</Text>)
        return (
            <View style={styles.container}>
                <Text>Home</Text>
                <SwipeCards
                    cards={this.state.users}

                    renderCard={(user) => this.displayNearby(user)}
                    renderNoMoreCards={() => <View><Text>No more users</Text></View>}

                    handleYup={this.handleYup}
                    handleNope={this.handleNope}
                    handleMaybe={this.handleMaybe}
                    hasMaybeAction
                  />
            </View>
        );
    }

}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    padding: 20
  },
  image: {
      width: Settings.w - 20,
      height: Settings.h - (Settings.h / 3)
  }
});
