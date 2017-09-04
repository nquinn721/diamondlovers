import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Icon, Button } from 'react-native-elements';
import { purchase } from 'newApp/app/redux/actions/card';

class Purchase extends React.Component {
  state = {
    costs: [{
      diamonds: '100,000',
      save: '%50',
      originalCost: '$10,000',
      price: '$5,000',
      cost: 5000
    }, {
      diamonds: '50,000',
      save: '%20',
      originalCost: '$5,000',
      price: '$3,000',
      cost: 3000
    }, {
      diamonds: '10,000',
      save: '%10',
      originalCost: '$1,000',
      price: '$900',
      cost: 900
    }, {
      diamonds: '1,000',
      price: '$100',
      cost: 100
    }, {
      diamonds: '100',
      price: '$10',
      cost: 10
    }]
  }

  purchaseDiamonds(cost){
    this.props.navigation.navigate('Charge', cost);
  }

  renderCosts(){
    return this.state.costs.map((cost, i) => {
      return (
        <View style={styles.purchaseItem} key={i}>
          <View style={styles.cost}>
            <Text>{cost.diamonds} </Text>
            <Icon name="diamond" size={13} color="blue" type="font-awesome" />
          </View>
          <View>
            <Text style={styles.saveText}>{cost.save ? `Save ${cost.save}` : ''}</Text>
          </View>
          <Button 
            raised
            // icon={{name: 'plus', size: 15}}
            buttonStyle={styles.purchaseButton}
            textStyle={{textAlign: 'center'}}
            title={cost.price}
            onPress={() => this.purchaseDiamonds(cost)}
          />
        </View>
      );
    })
  }

  render() {
    return (
      <View style={styles.container}>
      	<Text style={styles.header}>Purchase Diamonds</Text>
      	{this.renderCosts()}
      </View>
    )
  }

}

const styles = StyleSheet.create({
  header: {
     padding: 10
  },
  cost: {
    alignItems: 'center',
    justifyContent: 'flex-end',
    width: 100,
    flexDirection: 'row'
  },
  saveText: {
    color: 'red'
  },
  purchaseItem: {
  	justifyContent: 'space-between',
    flexDirection: 'row',
    backgroundColor: 'white',
    padding: 5,
    paddingTop: 10,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    alignItems: 'center'
  },
  purchaseButton: {
    backgroundColor: '#2980b9', 
    width: 100,
    borderRadius: 5,
    height: 30
  }
})




export default connect(
  (state) => ({card: state.card}), 
  (dispatch) => (bindActionCreators({purchase}, dispatch))
)(Purchase);