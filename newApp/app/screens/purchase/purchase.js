import React from 'react';
import { Text, View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Icon, Button } from 'react-native-elements';
import { purchase, resetCharging } from 'newApp/app/redux/actions/card';
import gStyles from 'newApp/app/config/globalStyles';
import { defaults } from 'newApp/app/config/globalStyles';
const img = require('newApp/app/assets/img/Icon-Purchase.png');

class Purchase extends React.Component {
  static navigationOptions = {
    tabBarIcon: ({ tintColor }) => (
      <Image
        source={img}
        style={[{width: 24, height: 26}, {tintColor: tintColor}]}
      />
    ),
  };

  state = {
    costs: [{
      diamonds: '10000',
      save: '%50',
      originalCost: '$999.99',
      price: '$499.99',
      cost: 49999
    },{
      diamonds: '5000',
      save: '%40',
      originalCost: '$499.99',
      price: '$299.99',
      cost: 29999
    }, {
      diamonds: '3000',
      save: '%30',
      originalCost: '$299.99',
      price: '$199.99',
      cost: 19999
    }, {
      diamonds: '1000',
      save: '%20',
      originalCost: '$99.99',
      price: '$79.99',
      cost: 7999
    }, {
      diamonds: '500',
      save: '%10',
      originalCost: '$49.99',
      price: '$44.99',
      cost: 4499
    }
    // , {
    //   diamonds: '100',
    //   price: '$9.99',
    //   originalCost: '$9.99',
    //   save: '',
    //   cost: 999
    // }
    ]
  }

  renderCosts(){
    return this.state.costs.map((cost, i) => {
      return (
        <View style={styles.purchaseItem} key={i}>

          <View style={gStyles.row}>
            <Image source={require('newApp/app/assets/img/Icon-Purchase.png')} style={{width: 30, height: 30}}/>
            <View style={{paddingLeft: 20}}>
              <Text style={{fontWeight: 'bold'}}>{cost.diamonds} </Text>
              <Text>{cost.save ? `Save ${cost.save}` : ''}</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.purchaseButton} onPress={() => this.props.navigation.navigate('Charge', cost)}>
            <Text style={styles.purchaseButtonText}>{cost.price}</Text>
          </TouchableOpacity>
        </View>
      );
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={[gStyles.row, {alignItems: 'center'}]}>
        	<Text style={styles.header}>Purchase Diamonds</Text>
          <Text>(points)</Text>
        </View>
      	{this.renderCosts()}
      </View>
    )
  }

}

const styles = StyleSheet.create({
  header: {
     padding: 10,
     fontSize: 18,
     fontWeight: 'bold'
  },
  purchaseItem: {
  	justifyContent: 'space-between',
    flexDirection: 'row',
    backgroundColor: 'white',
    padding: 15,
    paddingTop: 10,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    alignItems: 'center'
  },
  container: {
    flex: 1,
    backgroundColor:'white'
  },
  purchaseButton: {
    backgroundColor: 'white',
    borderColor: defaults.color,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    width: 80,
    borderRadius: 20,
    height: 30
  },
  purchaseButtonText: {
    color: defaults.color, 
  }
})




export default connect(
  (state) => ({card: state.card}), 
  (dispatch) => (bindActionCreators({purchase, resetCharging}, dispatch))
)(Purchase);