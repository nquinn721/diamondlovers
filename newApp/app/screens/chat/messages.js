import React from 'react';
import { Text, View, StyleSheet, Image, TextInput, Button } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getMessages, sendMessage } from 'newApp/app/redux/actions/chat';

class ChatScreen extends React.Component {
	state = {}
	renderChats(){
		return this.props.chats.map((chat, k) => {

			return (
				<View key={k}>
        			<View style={styles.imageContainer}>
        				<Image source={{uri: chat.from.profile.defaultImage.url}} style={styles.image}/>
        			</View>
					<Text>{from.profile.displayName}</Text>
				</View>
			);
		})	
	}
	sendMessage() {
		this.props.sendMessage(this.state.text, this.props.chat.currentChat)		
	}
	render() {
		let chat = this.props.chat.currentChat;
		if(!chat)return;
		
		if(!this.props.chat.recievedMessages && !this.props.chat.gettingMessages)
			this.props.getMessages(chat);
		console.log(this.props.chat);
	
	return (
	  <View style={styles.container}>
	  	<Text>Messages</Text>
	  	<TextInput onChangeText={(text) => this.setState({text})}/>
	  	<Button title="send" onPress={() => this.sendMessage()} />
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
  (state) => ({chat: state.chat, userId: state.user.user._id}), 
  (dispatch) => (bindActionCreators({getMessages, sendMessage}, dispatch))
)(ChatScreen);
