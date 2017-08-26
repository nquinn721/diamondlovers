import React from 'react';
import { View, Text } from 'react-native';
// import { Provider } from 'react-redux';
import store from './app/config/store';
// import App from './app/index';

import connect from 'react-redux';
import fetchUsers from './app/actions';

class Index extends React.Component{

	// {users, isFetching} = users;

  render(){
    return (
    	// <View style={styles.container}>
    	// <Text>click me</Text>
    	// {
    	// 	isFetching && <Text>Loading</Text>
    	// }

    	// {
    	// 	users.length ? (
    	// 		users.map((user, index) => {
    	// 			return (
    	// 				<View key={index}>
    	// 					<Text>Name: {user.name}</Text>
    	// 					<Text>Birth Year: {user.birth_year}</Text>
    	// 				</View>
    	// 			)
    	// 		})
    	// 	) : null
    	// }
    	// </View>
    	<Provider store={store}>
    		<App />
    	</Provider>
    )
  }
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center'
	}
})

// function mapStateToProps(state) {
// 	return {
// 		users: state.users
// 	}
// }


// function mapDispatchToProps(dispatch) {
// 	return {
// 		getUsers: () => dispath(fetchUsers())
// 	}
// }


// export default(mapStateToProps, mapDispatchToProps)(Index);