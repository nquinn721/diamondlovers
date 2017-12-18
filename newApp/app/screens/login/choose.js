import React from 'react';
import { Text, View, StyleSheet, Image, TouchableOpacity, ScrollView, TextInput, KeyboardAvoidingView, Alert } from 'react-native';
import { bindActionCreators } from 'redux';
import { Facebook } from 'expo';
import { connect } from 'react-redux';
import { Icon } from 'react-native-elements';
import gStyles, { defaults } from 'newApp/app/config/globalStyles';

class Choose extends React.Component {
	
	 _handleFacebookLogin = async () => {
	 	
	 	
    try {
      const { type, token } = await Facebook.logInWithReadPermissionsAsync(
        '375101439599841', // Replace with your own app id in standalone app
        { permissions: ['public_profile'] }
      );
      console.log(type, token);
      
      switch (type) {
        case 'success': {
          // Get the user's name using Facebook's Graph API
          const response = await fetch(`https://graph.facebook.com/me?access_token=${token}`);
          const profile = await response.json();
          Alert.alert(
            'Logged in!',
            `Hi ${profile.name}!`,
          );
          break;
        }
        case 'cancel': {
          Alert.alert(
            'Cancelled!',
            'Login was cancelled!',
          );
          break;
        }
        default: {
          Alert.alert(
            'Oops!',
            'Login failed!',
          );
        }
      }
    } catch (e) {
      Alert.alert(
        'Oops!',
        'Login failed!',
      );
    }
  };
  render() {
    return (
      <View style={styles.container}>
      	<Image source={require('newApp/app/assets/img/Dark-bg.png')} style={[StyleSheet.absoluteFill, {height: defaults.height, width: defaults.width}]} />
      	<View style={styles.logo}>
      		<Image source={require('newApp/app/assets/img/Logo-Dark.png')} style={{width: 120, height: 100}}/>
	      	<Image source={require('newApp/app/assets/img/Text-Logo-White.png')} style={{height: 40, width: 220}} />
      	</View>
      	<View style={styles.login}>
      		
      		<TouchableOpacity style={styles.loginWithFB} onPress={this._handleFacebookLogin}>
      			<View style={{backgroundColor: 'blue', borderRadius: 100, padding: 5, width: 30, height: 30}}>
	     		 	<Icon name="facebook" size={18} color='white' type='font-awesome'/>
	     		</View>
     		 	<Text style={{fontSize: 16}}>Login with Facebook</Text>
     		 	<View></View>
      		</TouchableOpacity>
      		<View style={styles.signInButtons}>
      			<TouchableOpacity style={styles.signInButton} onPress={() => {console.log('loggin in');this.props.navigation.navigate('SignUp')}}>
      				<Text style={{color: 'white'}}>Sign Up</Text>
      			</TouchableOpacity>
      			<TouchableOpacity style={styles.signInButton} onPress={() => this.props.navigation.navigate('SignIn')}>
      				<Text style={{color: 'white'}}>Sign In</Text>
      			</TouchableOpacity>
      		</View>

	      	<View style={styles.bottomText}>
	      		<Text style={styles.white}>We don't post anything on facebook</Text>
	      		<View>
	      			<Text style={[styles.white, {marginTop: 10}]}>By signing in, you agree with our</Text>
	      			<View style={[gStyles.row]}>
	      				<Text style={[styles.underLined, styles.white]}>Terms of Service</Text>
	      				<Text style={styles.white}> and </Text>
	      				<Text style={[styles.underLined, styles.white]}>Privacy Policy</Text>
	      			</View>
	      		</View>
	      	</View>
      	</View>
      </View>
    )
  }

}

const styles = StyleSheet.create({
  container: {
  	flex: 1,
  	backgroundColor: defaults.color,
  	padding: 20
  },
  loginButton: {
  	backgroundColor: '#333',
  	borderRadius: 30,
  	padding: 15,
  	alignItems: 'center',
  	justifyContent: 'center'
  },
  logo: {
  	alignItems: 'center',
  	padding: 50,
  	flex: 1
  },
  
  loginWithFB: {
  	backgroundColor: 'white',
  	justifyContent: 'space-between',
  	borderRadius: 40,
  	padding: 10,
  	flexDirection: 'row',
  	alignItems: 'center'
  },
  login: {
  	justifyContent: 'space-between',
  	flex: 1
  },
  signIn: {
  },
  signInButtons: {
  	flexDirection: 'row',
  	justifyContent: 'space-between'
  },
  signInButton: {
  	borderRadius: 40,
  	padding: 15,
  	justifyContent: 'center',
  	alignItems: 'center',
  	borderWidth: 1,
  	width: defaults.width / 2.5,
  	borderColor: 'white'
  },
  bottomText: {
  	alignItems: 'center'
  },
  underLined: {
  	borderBottomWidth: 1,
  	borderBottomColor: 'white'
  },
  white: {
  	color: 'white',
  	fontSize: 10
  }
})




export default connect(
  // (state) => ({users: state.users}), 
  // (dispatch) => (bindActionCreators({userServiceCall, selectUser}, dispatch))
)(Choose);