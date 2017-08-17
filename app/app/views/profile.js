import React from 'react';
import { StyleSheet, Text, View, ScrollView, Button } from 'react-native';

export default class ProfilePage extends React.Component{

    render(){
        return (
            <View style={styles.container}>
                <Text>Profile page</Text>
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
