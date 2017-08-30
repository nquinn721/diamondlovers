import React from 'react';
import { Text, View, StyleSheet, ActivityIndicator } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { FormLabel, FormInput, FormValidationMessage, Button } from 'react-native-elements';
import Config from 'newApp/app/config/config';
import gStyles from 'newApp/app/config/globalStyles';
import { addCard } from 'newApp/app/redux/actions/card';
const stripe = require('stripe-client')(Config.stripeApiKey);

class HomeScreen extends React.Component {
  updateNumber(){
  	console.log('update number');
  }
  async addCard(){
  	let token = await stripe.createToken({card: this.props.card});
  	this.props.addCard(token.id);
  	this.props.navigation.navigate('Cards')
  }
  render() {
  	const user = this.props.user,
  				card = this.props.card;
  				console.log('render', user);
  				
    return (
      <View style={styles.container}>
        <FormLabel>Card Number</FormLabel>
				<FormInput onChangeText={this.updateNumber} placeholder={card.number}/>
				<FormValidationMessage>{!card.number && "Please fill in number"}</FormValidationMessage>
				
				<FormLabel>Exp Month</FormLabel>
				<FormInput onChangeText={this.updateNumber} placeholder={card.exp_month}/>
				<FormValidationMessage>{!card.number && "Please fill in number"}</FormValidationMessage>

				<FormLabel>Exp Year</FormLabel>
				<FormInput onChangeText={this.updateNumber} placeholder={card.exp_year}/>
				<FormValidationMessage>{!card.number && "Please fill in number"}</FormValidationMessage>

				<FormLabel>CVC</FormLabel>
				<FormInput onChangeText={this.updateNumber} placeholder={card.cvc}/>
				<FormValidationMessage>{!card.number && "Please fill in number"}</FormValidationMessage>

				<Button 
        	raised
    			icon={{name: 'credit-card', size: 15}}
    			buttonStyle={{backgroundColor: '#2980b9', borderRadius: 5}}
    			textStyle={{textAlign: 'center'}}
        	title="Add Card"
        	onPress={() => this.addCard()}
        	/>
        	{user.addingCard && <ActivityIndicator size="large"/>}
      </View>
    )
  }

}

const styles = StyleSheet.create({
  
})




export default connect(
  (state) => ({card: state.card, user: state.user}), 
  (dispatch) => (bindActionCreators({addCard}, dispatch))
)(HomeScreen);