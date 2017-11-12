const initialState = {
	sending: false,
	messages: []
}

export default (state = initialState, action) => {
	console.log(action.type, action);
	
	switch(action.type){
		case 'CURRENT_CHAT':
			return {
				...state,
				currentChat: action.chatId
			}
		case 'SENDING_MESSAGE':
			return {
				...state,
				sending: true
			}
		case 'MESSAGE_SENT':
			return {
				...state,
				sending: false,
				message: action.data
			}
		case 'MESSAGE_FAILED':
			return {
				...state,
				sending: false,
				error: action.error
			}

		case 'GETTING_MESSAGES':
			return {
				...state,
				gettingMessages: true
			}
		case 'MESSAGES_RECIEVED':
			return {
				...state,
				gettingMessages: false,
				messages: action.data,
				receivedMessages: true
			}
		case 'GET_MESSAGES_FAILED':
			return {
				...state,
				gettingMessages: false,
				gettingMessagesFailed: true
			}
		default:
			return state;
	}
}
