import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Button } from 'react-native-elements';


class HomeScreen extends React.Component {
	displayUser({isFetching} = this.props.user, {client, images, stripeCust} = this.props.user.user){
    let page = [];
		client && page.push(<Text key='client'>{client.email}</Text>);

    return <View>{page}</View>
	}
		
  render() {
    return (
      <View style={styles.container}>
        {this.displayUser()}
        <Button 
          raised
          icon={{name: 'credit-card', size: 15}}
          buttonStyle={styles.profileButton}
          textStyle={{textAlign: 'center'}}
          title="Cards"
          onPress={() => this.props.navigation.navigate('Cards')}
        />
        <Button 
          raised
          icon={{name: 'image', size: 15}}
          buttonStyle={styles.profileButton}
          textStyle={{textAlign: 'center'}}
          title="Profile Images"
          onPress={() => this.props.navigation.navigate('Images')}
        />
        
      </View>
    )
  }

}

const styles = StyleSheet.create({
  profileButton:{
    backgroundColor: '#2980b9', 
    borderRadius: 5
  }
})




export default connect(
  (state) => ({user: state.user}), 
  // (dispatch) => (bindActionCreators({userServiceCall, selectUser}, dispatch))
)(HomeScreen);