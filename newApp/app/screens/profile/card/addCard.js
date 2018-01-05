import React from 'react';
import { Text, View, StyleSheet, ActivityIndicator, Image, Alert } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { FormLabel, FormInput, FormValidationMessage, Button } from 'react-native-elements';
import Config from 'newApp/app/config/config';
import gStyles, { defaults } from 'newApp/app/config/globalStyles';
import { addCard } from 'newApp/app/redux/actions/card';
const stripe = require('stripe-client')(Config.stripeApiKey);
const img = require('newApp/app/assets/img/Icon-My-Profile.png');

class AddCard extends React.Component {
  state = {};

  update(total, type, number) {
    let regStr = '\\d{' + total + '}',
        reg = new RegExp(regStr);

    if(reg.test(number)){
      this.setState({[type + 'Error']: false});
      this.props.card.card[type] = number;
    }else{
      this.setState({[type + 'Error']: true});
    }
  }

  async addCard(){
  	let token = await stripe.createToken({card: this.props.card.card});
    
    if(token.error){
      Alert.alert(
        'Failed to add card',
        token.error.message,
        [
          {text: 'OK'},
        ],
        { cancelable: true }
      )
    }else{
    	this.props.addCard(token.id);
    	this.props.navigation.goBack()
    }
  }
  render() {
  	const card = this.props.card;
     
    return (
      <View style={styles.container}>
        <View style={{flex: 2}}>
          <FormLabel>Card Number</FormLabel>
  				<FormInput onChangeText={this.update.bind(this, 16, 'number')} placeholder={card.number}/>
  				<FormValidationMessage>{this.state.numberError && "Must be 16 digits"}</FormValidationMessage>
  				
  				<FormLabel>Exp Month</FormLabel>
  				<FormInput onChangeText={this.update.bind(this, 2, 'exp_month')} placeholder={card.exp_month}/>
  				<FormValidationMessage>{this.state.exp_monthError && "Must be 2 digit format (YY)"}</FormValidationMessage>

  				<FormLabel>Exp Year</FormLabel>
  				<FormInput onChangeText={this.update.bind(this, 2, 'exp_year')} placeholder={card.exp_year}/>
  				<FormValidationMessage>{this.state.exp_yearError && "Must be 2 digit format (MM)"}</FormValidationMessage>

  				<FormLabel>CVC</FormLabel>
  				<FormInput onChangeText={this.update.bind(this, 3, 'cvc')} placeholder={card.cvc}/>
  				<FormValidationMessage>{this.state.cvcError && "Must be 3 digits"}</FormValidationMessage>
        </View>
			  <View style={defaults.buttonBottom}>
        	{
            card.addingCard ? 
              <ActivityIndicator size="large"/> : 
              <Button 
                raised
                icon={{name: 'credit-card', size: 15}}
                buttonStyle={defaults.defaultButton}
                textStyle={{textAlign: 'center'}}
                title="Add Card"
                onPress={() => this.addCard()}
              />
          }
        </View>
      </View>
    )
  }

}

const styles = StyleSheet.create({
   container: {
     flex: 1,
     backgroundColor: 'white'
   }
})




export default connect(
  (state) => ({card: state.card}), 
  (dispatch) => (bindActionCreators({addCard}, dispatch))
)(AddCard);