import Service from './service';

export const message = (msg, chatId) => {
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
			init: 'SENDING_MESSAGE',
			success: 'MESSAGE_SENT',
			error: 'MESSAGE_FAILED'
		})

	}	
}

 