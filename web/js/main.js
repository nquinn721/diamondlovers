const app = angular.module('app', []);

app.controller('main', function($scope){
    this.isLoggedIn = false;
    this.email = 'natethepcspecialist@gmail.com';
    this.password = 'nate123';
    this.cardNumber = 4242424242424242;
	this.exp_year = 25;
	this.exp_month = 05;
	this.cvc = 123;
    this.users = [];


    this.login = function(){
		this.post('/db/login', fd({email: this.email, password: this.password}), (user) => {
			console.log('Logged in', user);
			this.user = user.client;
			this.isLoggedIn = true;
    		this.stripeCust = user.stripeCust;

            this.post('/admin/get-all-users', (users) => this.users = users);
            this.get('/profile/get-nearby', (profiles) => {
                console.log('profiles');
                console.log(profiles);
            })
	    });
    }

    this.updateUser = function(field, value) {
        this.post('/profile/update', fd({field, value}), (user) => {
            console.log('update', user);
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
        if(typeof data === 'function'){
            cb = data;
            data = fd({});
        }
	    return fetch(url, {
	        method: 'post',
	        body: data,
	        credentials: "same-origin"
	    }).then((d) => d.json()).then((data) => {
	    	cb(data);
	    	$scope.$apply();
	    });
	}
    this.get = function(url, cb = function(){}) {
        return fetch(url, {
            method: 'get',
            credentials: 'same-origin'
        }).then(d => d.json()).then((data) => {
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
		this.post('/db/register', new FormData(document.querySelector('.register')), d => console.log('register', d));
	}
    this.login();

});
