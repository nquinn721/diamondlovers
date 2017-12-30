module.exports = {
	sendMessage: (req, res) => {
		let msg = req.body.msg,
			chatId = req.body.chatId,
			userId = req.session.user.client._id;
		
		Chat.recentMsg(chatId, msg, function(chatE, chat) {
			Message.newMessage(chatId, userId, msg, function(msgE, msg) {
				res.send(msgE ? {error: 'failed to send message'} : {data: msg})
			})
		});
	},
	getMessages: (req, res) => {
		let chatId = req.params.chatId;
		console.log('chat id ', chatId);
		
		Message.getMessages(chatId, (e, data) => {
			res.send(e ? {error: 'failed to retreive messages'} : {data});
		});
	},
	getChats: (req, res) => {
		let userId = req.session.user.client._id,
		Chat.get(userId, (e, data) => {
			res.send(e ? {error: 'failed to retreive chats'} : {data});
		});
	},
	create: (req, res) => {
		let from = req.session.user.client._id,
			to = req.body.id;
			res.send('hi');
		Chat.createChat(to, from, function(e, data) {
			res.send(e ? {error: 'failed to create date'} : {data});
		});
	}
}