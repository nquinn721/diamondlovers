import React from 'react';
import { Text, View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { setChat } from 'newApp/app/redux/actions/chat';
import gStyles, { defaults } from 'newApp/app/config/globalStyles';
import moment from 'moment';
const img = require('newApp/app/assets/img/Icon-chat.png');

class ChatScreen extends React.Component {
	static navigationOptions = {
	    tabBarIcon: ({ tintColor }) => (
	      <Image
	        source={img}
	        style={[{width: defaults.iconWidth, height: defaults.iconHeight}, {tintColor: tintColor}]}
	      />
	    ),
	  };
	openChat(chat){
		this.props.setChat(chat._id);
		this.props.navigation.navigate('Messages')
	}
	renderChats(){
		return this.props.chats.map((chat, k) => {
			let from = chat.to._id === this.props.userId ? chat.from : chat.to;

			return (
				<TouchableOpacity key={k} onPress={() => this.openChat(chat)} style={[gStyles.row, styles.chatItem]}>
        			<View style={styles.image}>
        				<Image source={{uri: from.profile.defaultImage.url}} style={StyleSheet.absoluteFill}/>
        			</View>
        			<View style={{flexGrow: 2}}>
						<Text>{from.profile.displayName}</Text>
						<Text style={{color: '#aaa'}}>{chat.recentMsg.msg}</Text>
					</View>
					<View>
						<Text style={{color: '#aaa', fontSize: 12}}>{moment(chat.recentMsg.time).fromNow()}</Text>
						<Text style={{color: 'white'}}>ddd</Text>
					</View>
				</TouchableOpacity>
			);
		})	
	}
	renderNoChats(){
		return (
			<View style={{alignItems: 'center', justifyContent: 'center', flex: 1}}>
				<Icon name="chat" size={45} color="#aaa" />
				<Text style={{color: '#aaa'}}>Sorry no chats at this time</Text>
			</View>
		);
	}
	render() {
		
	return (
	  <View style={styles.container}>
	  	{this.props.chats.length ? this.renderChats() : this.renderNoChats()}
	  </View>
	)
	}

}

const styles = StyleSheet.create({
	container: {
    	flex: 1,
		backgroundColor: 'white',
		padding: 10,
	},
	image: {
		width:50, 
		height: 50,
		borderRadius: 100,
		overflow: 'hidden',
		marginRight: 10
	},
	chatItem: {
		alignItems: 'center', 
		justifyContent: 'space-between', 
		borderBottomColor: '#eee', 
		borderBottomWidth: 1, 
		padding: 10
	}
})




export default connect(
  (state) => ({chats: state.user.user.chats, userId: state.user.user._id}), 
  (dispatch) => (bindActionCreators({setChat}, dispatch))
)(ChatScreen);
