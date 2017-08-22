import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import Settings from 'app/app/components/settings';
import User from 'app/app/components/user';

export default class Nav extends React.Component{
    state = {
        view: Settings.defaultView
    };
    constructor(){
        super();
        User.on('login', () => {
            this.setState({user: User.getUser()})
        })
    }
    updateUser(){
        // console.log('update user in nav');
    }
    changeView(view){
        this.props.changeView(view);
        this.state.view = view;
    } 
    selected(view){
        if(this.state.view === view) 
            return styles.selected;  
    }
    render(){
        return( 
            <View style={styles.nav}>
                <TouchableOpacity style={[styles.button, this.selected('home')]} onPress={() => this.changeView('home')}>
                    <Text>Home</Text>
                </TouchableOpacity>
                {User.getUser() ? <TouchableOpacity style={[styles.button,this.selected('purchase')]} onPress={() => this.changeView('purchase')}>
                    <Text>Diamonds</Text>
                </TouchableOpacity> : null}
                {User.getUser() ? <TouchableOpacity style={[styles.button,this.selected('userProfile')]} onPress={() => this.changeView('userProfile')}>
                    <Text>Profile</Text> 
                </TouchableOpacity> : null}
                <TouchableOpacity style={[styles.button,this.selected('login')]} onPress={() => this.changeView('login')}>
                    <Text>Login</Text>
                </TouchableOpacity>
            </View>
        );
    }
}


const styles = StyleSheet.create({
  nav: {
    flex: 1,
    justifyContent: 'space-around',
    flexDirection: 'row',
    backgroundColor: '#eee',
    width: Settings.w
  }, 
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1
  },
  selected: {
      borderTopWidth: 3,
      borderTopColor: 'red'
  }
});
