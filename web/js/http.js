app.factory('http', function($rootScope){
	return {
		post: function(url, data, cb = function(){}){
	        if(typeof data === 'function'){
	            cb = data;
	            data = this.fd({});
	        }
		    return fetch(url, {
		        method: 'post',
		        body: data,
		        credentials: "same-origin"
		    }).then((d) => d.json()).then((data) => {
		    	cb(data);
		    	$rootScope.$apply();
		    });
		},
	    get: function(url, cb = function(){}) {
	        return fetch(url, {
	            method: 'get',
	            credentials: 'same-origin'
	        }).then(d => d.json()).then((data) => {
	            cb(data);
	            $rootScope.$apply();
	        });
	    },
		fd: function (data){
			let formd = new FormData();
			for(let i in data){
				formd.append(i, data[i]);
			}
			return formd;
		}
	}
})