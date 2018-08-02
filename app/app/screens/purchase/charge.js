import React from 'react';
import { Text, View, StyleSheet, Alert, ActivityIndicator, Image, TouchableOpacity } from 'react-native';
import { Icon, Button } from 'react-native-elements';
import { bindActionCreators } from 'redux';
import Config from 'app/app/config/config';
import { connect } from 'react-redux';
import { chargeCard } from 'app/app/redux/actions/card';
import gStyles from 'app/app/config/globalStyles';
import { defaults } from 'app/app/config/globalStyles';
const img = require('app/app/assets/img/Icon-Purchase.png');

class Charge extends React.Component {
	state = {};

  static navigationOptions = {
    tabBarIcon: ({ tintColor }) => (
      <Image
        source={img}
        style={[{width: defaults.iconWidth, height: defaults.iconHeight}, {tintColor: tintColor}]}
      />
    ),
  };
	
	renderCharge(){
		let card = this.props.card.defaultCard;
    let brand = card.brand.toLowerCase();
    let charge = this.props.navigation.state.params;

		return (
			<View style={styles.container}>
        <View style={styles.cardInfo}>
	        <Icon style={{height: 30}} name={`cc-${brand}`} type='font-awesome' color='#0157a2'/>
          <View style={{alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row'}}>
  	        <Text style={{fontSize: 24}}>****</Text>
            <Text style={{fontSize: 24}}>****</Text>
            <Text style={{fontSize: 24}}>****</Text> 
            <Text style={{fontSize: 24}}>{card.last4}</Text>
          </View>
          <View style={[gStyles.row, {}]}>
            <View>
              <Text>VALID</Text>
              <Text>THRU</Text>
            </View>
            <Text style={{fontWeight: 'bold'}}>   {card.exp_month}/{card.exp_year.toString().substr(-2)}</Text>
          </View>
	      </View>
	      <View style={styles.costInfo}>
          <View style={{flex: 1}}>
  	      	<View style={gStyles.row}>
              <Image source={require('app/app/assets/img/Icon-Purchase.png')} style={{width: 30, height: 30}}/>
  		      	<Text style={{color: defaults.color, fontSize: 18, fontWeight: 'bold'}}>  Purchasing {charge.diamonds}</Text>
            </View>
            {charge.originalCost && <Text style={styles.lineItem}>Original Cost: {charge.originalCost}</Text>}
            {charge.save && <Text style={styles.lineItem}>Discount: {charge.save}</Text>}

            <Text style={styles.total}>
            	Total {charge.price}
            </Text>
          </View>
          <View style={{flex: 1, justifyContent: 'flex-end', paddingBottom: 15}}>
            <Button 
  		        // icon={{name: 'dollar', size: 15}}
  		        buttonStyle={{backgroundColor: defaults.color, borderRadius: defaults.borderRadius}}
  		        textStyle={{textAlign: 'center'}}
  		        title="Purchase"
  		        onPress={() => this.props.chargeCard(card.id, charge.cost)}
  		      	/>
              <TouchableOpacity style={{alignItems: 'center', justifyContent: 'center', marginTop: 10}} onPress={() => this.props.navigation.navigate('AddCard')}>
                <Text style={{fontSize: 18}}>Add Card</Text>
              </TouchableOpacity>
          </View>
	      </View>
			</View>
		)
	}

	renderAddCard(){
		return (
			<View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
    		<Text style={{marginBottom: 10}}>No card on file please add one </Text>
    		<Button 
        buttonStyle={{backgroundColor: defaults.color, borderRadius: defaults.borderRadius, width: 200}}
        textStyle={{textAlign: 'center'}}
        title="Add Card"
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

  showChargeSuccess(){
    let charge = this.props.navigation.state.params;
    return (
        <View style={styles.chargeSuccess}>
          <Image source={require('app/app/assets/img/Logo.png')} style={{width: 100, height: 100}}/>
          <Text style={{color: defaults.color, fontSize: 20}}>yay!!!</Text>
          <Text style={{fontWeight: 'bold', fontSize: 24}}>Payment Successful</Text>
          <View>
            <Text>Your payment of {charge.price} has</Text>
            <Text>been processed successfully</Text>
          </View>
          <View>
            <TouchableOpacity style={[defaults.defaultButton, {width: defaults.width - 80}]} onPress={() => this.leaveChargingScreen()}>
              <Text style={{color: 'white'}}>Continue</Text>
            </TouchableOpacity>
          </View>
        </View>
      )
  }

  showChargeFailed(){
    return (
      <View style={styles.charging}>
        <Text style={{fontSize: 16}}>Sorry something went wrong</Text>
        <Text style={{fontSize: 16}}>make sure your card is valid</Text>
        <Text style={{fontSize: 16, marginBottom: 20}}>and try again</Text>
        <TouchableOpacity style={[defaults.defaultButton, {width: defaults.width - 80}]} onPress={() => this.leaveChargingScreen()}>
              <Text style={{color: 'white'}}>Continue</Text>
            </TouchableOpacity>
      </View>
    )
  }

  leaveChargingScreen(){
    this.props.card.chargingCardSuccess = false;
    this.props.navigation.goBack()
  }

  render() {
		if(!this.props.navigation.state.params){
			this.leaveChargingScreen();
		}
    
    return (
      <View style={styles.container}>
        {this.props.card.chargingCard &&  this.showCharging()}
        {this.props.card.chargingCardSuccess &&  this.showChargeSuccess()}
      	{this.props.card.chargingCardFailed &&  this.showChargeFailed()}
      	{this.props.card.defaultCard ? this.renderCharge() : this.renderAddCard()}
      </View>
    )
  }

}

const styles = StyleSheet.create({
	container: {
		flex: 1,
    backgroundColor: 'white'
	},
  cardInfo: {
    height: 180,
    backgroundColor: '#f5f5f5',
    justifyContent: 'space-between',
    padding: 20,
    flex: 1
  },
  chargeSuccess: {
    flex: 1,
    justifyContent: 'space-between',
    paddingBottom: 50,
    alignItems: 'center',
    backgroundColor: 'white',
    paddingTop: 50,
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 1
  },
  cardIcon: {
  },
  chargingText: {
  	padding: 20,
  	backgroundColor: 'white',
  	alignItems: 'center',
  	justifyContent: 'space-around'
  },
  charging: {
    padding: 50,
  	backgroundColor: 'white',
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
  	padding: 10,
    flex: 2
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
  	borderTopColor: '#eee',
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