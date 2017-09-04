import React from 'react';
import { Text, View, StyleSheet, Alert, ActivityIndicator } from 'react-native';
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
        <Icon name="credit-card" size={170} color="#999" type="font-awesome" />
        <View style={styles.cardInfo}>
	        <Icon style={styles.cardIcon} name={`cc-${brand}`} type='font-awesome' color='#0157a2'/>
	        <Text>   **** **** **** {card.last4}</Text>
	      </View>
	      <View style={styles.costInfo}>
	      	<View style={styles.purchasingTitle}>
		      	<Text>
		      		Purchasing {charge.diamonds}
		      	</Text>
	          <Icon name="diamond" size={13} color="blue" type="font-awesome" />
          </View>
          {charge.originalCost && <Text style={styles.lineItem}>{charge.originalCost}</Text>}
          {charge.save && <Text style={styles.lineItem}>- {charge.save}</Text>}

          <Text style={styles.total}>
          	Total {charge.price}
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

	showCharging(){
		return (
			<View style={styles.charging}>
				<View style={styles.chargingText}>
					<Text>Charging Card</Text>
					<ActivityIndicator />
				</View>
			</View>
		)
	}

  render() {
		if(!this.props.navigation.state.params || this.props.card.chargingCardSuccess){
			this.props.card.chargingCardSuccess = false;
  		this.props.navigation.goBack()
		}
    return (
      <View style={styles.container}>
      	{this.props.card.chargingCard &&  this.showCharging()}
      	{this.props.card.defaultCard ? this.renderCharge() : this.renderAddCard()}
      </View>
    )
  }

}

const styles = StyleSheet.create({
	container: {
		flex: 1
	},
  cardInfo: {
  	flexDirection: 'row',
  	justifyContent: 'center',
  	alignItems: 'center',
  },
  cardIcon: {
    width: 30
  },
  chargingText: {
  	padding: 20,
  	backgroundColor: 'white',
  	height: Config.h / 4.8,
  	alignItems: 'center',
  	width: Config.w - 60,
  	justifyContent: 'space-around'
  },
  charging: {
  	backgroundColor: 'rgba(0, 0, 0, 0.4)',
  	flex: 1,
  	alignItems: 'center',
  	justifyContent: 'center',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1
  },
  costInfo: {
  	backgroundColor: 'white',
  	marginTop: 10,
  	padding: 10
  },
  purchasingTitle: {
  	flexDirection: 'row',
  	justifyContent: 'space-around',
  	alignItems: 'center'
  },
  lineItem: {
  	paddingTop: 10,
  	paddingBottom: 10,
  	textAlign: 'right'
  },
  total: {
  	borderTopWidth: 1,
  	borderTopColor: '#aaa',
  	paddingTop:10,
  	textAlign: 'right',
  	marginBottom: 10,
  	marginTop:10
  }
})




export default connect(
  (state) => ({card: state.card}), 
  (dispatch) => (bindActionCreators({chargeCard}, dispatch))
)(Charge);