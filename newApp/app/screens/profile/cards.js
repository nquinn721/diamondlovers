import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { FormLabel, FormInput, FormValidationMessage, Button } from 'react-native-elements';
import Config from 'newApp/app/config/config';
import gStyles from 'newApp/app/config/globalStyles';

class CardsScreen extends React.Component {
  renderCards({stripeCust} = this.props.user.user){
    console.log(this.props);
    
    if(stripeCust){
      console.log(stripeCust);
      
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
  
})




export default connect(
  (state) => ({user: state.user}), 
  // (dispatch) => (bindActionCreators({userServiceCall, selectUser}, dispatch))
)(CardsScreen);