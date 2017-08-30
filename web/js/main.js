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
		http.postJSON('/db/login', ({email: this.email, password: this.password}), (user) => {
            this.handleUser(user);
            http.get('/admin/get-full-user', user => {
                this.user = user;
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
        http.postJSON('/user/update-profile-field', ({field, value}), (user) => {
            this.handleUser(user);
        });
    }
    this.updateModel = function(field, value) {
        http.postJSON('/admin/update-model', {field, value: value || ''}, (user) => {
            this.user = user;
        })
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
    	http.postJSON('/image/make-image-default', (image), this.handleUser.bind(this));
    }
    this.deleteImage = function(image) {
    	http.postJSON('/image/delete-image', (image), (user) => {
            console.log(user);
            if(user.client){
        		this.user = user.client;
        		this.stripeCust = user.stripeCust;
            }
    	});
    }


    this.addCard = function() {
    	let card = {number: this.cardNumber, exp_month: this.exp_month, exp_year: this.exp_year, cvc: this.cvc};
    	http.postJSON('/card/add-card', (card), (user) => {
    		this.user = user.client;	
    		this.stripeCust = user.stripeCust;
    	})
    }

    this.deleteCard = function(card) {
    	http.postJSON('/card/remove-card', ({card}), (user) => {
    		console.log(user);
    		this.user = user.client;
    		this.stripeCust = user.stripeCust;
    	});
    }
    this.makeCardDefault = function(card) {
    	console.log('make default card');
    	http.postJSON('/card/update-default-card', ({card}), (user) => {
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
