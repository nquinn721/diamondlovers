import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Button } from 'react-native-elements';


class HomeScreen extends React.Component {
	displayUser({isFetching} = this.props.user, {client, images, stripeCust} = this.props.user.user){
    let page = [];
		client && page.push(<Text key='client'>{client.email}</Text>);
    console.log(this.props);
    
    // stripeCust && page.concat(stripeCust.source)
    return <View>{page}</View>
	}
	addCard(){
		this.props.navigation.navigate('AddCard');
		console.log('adding card');
	}
  render() {
    return (
      <View style={styles.container}>
        {this.displayUser()}
        <Button 
        	raised
    			icon={{name: 'home', size: 15}}
    			buttonStyle={{backgroundColor: '#2980b9', borderRadius: 5}}
    			textStyle={{textAlign: 'center'}}
        	title="Cards"
        	onPress={() => this.addCard()}
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
)(HomeScreen);