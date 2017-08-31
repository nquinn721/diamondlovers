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
  state = {}
  updateNumber(number){
    if(/\d{16}/.test(number)){
      this.setState({numberError: false});
      this.props.card.number = number;
    }else{
      this.setState({numberError: true});
    }
  }
  updateMonth(month){
    if(/\d{2}/.test(month)){
      this.setState({monthError: false});
      this.props.card.month = month;
    }else{
      this.setState({monthError: true});
    }
  }
  updateYear(year){
    if(/\d{2}/.test(year)){
      this.setState({yearError: false});
      this.props.card.year = year;
    }else{
      this.setState({yearError: true});
    }
  }
  
  updateCVC(cvc){
    if(/\d{3}/.test(cvc)){
      this.setState({cvcError: false});
      this.props.card.cvc = cvc;
    }else{
      this.setState({cvcError: true});
    }
  }

  async addCard(){
  	let token = await stripe.createToken({card: this.props.card.card});
  	this.props.addCard(token.id);
  	this.props.navigation.navigate('Cards')
  }
  render() {
  	const card = this.props.card;
    
    return (
      <View style={styles.container}>
        <FormLabel>Card Number</FormLabel>
				<FormInput onChangeText={this.updateNumber.bind(this)} placeholder={card.number}/>
				<FormValidationMessage>{this.state.numberError && "Must be 16 digits"}</FormValidationMessage>
				
				<FormLabel>Exp Month</FormLabel>
				<FormInput onChangeText={this.updateMonth.bind(this)} placeholder={card.exp_month}/>
				<FormValidationMessage>{this.state.monthError && "Must be 2 digit format (YY)"}</FormValidationMessage>

				<FormLabel>Exp Year</FormLabel>
				<FormInput onChangeText={this.updateYear.bind(this)} placeholder={card.exp_year}/>
				<FormValidationMessage>{this.state.yearError && "Must be 2 digit format (MM)"}</FormValidationMessage>

				<FormLabel>CVC</FormLabel>
				<FormInput onChangeText={this.updateCVC.bind(this)} placeholder={card.cvc}/>
				<FormValidationMessage>{this.state.cvcError && "Must be 3 digits"}</FormValidationMessage>

				
        	{
            card.addingCard ? 
              <ActivityIndicator size="large"/> : 
              <Button 
                raised
                icon={{name: 'credit-card', size: 15}}
                buttonStyle={{backgroundColor: '#2980b9', borderRadius: 5}}
                textStyle={{textAlign: 'center'}}
                title="Add Card"
                onPress={() => this.addCard()}
              />
        }
      </View>
    )
  }

}

const styles = StyleSheet.create({
  
})




export default connect(
  (state) => ({card: state.card}), 
  (dispatch) => (bindActionCreators({addCard}, dispatch))
)(HomeScreen);