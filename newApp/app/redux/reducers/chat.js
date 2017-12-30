const initialState = {
	sending: false,
	messages: []
}

export default (state = initialState, action) => {
	
	switch(action.type){
		case 'GETTING_CHATS',:
			return {
				...state,
				fetchingChats: true
			}
		case 'GETTING_CHATS_SUCCESS',:
			return {
				...state,
				fetchingChats: false,
				chats: action.data
			}
		case 'GETTING_CHATS_FAILED':
			return {
				...state,
				fetchingChats: false,
				chatsError: action.error
			}
		case 'CREATE_CHAT':
			return {
				...state,
				creatingChat: true
			}
		case 'CREATE_CHAT_SUCCESS':
			return {
				...state,
				chats: action.data,
				creatingChat: false
			}
		case 'CREATE_CHAT_FAILED':
			return {
				...state,
				error: action.error,
				creatingChat: false
			}
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
			state.messages.push(action.data);
			return {
				...state,
				sending: false
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
