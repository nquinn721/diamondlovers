module.exports = {
	message: (req, res) => {
		let msg = req.body.msg,
			chatId = req.body.chat,
			userId = req.session.user.user._id;

		Chat.recentMsg(chatId, msg, function(chatE, chat) {
			Message.newMessage(chatId, userId, msg, function(msgE, msg) {
				
			})
		});
	},
	getMessages: (req, res) => {
		let chatId = req.body.chatId;

		Message.getMessages(chatId, (e, data) => {
			res.send(e ? {error: 'failed to retreive messages'} : {data});
		});
	}
}