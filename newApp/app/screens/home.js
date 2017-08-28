import React from 'react';
import { Text, View, StyleSheet, ActivityIndicator } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Button } from 'react-native-elements';
import { userServiceCall } from '../redux/actions/get-user-action';
import { selectUser } from '../redux/actions/active-user-action';

class HomeScreen extends React.Component {
  componentDidMount(){
    this.props.userServiceCall();

  }
  printUsers(users = this.props.users.users){
    console.log(users);    
    return users.map( (user, index) => <Text key={index} onPress={() => this.props.selectUser(user)}>{user.name}</Text>);
  }
  render() {
    return (
      <View style={styles.container}>
        
        <ActivityIndicator size="large" color="red" animating={this.props.users.isFetching}/>
         {this.printUsers()}
      </View>
    )
  }

}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center', 
    justifyContent: 'center', 
    flex: 1
  }
})




export default connect(
  (state) => ({users: state.users}), 
  (dispatch) => (bindActionCreators({userServiceCall, selectUser}, dispatch))
)(HomeScreen);