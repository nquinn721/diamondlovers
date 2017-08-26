app.factory('http', function($rootScope){
	return {
		post: function(url, data, cb = function(){}){
	        if(typeof data === 'function'){
	            cb = data;
	            data = this.fd({});
	        }
	        console.log('post', data);
	        
		    return fetch(url, {
		        method: 'post',
		        body: data,
		        credentials: "same-origin"
		    }).then((d) => d.json()).then((data) => {
		    	this.updateUser(data, cb);
		    	$rootScope.$apply();
		    });
		},
	    get: function(url, cb = function(){}) {
	        return fetch(url, {
	            method: 'get',
	            credentials: 'same-origin'
	        }).then(d => d.json()).then((data) => {
	            this.updateUser(data, cb);
	            $rootScope.$apply();
	        });
	    },
	    updateUser: function(user, cb) {
	    	console.log('http', user);
	        if(user.error)return console.error(user.error);
	        cb(user);
	    },
		fd: function (data){
			return Object.toFormData(data);
			// let formd = new FormData();
			// for(let i in data){
			// 	formd.append(i, data[i]);
			// }
			// return formd;
		}
	}
})