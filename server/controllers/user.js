module.exports = {
	updateProfileField: (req, res) => {
		User.updateProfile(req.session.user.client._id, req.body, (e, doc) => {
			if(e)return res.send({error: `failed to update[${req.body.field}]`});
			req.session.user.client = doc;
			res.send({data: req.session.user.client});
		})
	},
	getNearBy: (req, res) => {
		let {client} = req.session.user;
		User.getPublicProfilesNearby(client._id, client.profile, (e, docs) => {
			if(e)return res.send({error: 'failed'});
			res.send({data: docs});
		});
	}
}