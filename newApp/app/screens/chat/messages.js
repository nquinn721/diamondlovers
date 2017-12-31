import React from 'react';
import { Text, View, StyleSheet, Image, TextInput, Button, ScrollView, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
import { Icon } from 'react-native-elements';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getMessages, sendMessage } from 'newApp/app/redux/actions/chat';
import gStyles from 'newApp/app/config/globalStyles';
import { defaults } from 'newApp/app/config/globalStyles';



// <View style={userId !== msgUserId ? styles.fromArrow : styles.arrow}></View>

class ChatScreen extends React.Component {
	state = {}
	renderMessages(){
		let userId = this.props.userId;

		return this.props.chat.messages.map((msg, k) => {
			console.log(msg);
			
			let msgUserId = msg.owner._id;
			return (
				<View key={k} style={userId !== msgUserId ? styles.fromMessage : styles.message}>
					<View style={userId !== msgUserId ? styles.fromMsgContent : styles.msgContent}>
	        			
	        				{ 
	        					userId !== msgUserId && 
	        						<View style={styles.imageContainer}>
	        							<Image source={{uri: msg.owner.profile.defaultImage.url}} style={StyleSheet.absoluteFill} />
	        						</View>
	        				}
	        			
						<Text style={userId !== msgUserId ? styles.fromMsgText : styles.msgText}>{msg.message}</Text>
					</View>
				</View>
			);
		})	
	}
	renderNoMessages(){
		return (
			<View style={{alignItems: 'center', justifyContent: 'center', flex: 1}}>
				<Icon name="chat" size={45} color="#aaa" />
				<Text style={{color: '#aaa'}}>Sorry no messages at this time</Text>
			</View>
		);
	}
	sendMessage() {
		if(!this.state.text)return;
		this.setState({text: ''});
		this.props.sendMessage(this.state.text, this.props.chat.currentChat)		
	}
	render() {
		let chat = this.props.chat.currentChat;
		if(!chat)return;
		
		if(!this.props.chat.receivedMessages)
			if(!this.props.chat.gettingMessages)
				this.props.getMessages(chat);
	
	return (
		<KeyboardAvoidingView
	      style={styles.container}
	      behavior="position"
	    >
				{
					this.props.chat.messages.length ? 
					<ScrollView style={styles.messageContainer}> 
						{this.renderMessages()}
					</ScrollView> : 
					this.renderNoMessages()
				}
			
			<View style={[gStyles.row, styles.input]}>
			  	<TextInput value={this.state.text} onChangeText={(text) => this.setState({text})} style={{width: defaults.width - 80, backgroundColor: 'white', borderRadius: 5, height: 30}} underlineColorAndroid="transparent"/>
			  	<TouchableOpacity onPress={() => this.sendMessage()} style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
			  		<Text style={{fontSize: 18}}>Send</Text>
			  	</TouchableOpacity>
			</View>
		</KeyboardAvoidingView>
	)
	}

}

const styles = StyleSheet.create({
	input: {
		backgroundColor: '#eee',
		justifyContent: 'space-between',
		alignItems: 'center',
		padding: 10
	},
	container: {
		backgroundColor: 'white',
		flex: 1
	},
	messageContainer: {
		flex: 1
	},
  	image: {
	  	width:30, 
	  	height: 30,
	  	borderRadius: 35
  	},
  	fromArrow: {
  		height: 10,
  		width: 20,
  		left: 50,
  		backgroundColor: 'transparent',
  		marginLeft: 10,
  		bottom: 0,
  		position: 'absolute',
  		borderWidth: 1,
  		borderColor: 'transparent',
		borderBottomLeftRadius: 100,
		borderBottomRightRadius: 100,
		shadowColor: '#000',
	    shadowOffset: { width: 2, height: 2 },
	    shadowOpacity: 1,
	    shadowRadius: 2,
		// boxShadow: '-21px 9px 0px 8px pink',
  	},
  	imageContainer: {
  		width: 50, 
  		height: 50, 
  		borderRadius: 50,
  		overflow: 'hidden'
  	},
  	fromMessage: {
  		margin: 10
  	},
  	message: {
  		margin: 10,
  		alignItems: 'flex-end'
  	},
  	msgContent: {
  		backgroundColor: defaults.color,
  		borderRadius: defaults.borderRadius,
  		padding: 10,
  		width: 200
  	},
  	fromMsgContent: {
  		flexDirection: 'row'
  	},
  	fromMsgText: {
  		backgroundColor: '#eee',
  		borderRadius: defaults.borderRadius,
  		color: 'black',
  		width: 200,
  		padding: 10,
  		marginLeft: 10
  	},
  	msgText: {
  		color: 'white'
  	}

})




export default connect(
  (state) => ({chat: state.chat, userId: state.user.user._id}), 
  (dispatch) => (bindActionCreators({getMessages, sendMessage}, dispatch))
)(ChatScreen);
