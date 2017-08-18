const app = angular.module('app', []);

app.controller('main', function($scope){
    this.isLoggedIn = false;
    this.username = 'jon@snow.com';
    this.password = 'jon123';


    this.login = function(){
    	console.log('Logging in');
		this.post('/db/login', new FormData(document.querySelector('.login')), (user) => {
			console.log('Logged in', user);
			this.user = user.client;
			this.isLoggedIn = true;
	    });
    }

    this.uploadImage = function(form) {
    	this.post('/image/profile-image-upload', new FormData(document.querySelector('.upload')), (user) => {
    		console.log(user);
			this.user = user.client;
	    });
    }
    this.deleteAllImages = function() {
    	this.post('/admin/delete-all-images');
    }
    this.makeImageDefault = function(image){
    	delete image.$$hashKey;
    	this.post('/image/make-image-default', fd(image), (user) => {
    		this.user = user.client;
    		console.log(user);
    	})
    }
    this.deleteImage = function(image) {
    	this.post('/image/delete-image', fd(image), (user) => {
    		this.user = user.client;
    	});
    }

    this.post = function(url, data, cb = function(){}){
    	console.log('post');
	    return fetch(url, {
	        method: 'post',
	        body: data,
	        credentials: "same-origin"
	    }).then((d) => d.json()).then((data) => {
	    	cb(data);
	    	$scope.$apply();
	    });
	}
	function fd(data){
		let formd = new FormData();
		for(let i in data){
			formd.append(i, data[i]);
		}
		return formd;
	}

	this.register = function() {
		this.post('/db/register', new FormData(document.querySelector('.register'))).then(d => console.log('register', d));
	}
    this.login();

});
