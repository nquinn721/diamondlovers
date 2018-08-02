import React from 'react';
import { Text, View, StyleSheet, Image, TextInput, Button, ScrollView, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
import { Icon } from 'react-native-elements';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { sendMessage } from 'app/app/redux/actions/chat';
import gStyles from 'app/app/config/globalStyles';
import { defaults } from 'app/app/config/globalStyles';
import moment from 'moment';



// <View style={userId !== msgUserId ? styles.fromArrow : styles.arrow}></View>

class ChatScreen extends React.Component {
	state = {}
	renderMessages(chat){
		let userId = this.props.userId;

		return chat.messages.map((msg, k) => {
			let msgUserId = msg.owner._id,
				userChat = userId === msgUserId;
				console.log(msgUserId);
				
			return (
				<View key={k} style={userChat ? styles.message : styles.fromMessage}>
					<View style={styles.msgContent}>
	        			
	        				{ 
	        					userId !== msgUserId && 
	        						<TouchableOpacity style={styles.imageContainer} onPress={() => this.props.navigation.navigate('UserProfile')}>
	        							<Image source={{uri: msg.owner.profile.defaultImage.url}} style={StyleSheet.absoluteFill} />
	        						</TouchableOpacity>
	        				}
	        			<View style={[styles.chatText, (userChat ? styles.msg : styles.fromMsg)]}>
							<Text style={userChat ? styles.msgText : styles.fromMsgText}>{msg.message}</Text>
							<Text style={[{color: userChat ? '#eee' : '#555', fontSize: 10, textAlign: 'right'}]}>{moment(msg.date).fromNow()}</Text>
						</View>
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
	
	return (
		<KeyboardAvoidingView
	      style={styles.container}
	      behavior="padding"
	    >
				{
					chat.messages && chat.messages.length ? 
					<ScrollView style={styles.messageContainer}> 
						{this.renderMessages(chat)}
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
  	imageContainer: {
  		width: 50, 
  		height: 50, 
  		borderRadius: 50,
  		overflow: 'hidden',
	  	marginRight: 10
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
  	fromMessage: {
  		margin: 10
  	},
  	message: {
  		margin: 10,
  		alignItems: 'flex-end'
  	},
  	msgContent: {
  		flexDirection: 'row'
  	},
  	chatText: {
  		padding: 10,
  		maxWidth: 200,
  		borderRadius: defaults.borderRadius,
  		
  	},
  	fromMsg: {
  		backgroundColor: '#eee',
  	},
  	msg: {
  		backgroundColor: defaults.color,
  	},
  	fromMsgText: {
  		color: 'black',
  	},
  	msgText: {
  		color: 'white'
  	}

})




export default connect(
  (state) => ({chat: state.chat, userId: state.user.user._id}), 
  (dispatch) => (bindActionCreators({sendMessage}, dispatch))
)(ChatScreen);
