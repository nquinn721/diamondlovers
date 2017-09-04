import React from 'react';
import { Text, View, StyleSheet, Alert } from 'react-native';
import { Icon, Button } from 'react-native-elements';
import { bindActionCreators } from 'redux';
import Config from 'newApp/app/config/config';
import { connect } from 'react-redux';
import { chargeCard } from 'newApp/app/redux/actions/card';

class Charge extends React.Component {
	state = {};
	
	renderCharge(){
		let card = this.props.card.defaultCard;
    let brand = card.brand.toLowerCase();
    let charge = this.props.navigation.state.params;

    
		return (
			<View style={styles.container}>
				<Text>Charge</Text>
        <Icon name="credit-card" size={200} color="#999" type="font-awesome" />
        <View style={styles.cardInfo}>
	        <Icon style={styles.cardIcon} name={`cc-${brand}`} type='font-awesome' color='#0157a2'/>
	        <Text>   **** **** **** {card.last4}</Text>
	      </View>
	      <View style={styles.costInfo}>
	      	<Text>
	      		Purchasing {charge.diamonds}
	      	</Text>
          <Icon name="diamond" size={13} color="blue" type="font-awesome" />
          {charge.originalCost && <Text>{charge.original}</Text>}
          {charge.save && <Text>Saving {charge.save}</Text>}
          <Text>
          	Cost {charge.price}
          </Text>
          <Button 
		        raised
		        // icon={{name: 'dollar', size: 15}}
		        buttonStyle={{backgroundColor: '#2980b9', borderRadius: 5}}
		        textStyle={{textAlign: 'center'}}
		        title="$ Purchase"
		        onPress={() => this.props.chargeCard(card.id, charge.cost)}
		      	/>
	      </View>
			</View>
		)
	}

	renderAddCard(){
		return (
			<View>
    		<Text>No card on file please add one </Text>
    		<Button 
        raised
        // icon={{name: 'plus', size: 15}}
        buttonStyle={{backgroundColor: '#2980b9', borderRadius: 5}}
        textStyle={{textAlign: 'center'}}
        title="+ Add Card"
        onPress={() => this.props.navigation.navigate('AddCard')}
      	/>
   	 </View>
		)
	}

  render() {
		if(!this.props.navigation.state.params)
			this.props.navigation.navigate('Purchase');
  	
    return (
      <View style={styles.container}>

      	{this.props.card.defaultCard ? this.renderCharge() : this.renderAddCard()}
      </View>
    )
  }

}

const styles = StyleSheet.create({
  cardInfo: {
  	flexDirection: 'row',
  	justifyContent: 'center',
  	alignItems: 'center',
  },
  cardIcon: {
    width: 30
  },
  costInfo: {
  	backgroundColor: '#eee',
  	justifyContent: 'center',
  	alignItems: 'center'
  }
})




export default connect(
  (state) => ({card: state.card}), 
  (dispatch) => (bindActionCreators({chargeCard}, dispatch))
)(Charge);