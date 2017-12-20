import React from 'react';
import { Text, View, StyleSheet, KeyboardAvoidingView, Image, TouchableOpacity, TextInput, ActivityIndicator, Alert } from 'react-native';
import { bindActionCreators } from 'redux';
import { Icon } from 'react-native-elements';
import { connect } from 'react-redux';
import gStyles, { defaults } from 'newApp/app/config/globalStyles';
import { login } from 'newApp/app/redux/actions/login';

class LoginScreen extends React.Component {
  //TODO:: remove hard coded login
  state = {
    // username: 'willy@willy.com',
    // password: 'willy123',
    username: 'natethepcspecialist@gmail.com',
    password: 'nate123',
    // username: 'bob@bob.com',
    // password: 'bob123'
  }

  login(){
    let {username, password} = this.state;

    this.props.login(username, password);

  }
  render() {

    if(this.props.user.user)
      this.props.navigation.navigate('Nav')

    if(this.props.user.error){
      Alert.alert('Login Failed', 'Make sure the username and password are correct', [{text: 'OK'}, ], { cancelable: true } )
      this.props.user.error = false;
    }
     

    return (
      <View style={styles.container}>
      	<View style={{alignItems: 'center', justifyContent: 'center'}}>
      		<Image source={require('newApp/app/assets/img/Logo.png')} style={{width: 120, height: 100}}/>
      	</View>
      	<KeyboardAvoidingView keyboardVerticalOffset={40} style={styles.signIn}>
  			<TextInput style={styles.input} placeholder="Username" underlineColorAndroid='rgba(0,0,0,0)' onChangeText={(username) => this.setState({username})} value={this.state.username}/>
  			<TextInput style={styles.input} secureTextEntry={true} placeholder="Password" underlineColorAndroid='rgba(0,0,0,0)' onChangeText={(password) => this.setState({password})} value={this.state.password}/>
      	</KeyboardAvoidingView>
      	<TouchableOpacity style={styles.loginButton} onPress={() => this.login()}>
        {
          this.props.user.isFetching ? 
          <ActivityIndicator color="white"/> :
      		<Text style={{color: 'white'}}>Sign In</Text>
        }
      	</TouchableOpacity>
      	<TouchableOpacity>
      		<Text style={{textAlign: 'right'}}>Forgot Password?</Text>
      	</TouchableOpacity>
  		<Text style={{textAlign: 'center', color: 'white', padding: 10}}>or connect with</Text>
      	<View style={styles.fbConnect}>
	      	<View style={{backgroundColor: 'white', borderRadius: 100, padding: 5, width: 30, height: 30}}>
     		 	<Icon name="facebook" size={18} color='#4353a1' type='font-awesome'/>
     		</View>
 		 	<Text style={{fontSize: 16, color: 'white'}}>Login with Facebook</Text>
 		 	<View></View>
      	</View>
      </View>
    )
  }

}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: 'white',
		justifyContent: 'space-between',
		padding: 10,
		paddingBottom: 50,
		paddingTop: 20
	},
  input: {
  	borderBottomWidth: 1,
  	borderBottomColor: '#999',
  	marginBottom: 20,
  	paddingBottom: 10,
  	fontSize: 20
  },
  loginButton: {
  	backgroundColor: defaults.color,
  	borderRadius: 30,
  	padding: 15,
  	alignItems: 'center',
  	justifyContent: 'center'
  },
  fbConnect: {
  	backgroundColor: '#4353a1',
  	justifyContent: 'space-between',
  	borderRadius: 40,
  	padding: 10,
  	flexDirection: 'row',
  	alignItems: 'center'
  }
})




export default connect(
  (state) => ({user: state.user}), 
  (dispatch) => (bindActionCreators({login}, dispatch))
)(LoginScreen);