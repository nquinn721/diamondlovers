import React from 'react';
import { Text, View, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { FormLabel, FormInput, FormValidationMessage, Button, Icon } from 'react-native-elements';
import Config from 'newApp/app/config/config';
import gStyles from 'newApp/app/config/globalStyles';
import { addImage, deleteImage, setDefaultImage } from 'newApp/app/redux/actions/image';

class CardsScreen extends React.Component {
  state = {}

  setDefaultImage(image){
  }

  renderImages({images} = this.props.image){
    console.log(this.props);
    
    if(images){
      return [1,2,3,4].map((card, i) => {
        return (
          <View key={i} style={styles.imageContainer}>
          </View>
        );  
      });
      
    }
  }
  deleteImage(image){
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
				{this.renderImages()}
        <Text style={[gStyles.smallText, gStyles.center]}>Press the card icon to set default card.</Text>

      </View>
    )
  }

}

const styles = StyleSheet.create({
  imageContainer:{
    alignItems: 'center',
    padding: 5
  }
  
})




export default connect(
  (state) => ({image: state.image}), 
  // (dispatch) => (bindActionCreators({}, dispatch))
)(CardsScreen);