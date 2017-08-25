const app = angular.module('app', ['ngRoute']);

app.controller('main', function($scope, http){
    this.isLoggedIn = false;
    this.email = 'natethepcspecialist@gmail.com';
    this.password = 'nate123';
    this.cardNumber = 4242424242424242;
	this.exp_year = 25;
	this.exp_month = 05;
	this.cvc = 123;
    this.users = [];


    this.login = function(){
		http.post('/db/login', http.fd({email: this.email, password: this.password}), (user) => {
            this.handleUser(user);

            http.get('/profile/get-nearby', (profiles) => {
                console.log('profiles');
                console.log(profiles);
            })
	    });
    }
    this.handleUser = function(user) {
        this.user = user.client;
        this.images = user.images;
        this.isLoggedIn = true;
        this.stripeCust = user.stripeCust;
    }

    this.updateUser = function(field, value) {
        http.post('/profile/update', http.fd({field, value}), (user) => {
            this.handleUser(user);
        });
    }

    this.uploadImage = function(form) {
    	http.post('/image/profile-image-upload', new FormData(document.querySelector('.upload')), (user) => {
			this.handleUser(user);
	    });
    }
    this.deleteAllImages = function() {
    	http.post('/admin/delete-all-images');
    }
    this.makeImageDefault = function(image){
    	delete image.$$hashKey;
    	http.post('/image/make-image-default', http.fd(image), this.handleUser.bind(this));
    }
    this.deleteImage = function(image) {
    	http.post('/image/delete-image', http.fd(image), (user) => {
            console.log(user);
            if(user.client){
        		this.user = user.client;
        		this.stripeCust = user.stripeCust;
            }
    	});
    }


    this.addCard = function() {
    	let card = {number: this.cardNumber, exp_month: this.exp_month, exp_year: this.exp_year, cvc: this.cvc};
    	http.post('/card/add-card', http.fd(card), (user) => {
    		this.user = user.client;	
    		this.stripeCust = user.stripeCust;
    	})
    }

    this.deleteCard = function(card) {
    	http.post('/card/remove-card', http.fd({card}), (user) => {
    		console.log(user);
    		this.user = user.client;
    		this.stripeCust = user.stripeCust;
    	});
    }
    this.makeCardDefault = function(card) {
    	console.log('make default card');
    	http.post('/card/update-default-card', http.fd({card}), (user) => {
    		console.log(user);
    		this.user = user.client;
    		this.stripeCust = user.stripeCust;
    	})
    }

    

	this.register = function() {
		http.post('/db/register', new FormData(document.querySelector('.register')), d => console.log('register', d));
	}
    this.login();

});
