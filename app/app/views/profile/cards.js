import React from 'react';
import { StyleSheet, Text, View, Image, Button, ScrollView, TouchableOpacity} from 'react-native';
import { Form,
  Separator,InputField, LinkField,
  SwitchField, PickerField,DatePickerField,TimePickerField
} from 'react-native-form-generator'; 
import Service from 'app/app/components/service';
import Settings from 'app/app/components/settings';
import User from 'app/app/components/user';

export default class ProfileImages extends React.Component{
    state = {
        cards: [],
        card: {
            cvc: "123",
            exp_month:"05",
            exp_year:"22",
            number:"4242424242424242"
        }
    }
 
    componentWillMount(){
        if(User.user.stripeCust){
            this.state.cards =  User.user.stripeCust.sources.data;
        }

    }

    addCard(){
        Service.addCard(this.state.card, () => this.setState({cards: User.user.stripeCust.sources.data}));
    }
   
    handleFormChange(card){
        this.setState({card});
    }
    handleFormFocus(){

    }
    deleteCard(cardId){
        Service.deleteCard(cardId, () => this.setState({cards: User.user.stripeCust.sources.data}));
    }
    displayCards(){
        let cards = [];

        for(let i = 0; i < this.state.cards.length; i++){
            let card = this.state.cards[i];
            cards.push(<View>
                <Text key={i}>{card.brand} - **** **** **** {card.last4}</Text>
                <TouchableOpacity onPress={() => this.deleteCard(card.id)}>
                    <Text>Delete</Text>
                </TouchableOpacity>
            </View>)
        }
        return <View>{cards}</View>;
    }

    render(){
        return (
            <View style={styles.container}>
                <Text>Cards</Text>
                <Button onPress={() => this.props.changeView('profile')} title="Back"/>
                {this.displayCards()}
                <Button onPress={() => this.setState({addCard: true})} title="New Card" />
                
                {this.state.addCard ?
                    <Form
                        ref='addcardform'
                        onFocus={this.handleFormFocus.bind(this)}
                        onChange={this.handleFormChange.bind(this)}
                        label="Card info">
                        <InputField ref='number' placeholder='Card Number' value="4242424242424242"/>
                        <InputField ref='exp_month' placeholder='Month(MM)' value="05"/>
                        <InputField ref='exp_year' placeholder='Year(YY)' value="22"/>
                        <InputField ref='cvc' placeholder='CVC' value="123"/>
                        <Button onPress={() => this.addCard()} title="Add Card" />
                    </Form>
                : null}
            </View>
        );
    }
}
console.log(Settings.w, Settings.h / 2)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        marginTop:30
    }
});
