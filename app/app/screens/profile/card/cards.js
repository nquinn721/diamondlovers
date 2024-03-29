import React from 'react';
import { Text, View, StyleSheet, Alert, ActivityIndicator, ScrollView, Switch, Image } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { FormLabel, FormInput, FormValidationMessage, Button, Icon } from 'react-native-elements';
import Config from 'app/app/config/config';
import gStyles, { defaults } from 'app/app/config/globalStyles';
import { deleteCard, setDefaultCard } from 'app/app/redux/actions/card';
const img = require('app/app/assets/img/Icon-My-Profile.png');

class Cards extends React.Component {
  state = {}

  setDefaultCard(card){
    if(this.props.card.stripeCust.default_source === card)return;
    this.state.defaultCard = card;
    this.props.setDefaultCard(card);
  }

  renderCards({stripeCust} = this.props.card){
    
    if(stripeCust && stripeCust.sources){
      const cards = stripeCust.sources.data;
      
      return cards.map((card, i) => {
        let brand = card.brand.toLowerCase();
        return (
          <View key={i} style={styles.card}>
            {
              this.state.cardBeingDeleted === card.id ?
                <ActivityIndicator style={styles.cardIcon}/> :
                <Icon style={styles.cardIcon} onPress={() => this.deleteCard(card)} name={`cc-${brand}`} type='font-awesome'color='#0157a2'/>
              
            }
            <View style={{flexGrow: 1.5, paddingLeft: 10, paddingRight: 10, display: 'flex', justifyContent: 'space-around', flexDirection: 'row'}}>
              <Text>****</Text> 
              <Text>**** </Text>
              <Text>**** </Text>
              <Text>{card.last4}</Text>
            </View>
            <Switch onTintColor={defaults.color} thumbTintColor='white' value={stripeCust.default_source === card.id} onValueChange={() => this.setDefaultCard(card.id)}/>            
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
        <ScrollView style={styles.top}>

  				{this.renderCards()}
          {this.props.card.addingCard && <ActivityIndicator size="small" />}
        </ScrollView>
        <View style={defaults.buttonBottom}>
          <Button 
          buttonStyle={{backgroundColor: defaults.color, borderRadius: defaults.borderRadius}}
            textStyle={{textAlign: 'center'}}
            title="Add Card"
            onPress={() => this.props.navigation.navigate('AddCard')}
          />
          <Text style={[gStyles.smallText, styles.aligned]}>Press the card icon to delete.</Text>
        </View>
      </View>
    )
  }

}

const styles = StyleSheet.create({
  container: {
     flex: 1,
     backgroundColor: 'white'
   },
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
  },
  top: {
    flex: 2
  },
})




export default connect(
  (state) => ({card: state.card}), 
  (dispatch) => (bindActionCreators({deleteCard, setDefaultCard}, dispatch))
)(Cards);