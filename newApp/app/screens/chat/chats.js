import React from 'react';
import { Text, View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { setChat } from 'newApp/app/redux/actions/chat';

class ChatScreen extends React.Component {
	openChat(chat){
		this.props.setChat(chat._id);
		this.props.navigation.navigate('Messages')
	}
	renderChats(){
		return this.props.chats.map((chat, k) => {
			let from = chat.to._id === this.props.userId ? chat.from : chat.to;

			return (
				<TouchableOpacity key={k} onPress={() => this.openChat(chat)}>
        			<View style={styles.imageContainer}>
        				<Image source={{uri: from.profile.defaultImage.url}} style={styles.image}/>
        			</View>
					<Text>{from.profile.displayName}</Text>
				</TouchableOpacity>
			);
		})	
	}
	render() {
		
	return (
	  <View style={styles.container}>
	  	<Text>Messages</Text>
	  	{this.renderChats()}
	  </View>
	)
	}

}

const styles = StyleSheet.create({
  image: {
  	width:50, 
  	height: 50,
  	borderRadius: 35
  },
})




export default connect(
  (state) => ({chats: state.user.user.chats, userId: state.user.user._id}), 
  (dispatch) => (bindActionCreators({setChat}, dispatch))
)(ChatScreen);
