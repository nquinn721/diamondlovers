import React from 'react';
import { Text, View, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { FormLabel, FormInput, FormValidationMessage, Button, Icon } from 'react-native-elements';
import Config from 'newApp/app/config/config';
import gStyles from 'newApp/app/config/globalStyles';
import { deleteCard, setDefaultCard } from 'newApp/app/redux/actions/card';

class CardsScreen extends React.Component {
  state = {}

  setDefaultCard(card){
    if(this.props.card.stripeCust.default_source === card)return;
    this.state.defaultCard = card;
    this.props.setDefaultCard(card);
  }

  renderCards({stripeCust} = this.props.card){
    console.log(this.props);
    
    if(stripeCust && stripeCust.sources){
      const cards = stripeCust.sources.data;
      
      return cards.map((card, i) => {
        let brand = card.brand.toLowerCase();
        return (
          <View key={i} style={styles.card}>
            {
              this.state.defaultCard === card.id && this.props.card.settingDefault ?
                <ActivityIndicator style={styles.cardIcon}/> :
                <Icon style={styles.cardIcon} onPress={() => this.setDefaultCard(card.id)} name={`cc-${brand}`} type='font-awesome'color='#0157a2'/>
              
            }
            <Text>**** **** **** {card.last4}</Text>
            {
              stripeCust.default_source === card.id ? 
                <Icon style={styles.check} name="check" color="green" type="font-awesome"/> :
                <Text style={styles.check}></Text>
            }
            {
              this.props.card.deletingCard && this.state.cardBeingDeleted === card.id ? 
                <ActivityIndicator /> :
                <Icon name="trash" color="#555" type="font-awesome" onPress={() => this.deleteCard(card)}/>
            }
          </View>
        );  
      });
      
    }
  }
  deleteCard(card){
    Alert.alert(
      'Delete Card',
      `Are you sure you want to delete card ending in ${card.last4}?`,
      [
        {text: 'Cancel', style: 'cancel'},
        {text: 'OK', onPress: () => {
          this.state.cardBeingDeleted = card.id;
          this.props.deleteCard(card.id);
        }},
      ],
      { cancelable: true }
    )
  }
  render() {
    return (
      <View style={styles.container}>
				{this.renderCards()}
        <Text style={[gStyles.smallText, styles.aligned]}>Press the card icon to set default card.</Text>
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
  },
  check: {
    width: 20
  },
  cardIcon: {
    width: 30
  },
  aligned: {
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    padding: 5
  }
})




export default connect(
  (state) => ({card: state.card}), 
  (dispatch) => (bindActionCreators({deleteCard, setDefaultCard}, dispatch))
)(CardsScreen);