import React from 'react';
import { Text, View, StyleSheet, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Icon } from 'react-native-elements';
import gStyles, { defaults } from 'newApp/app/config/globalStyles';
import { register } from 'newApp/app/redux/actions/login';

class RegisterScreen extends React.Component {
  register(){
    let {email, displayName, password} = this.state;

    this.props.register(email, password, displayName);
  }
  render() {
    if(this.props.user.user)
      this.props.navigation.navigate('Nav')

    if(this.props.user.error){
      Alert.alert('Login Failed', 'Make sure you fill out all the information', [{text: 'OK'}, ], { cancelable: true } )
      this.props.user.error = false;
    }
    
    return (
      <View style={styles.container}>
      	<TextInput style={styles.input} underlineColorAndroid='rgba(0,0,0,0)' placeholder="Your Display Name"  onChangeText={(firstName) => this.setState({displayName})}/>
      	<TextInput style={styles.input} underlineColorAndroid='rgba(0,0,0,0)' placeholder="Your Email"  onChangeText={(email) => this.setState({email})}/>
      	<TextInput style={styles.input} underlineColorAndroid='rgba(0,0,0,0)' placeholder="Create Password"  onChangeText={(password) => this.setState({password})}/>
      	<View>
	      	<TouchableOpacity style={styles.signupButton} onPress={() => this.register()}>
          {
            this.props.user.registering ?
              <ActivityIndicator color="white" /> :
  	      		<Text style={{color: 'white'}}>Sign Up</Text>
          }
	      	</TouchableOpacity>
	      	<View style={{alignItems: 'center', justifyContent: 'center'}}>
	      		<Text style={styles.smallText}>By clicking "Sign Up" I agree with your</Text>
	      		<View style={{flexDirection: 'row'}}>
	      			<Text style={[styles.underlined, styles.smallText]}>Terms of Service</Text>
	      			<Text style={styles.smallText}> and </Text>
	      			<Text style={[styles.underlined, styles.smallText]}>Privacy Policy</Text>
	      		</View>
	      	</View>
	    </View>
      	<Text style={{textAlign: 'center'}}>or connect with</Text>

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
  	padding: 10,
  	justifyContent: 'space-between',
  	backgroundColor: 'white',
  	paddingBottom: 50,
  	paddingTop: 50
  },
  fbConnect: {
  	backgroundColor: '#4353a1',
  	justifyContent: 'space-between',
  	borderRadius: 40,
  	padding: 10,
  	flexDirection: 'row',
  	alignItems: 'center'
  },
  underlined: {
  	borderBottomWidth: 1,
  	borderBottomColor: '#333'
  },
  smallText: {
  	color: '#333',
  	fontSize: 10
  },
  input: {
  	borderBottomWidth: 1,
  	marginBottom: 10,
  	fontSize: 16,
  	borderBottomColor: '#999',
  	paddingBottom: 10
  },
  signupButton: {
  	backgroundColor: defaults.color,
  	borderRadius: 30,
  	padding: 15,
  	alignItems: 'center',
  	justifyContent: 'center'
  }
})




export default connect(
  (state) => ({user: state.user}), 
  (dispatch) => (bindActionCreators({register}, dispatch))
)(RegisterScreen);