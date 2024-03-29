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
		User.getPublicProfilesNearby(client, client.profile, (e, data) => {
			if(e)return res.send({error: 'failed'});
			res.send({data});
		});
	},
	getUser: (req, res) => {
		let {id} = req.params;
		console.log('GET USER');
		console.log(id);

		
		User.getFullUser(id, (e, data) => {
			console.log('GOT FULL USER');
			console.log(data);
			
			
			if(e)return res.send({error: 'failed to get user'});
			res.send({data});
		});
	},
	updateSearchIndex: (req, res) => {
		let {client} = req.session.user;
		User.updateSearchIndex(client._id, (e, doc) => {
			User.getPublicProfilesNearby(doc, doc.profile, (e, data) => {
				if(e)return res.send({error: 'failed'});
				res.send({data});
			});
		});
	}
}