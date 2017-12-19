module.exports = {
	updateProfileField: (req, res) => {
		if(!req.body.field || req.body.value === void(0))return res.send({error: 'No field or value specified'});
		User.updateProfile(req.session.user.client._id, req.body.field, req.body.value, (e, doc) => {
			if(e)return res.send({error: `failed to update[${req.body.field}]`});
			req.session.user.client = doc;
			res.send({data: req.session.user.client});
		})
	},
	getNearBy: (req, res) => {
		let {client} = req.session.user;
		User.getPublicProfilesNearby(client._id, client.profile.city, client.profile.state, (e, docs) => {
			if(e)return res.send({error: 'failed'});
			res.send({data: docs});
		});
	}
}