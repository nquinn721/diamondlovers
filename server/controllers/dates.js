module.exports = {
	setDate: (req, res) => {
		console.log(req.body);
		
		// let {to, from, location, time} = req.body;
		// Dates.setDate(to, from, location, time, (e, doc) => {
		// 	res.send(e ? {error: 'failed to create date'} : {data: doc});
		// })
	},
	getDates: (req, res) => {
		let _id = req.session.user.model._id;
		Dates.getDates(_id, (e, doc) => {
			res.send(e ? {error: 'failed to retreive dates'} : {data: doc});
		})
	},
	agreeToDate: (req, res) => {
		let _id = req.body.id;
		Dates.agreeToDate(_id, (e, doc) => {
			res.send(e ? {error: 'failed to retreive dates'} : {data: doc});
		});
	},
	confirmShowed: (req, res) => {
		let userId = req.session.user.model._id,
			_id = req.body.id;
		Dates.confirmShowed(_id, userId, (e, doc) => {
			res.send(e ? {error: 'failed to confirm date'} : {data: doc});
		})
	}
}