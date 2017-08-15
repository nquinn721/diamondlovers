import React from 'react';
import { StyleSheet, Text, View, Image, Button, ScrollView, TouchableOpacity} from 'react-native';
import Service from 'app/app/components/service';
import Settings from 'app/app/components/settings';
import User from 'app/app/components/user';

export default class ProfileImages extends React.Component{
    state = {
        cards: []
    }
   

    render(){
        return (
            <View style={styles.container}>
                <Text>Cards</Text>
                <Button onPress={() => this.props.changeView('profile')} title="Back"/>
                
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
