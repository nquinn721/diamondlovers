const fs = require('fs');
const recursive = require('recursive-readdir');

module.exports = {
	index: (req, res) => {
        recursive('server/images', function (err, files) {
            res.render('index', {dirs: files || []});
        });
    },
    views: (req, res) => {
    	res.render(req.params.page);
    }
}