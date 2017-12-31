module.exports = {
	setDate: function(req, res) {
		let {to, from, location, time, cost} = req.body;
		Dates.setDate(to, from, location, time, cost, (e, data) => {
			res.send(e ? {error: 'failed to create date'} : {data});
			
		});
	},
	getDates: function(req, res) {
		let _id = req.session.model._id;
		Dates.getDates(_id, (e, doc) => {
			res.send(e ? {error: 'failed to retreive dates'} : {data: doc});
		})
	},
	approveDate: function(req, res) {
		let _id = req.body.id;
		Dates.approveDate(_id, (e, date) => {
			let to = date.to._id,
				from = date.from._id;
			
			Chat.createChat(to, from, function(e, chat) {
				User.createChat(to, from, chat._id, function(e, userDoc) {
					res.send(e ? {error: 'failed to approve date'} : {data: {date, chat}});
					
				});
			});
		});
	},
	confirmShowed: function(req, res) {
		let userId = req.session.model._id,
			_id = req.body.id;
		Dates.confirmShowed(_id, userId, (e, data) => {
			if(data.status === 'completed'){
				User.updateDiamonds(data.from, -(data.cost), (err, fromDoc) => {
					User.updateDiamonds(data.to, data.cost, (e, toDoc) => {
						if(err || e){
							// Handle retry on switch of diamonds
						}
						res.send({data});
					})
				});
			}else{
				res.send(e ? {error: 'failed to confirm date'} : {data});
			}
		});
	}
}