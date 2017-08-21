const app = angular.module('app', []);

app.controller('main', function($scope){
    this.isLoggedIn = false;
    this.username = 'jon@snow.com';
    this.password = 'jon123';
    this.cardNumber = 4242424242424242;
	this.exp_year = 25;
	this.exp_month = 05;
	this.cvc = 123;


    this.login = function(){
    	console.log('Logging in');
		this.post('/db/login', new FormData(document.querySelector('.login')), (user) => {
			console.log('Logged in', user);
			this.user = user.client;
			this.isLoggedIn = true;
    		this.stripeCust = user.stripeCust;
	    });
    }

    this.uploadImage = function(form) {
    	this.post('/image/profile-image-upload', new FormData(document.querySelector('.upload')), (user) => {
    		console.log(user);
			this.user = user.client;
    		this.stripeCust = user.stripeCust;
	    });
    }
    this.deleteAllImages = function() {
    	this.post('/admin/delete-all-images');
    }
    this.makeImageDefault = function(image){
    	delete image.$$hashKey;
    	this.post('/image/make-image-default', fd(image), (user) => {
    		this.user = user.client;
    		this.stripeCust = user.stripeCust;
    	})
    }
    this.deleteImage = function(image) {
    	this.post('/image/delete-image', fd(image), (user) => {
    		this.user = user.client;
    		this.stripeCust = user.stripeCust;
    	});
    }


    this.addCard = function() {
    	let card = {number: this.cardNumber, exp_month: this.exp_month, exp_year: this.exp_year, cvc: this.cvc};
    	this.post('/card/add-card', fd(card), (user) => {
    		this.user = user.client;	
    		this.stripeCust = user.stripeCust;
    	})
    }

    this.deleteCard = function(card) {
    	this.post('/card/remove-card', fd({card}), (user) => {
    		console.log(user);
    		this.user = user.client;
    		this.stripeCust = user.stripeCust;
    	});
    }
    this.makeCardDefault = function(card) {
    	console.log('make default card');
    	this.post('/card/update-default-card', fd({card}), (user) => {
    		console.log(user);
    		this.user = user.client;
    		this.stripeCust = user.stripeCust;
    	})
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
