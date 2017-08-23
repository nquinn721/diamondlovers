module.exports = {
	test: function(req, res) {
		res.send({name: 'nate'});
	},
	loggedIn: function(req, res) {
		res.send('not logged in');
	},
	admin: function (req, res) {
		res.send({msg: 'you are admin'});
	}
}