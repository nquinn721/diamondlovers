app.controller('users', function(http) {
	this.currentUser;
	this.users;
    this.userStatus = ['new', 'flagged', 'public'];
    this.update = {};

    
    this.updateUsers = function() {
    	http.post('/admin/get-all-users', (users) => {
	    	this.users = users.data
			this.currentUser = users.data[0];
            this.update.status = this.currentUser.profile.status;
            this.currentUserEmail = this.currentUser.email;
	    });
    }

    this.updateUser = function() {
    	let user = this.currentUser;
    	
    	fetch('/admin/update-user', {
    		method: 'post',
    		headers: {
		      'Accept': 'application/json',
		      'Content-Type': 'application/json'
		    },
		    body: JSON.stringify(user),
		    credentials: 'same-origin'
		    }).then(d => d.json()).then((user) => {
    		this.currentUser = user;
    	})
    }

    this.getImagesForUser = function() {
        http.get('/admin/get-images-for-user/' + this.currentUser._id, (images) => {
            this.currentUser.images = images;
        })
    }
    this.updateCurrentUser = function() {
        // this.getImagesForUser();
        this.currentUser = this.users.filter(u => u.email === this.currentUserEmail)[0];
    }
    this.uploadIamge = function() {
    	console.log('uploading');
    	
    	http.post('/admin/upload-image-for-user/' + this.currentUser._id, new FormData(document.querySelector('.upload')), (user) => {
    		if(user.email){
    			this.currentUser = user;
    			this.users.forEach(u => u.email === user.email ? u = user : null);
    		}
	    });
    }

    this.deleteImage = function() {
    	
    }

    this.makeImageDefault = function(imageId) {
    	http.post('/admin/update-user-profile', http.fd({_id: this.currentUser._id, field: 'defaultImage', value: imageId}), (user) => {
            console.log(user);
            // this.
        })
    }
    this.updateUsers();
})