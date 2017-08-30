import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { FormLabel, FormInput, FormValidationMessage, Button } from 'react-native-elements';
import Config from '../../config/config';
import gStyles from '../../config/globalStyles';
const stripe = require('stripe-client')(Config.stripeApiKey);

class HomeScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
				<Button 
        	raised
    			icon={{name: 'credit-card', size: 15}}
    			buttonStyle={{backgroundColor: '#2980b9', borderRadius: 5}}
    			textStyle={{textAlign: 'center'}}
        	title="Add Card"
        	onPress={() => this.addCard()}
        	/>

      </View>
    )
  }

}

const styles = StyleSheet.create({
  
})




export default connect(
  (state) => ({user: state.user}), 
  // (dispatch) => (bindActionCreators({userServiceCall, selectUser}, dispatch))
)(HomeScreen);