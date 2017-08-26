import React from 'react';
import {Text, View, } from 'react-native';
import { Button } from 'react-native-elements';

export default class ProfileScreen extends React.Component {
  // static navigationOptions = {
  //   title: 'Profile'
  // };

  render() {
    return (
      <View style={{alignItems: 'center', justifyContent: 'center', flex: 1}}>
        <Button
          raised
          icon={{name: 'home', size: 32}}
          buttonStyle={{backgroundColor: 'red', borderRadius: 10}}
          textStyle={{textAlign: 'center'}}
          title={`Welcome to\nReact Native Elements`}
        />
      </View>
    )
  }

  _handlePress = () => {
    this.props.navigation.navigate('Home');
  }
}

// export default StackNavigator({
//   Profile: {
//     screen: ProfileScreen,
//   },
// });