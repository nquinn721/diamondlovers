module.exports = {
	updateProfileField: (req, res) => {
		if(!req.body.field || typeof req.body.value === 'undefined')return res.send({error: 'No field or value specified'});
		User.updateProfile(req.session.user.client._id, req.body.field, req.body.value, (e, doc) => {
			if(e)return res.send({error: `failed to update[${req.body.field}]`});
			req.session.user.client = doc;
			res.send({data: req.session.user.client});
		})
	},
	getNearBy: (req, res) => {
		User.getPublicProfilesNearby(req.session.user.client._id, (e, docs) => {
			if(e)return res.send({error: 'failed'});
			res.send({data: docs});
		});
	}
}