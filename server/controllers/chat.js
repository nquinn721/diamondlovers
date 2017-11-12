module.exports = {
	sendMessage: (req, res) => {
		let msg = req.body.msg,
			chatId = req.body.chatId,
			userId = req.session.user.client._id;
		
		Chat.recentMsg(chatId, msg, function(chatE, chat) {
			Message.newMessage(chatId, userId, msg, function(msgE, msg) {
				
			})
		});
	},
	getMessages: (req, res) => {
		let chatId = req.params.chatId;
		console.log('chat id ', chatId);
		
		Message.getMessages(chatId, (e, data) => {
			console.log(data);
			
			res.send(e ? {error: 'failed to retreive messages'} : {data});
		});
	}
}