app.factory('http', function($rootScope){
	return {
		post: function(url, data, cb = function(){}, headers){
	        if(typeof data === 'function'){
	            cb = data;
	            data = this.fd({});
	        }
	        let body = {
		        method: 'post',
		        body: data,
		        credentials: "same-origin",
		    }

		    if(headers)
			    body.headers = headers;

		    return fetch(url, body).then((d) => d.json()).then((data) => {
		    	this.updateUser(data, cb);
		    	$rootScope.$apply();
		    });
		},
		postJSON: function(url, data, cb = function(){}) {
			this.post(url, JSON.stringify(data), cb, {'Content-Type': 'application/json'});
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