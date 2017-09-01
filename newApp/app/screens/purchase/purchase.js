import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Icon, Button } from 'react-native-elements';

class Purchase extends React.Component {
  render() {
    return (
      <View style={styles.container}>
      	<Text>Purchase Diamonds</Text>
      	<View style={styles.purchaseItem}>
      		<Text>100,000</Text>
      		<Icon name="diamond" size={20} color="red" type="font-awesome" />
      		<Button 
	          raised
	          // icon={{name: 'plus', size: 15}}
	          buttonStyle={{backgroundColor: '#2980b9', borderRadius: 5}}
	          textStyle={{textAlign: 'center'}}
	          title="$10,000"
	          onPress={() => this.props.navigation.navigate('Charge')}
	        />
      	</View>

      </View>
    )
  }

}

const styles = StyleSheet.create({
  container: {
  	padding: 10
  },
  purchaseItem: {
  	justifyContent: 'space-between'
  }
})




export default connect(
  // (state) => ({users: state.users}), 
  // (dispatch) => (bindActionCreators({userServiceCall, selectUser}, dispatch))
)(Purchase);