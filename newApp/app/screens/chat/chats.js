import React from 'react';
import { Text, View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { setChat } from 'newApp/app/redux/actions/chat';
import gStyles from 'newApp/app/config/globalStyles';
import { defaults } from 'newApp/app/config/globalStyles';
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
        			<View style={{width: 70}}>
        				<Image source={{uri: from.profile.defaultImage.url}} style={styles.image}/>
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
	render() {
		
	return (
	  <View style={styles.container}>
	  	{this.renderChats()}
	  </View>
	)
	}

}

const styles = StyleSheet.create({
	container: {
		backgroundColor: 'white',
		padding: 10,
		height: gStyles.height
	},
	image: {
		width:50, 
		height: 50,
		borderRadius: 35
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
