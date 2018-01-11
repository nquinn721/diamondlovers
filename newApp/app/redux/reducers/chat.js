const initialState = {
	sending: false,
	chats: []
}

export default (state = initialState, action) => {

	switch(action.type){
		case 'LOGGED_IN':
			return {
				...state,
				chats: action.data.chats
			}
		case 'APPROVE_DATE_SUCCESS':
			return {
				...state,
				chats: state.chats.shift(action.data.chat)
			}
		case 'GETTING_CHATS':
			return {
				...state,
				fetchingChats: true
			}
		case 'GETTING_CHATS_SUCCESS':
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
			let chat = getChat(state.chats, action.chatId);
			return {
				...state,
				currentChat: chat 
			}
		case 'SENDING_MESSAGE':
			return {
				...state,
				sending: true
			}
		case 'MESSAGE_SENT':
			if(!state.currentChat.messages)state.currentChat.messages = [];
			state.currentChat.messages.push(action.data);
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
			state.currentChat.gettingMessages = true;
			return {
				...state,
			}
		case 'MESSAGES_RECIEVED':
			state.currentChat.messages = action.data;
			state.currentChat.gettingMessages = false;
			console.log(state);
			return {
				...state,
			}
		case 'GET_MESSAGES_FAILED':
			state.currentChat.gettingMessages = false;
			state.currentChat.gettingMessagesFailed = true;
			return {
				...state,
			}
		default:
			return state;
	}
}

const getChat = (chats, id) => {
	return chats.filter(c => c._id.toString() === id.toString())[0];
}
