module.exports = {
	setDate: (req, res) => {
		let {to, from, location, time, cost} = req.body;
		Dates.setDate(to, from, location, time, cost, (e, doc) => {
			res.send(e ? {error: 'failed to create date'} : {data: doc});
		})
	},
	getDates: (req, res) => {
		let _id = req.session.model._id;
		Dates.getDates(_id, (e, doc) => {
			res.send(e ? {error: 'failed to retreive dates'} : {data: doc});
		})
	},
	approveDate: (req, res) => {
		let _id = req.body.id;
		Dates.approveDate(_id, (e, doc) => {
			res.send(e ? {error: 'failed to retreive dates'} : {data: doc});
		});
	},
	confirmShowed: (req, res) => {
		let userId = req.session.model._id,
			_id = req.body.id;
		Dates.confirmShowed(_id, userId, (e, dateDoc) => {
			if(dateDoc.status === 'completed'){
				User.updateDiamonds(dateDoc.from, -(dateDoc.cost), (err, fromDoc) => {
					User.updateDiamonds(dateDoc.to, dateDoc.cost, (e, toDoc) => {
						if(err || e){
							// Handle retry on switch of diamonds
						}
						res.send({data: dateDoc});
					})
				});
			}else{
				res.send(e ? {error: 'failed to confirm date'} : {data: dateDoc});
			}
		});
	}
}