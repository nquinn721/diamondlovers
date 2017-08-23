module.exports = {
	update: (req, res) => {
		if(!req.body.field || !req.body.value)return res.send({error: 'No field or value specified'});
		User.updateProfile(req.session.user.client.email, req.body.field, req.body.value, (e, doc) => {
			if(e)return res.send({error: `failed to update[${req.body.field}]`});
			req.session.user.client = doc;
			res.send(doc.client());
		})
	},
	getNearBy: (req, res) => {
		User.getPublicProfilesNearby(req.session.user.client.email, (e, docs) => {
			res.send(docs);
		});
	}
}