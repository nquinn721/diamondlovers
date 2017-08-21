const fs = require('fs');
const recursive = require('recursive-readdir');

module.exports = {
	index: function(req, res){
        recursive('server/images', function (err, files) {
            res.render('index', {dirs: files || []});
        });
    }
}