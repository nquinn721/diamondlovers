import Service from './service';

export const sendMessage = (msg, chatId) => {
	return (dispatch) => {
		Service.dispatchPost(dispatch, 'chat/send-message', {msg, chatId}, {
			init: 'SENDING_MESSAGE',
			success: 'MESSAGE_SENT',
			error: 'MESSAGE_FAILED'
		})

	}
}

export const getMessages = (chatId) => {
	return (dispatch) => {
		Service.dispatchGet(dispatch, 'chat/get-messages/' + chatId, {
			init: 'GETTING_MESSAGES',
			success: 'MESSAGES_RECIEVED',
			error: 'GET_MESSAGES_FAILED'
		})

	}	
}

export const getChats = () => {
	return (dispatch) => {
		Service.dispatchGet(dispatch, 'chat/get-chats', {
			init: 'GETTING_CHATS',
			success: 'GETTING_CHATS_SUCCESS',
			error: 'GETTING_CHATS_FAILED'
		})
	}
}

export const setChat = (chatId) => {
	return (dispatch) => {
		dispatch({type: 'CURRENT_CHAT', chatId});
	}	
}
	