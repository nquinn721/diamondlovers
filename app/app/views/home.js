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
        if(props.users)
            this.state.users = props.users;        
    }

    updateUser(user){
        // console.log('home page', user);


    }
    loginUser(user){
    }

    nearby(users){
        this.setState({users})
    }
    displayNearby(user){
        
        let profileImg = face;

        if(user.profile.defaultImage && user.images.length)
            profileImg = {uri: user.images.filter(img => img._id === user.profile.defaultImage)[0].url};
        
        return (
            <View>
                <Image source={profileImg} style={styles.image} />
                <Text>{user.profile.displayName}</Text>
            </View>
        )
    }

    handleYup (card) {
        console.log(`Yup for ${card.text}`)
    }
    handleNope (card) {
        console.log(`Nope for ${card.text}`)
    }
    handleMaybe (card) {
        console.log(`Maybe for ${card.text}`)
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
