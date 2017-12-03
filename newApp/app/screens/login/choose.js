import React from 'react';
import { Text, View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Icon } from 'react-native-elements';
import gStyles, { defaults } from 'newApp/app/config/globalStyles';

class Choose extends React.Component {
  render() {
    return (
      <View style={styles.container}>
      	<View style={styles.logo}>
      		<Image source={require('newApp/app/assets/img/Splash-Logo.png')} style={{width: 155, height: 140}}/>
      	</View>
      	<View style={styles.login}>
      		<TouchableOpacity style={styles.loginWithFB}>
      			<View style={{backgroundColor: 'blue', borderRadius: 100, padding: 5, width: 30, height: 30}}>
	     		 	<Icon name="facebook" size={18} color='white' type='font-awesome'/>
	     		</View>
     		 	<Text style={{fontSize: 16}}>Login with Facebook</Text>
     		 	<View></View>
      		</TouchableOpacity>
      		<View style={styles.signIn}>
	      		<TouchableOpacity style={styles.signInButton}>
	      			<Text style={{color: 'white'}}>Sign Up</Text>
	      		</TouchableOpacity>
	      		<TouchableOpacity style={styles.signInButton}>
	      			<Text style={{color: 'white'}}>Sign In</Text>
	      		</TouchableOpacity>
	      	</View>

	      	<View style={styles.bottomText}>
	      		<Text style={styles.white}>We don't post anything on facebook</Text>
	      		<View>
	      			<Text style={styles.white}>By signing in, you agree with our</Text>
	      			<View style={[gStyles.row]}>
	      				<Text style={[styles.underLined, styles.white]}>Terms of Service</Text>
	      				<Text style={styles.white}>and</Text>
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
  logo: {
  	flex: 1,
  	alignItems: 'center',
  	padding: 50,
  	backgroundColor: '#222'
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
  	flex: 1,
  	justifyContent: 'space-between',
  },
  signIn: {
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