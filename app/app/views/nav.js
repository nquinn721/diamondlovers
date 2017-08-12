import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import Settings from '../components/settings';

export default class Nav extends React.Component{
    state = {
        view: Settings.defaultView
    };
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
                <TouchableOpacity style={[styles.button,this.selected('purchase')]} onPress={() => this.changeView('purchase')}>
                    <Text>Diamonds</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.button,this.selected('profile')]} onPress={() => this.changeView('profile')}>
                    <Text>Profile</Text>
                </TouchableOpacity>
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
