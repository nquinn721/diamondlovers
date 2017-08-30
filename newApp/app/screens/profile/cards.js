import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { FormLabel, FormInput, FormValidationMessage, Button, Icon } from 'react-native-elements';
import Config from 'newApp/app/config/config';
import gStyles from 'newApp/app/config/globalStyles';

class CardsScreen extends React.Component {
  renderCards({stripeCust} = this.props.user.user){
    console.log(this.props);
    
    if(stripeCust){
      const cards = stripeCust.sources.data;
      
      return cards.map((card, i) => {
        let brand = card.brand;
        return (
          <View key={i} style={styles.card}>
            <Icon name='cc-visa'type='font-awesome'color='#0157a2'/>
            <Text>**** **** **** {card.last4}</Text>
            {
              stripeCust.default_source === card.id ? 
                <Icon name="check" color="green" type="font-awesome"/> :
                <Text></Text>
            }
            <Icon name="trash" color="#555" type="font-awesome" />
          </View>
        );  
      });
      
    }
  }
  render() {
    return (
      <View style={styles.container}>
				{this.renderCards()}
        <Button 
          raised
          icon={{name: 'home', size: 15}}
          buttonStyle={{backgroundColor: '#2980b9', borderRadius: 5}}
          textStyle={{textAlign: 'center'}}
          title="Add Card"
          onPress={() => this.props.navigation.navigate('AddCard')}
        />

      </View>
    )
  }

}

const styles = StyleSheet.create({
  card:{
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    padding: 5
  }
})




export default connect(
  (state) => ({user: state.user}), 
  // (dispatch) => (bindActionCreators({userServiceCall, selectUser}, dispatch))
)(CardsScreen);