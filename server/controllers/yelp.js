const Yelp = require('../apis/yelp');
module.exports = {
	search: function(req, res) {
		console.log(req.body);
		Yelp.search(req.body, function(data) {
			console.log(data);
			res.send('hi');
		});
	}
}