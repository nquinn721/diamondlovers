import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import User from 'app/app/components/user';

export default class RegisterPage extends React.Component {
    state = {
        user: null
    }
    componentWillMount(){
        this.state.user = User.user;
    }
    printUserInfo(){
        if(this.state.user){
            return (
                <View>
                    <Text>User</Text>
                    <Text>{this.state.user.diamonds}</Text>
                </View>
            )
        }
        
    }
  render() {
    return (
      <View style={styles.container}>
        {this.printUserInfo()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: 20
  },
});
