app.controller('users', function(http) {
	this.currentUser;
	this.users;
    this.userStatus = ['new', 'flagged', 'public'];
    this.update = {};

    
    this.updateUsers = function() {
    	http.post('/admin/get-all-users', (users) => {
	    	this.users = users
			this.currentUser = users[0];
            this.update.status = this.currentUser.profile.status;
	    });
    }

    this.updateUser = function() {
        console.log(this.update);
    }

    this.getImagesForUser = function() {
        http.get('/admin/get-images-for-user/' + this.currentUser._id, (images) => {
            this.currentUser.images = images;
        })
    }
    this.updateCurrentUser = function() {
        this.getImagesForUser();
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

    this.makeImageDefault = function() {
    	
    }
    this.updateUsers();
})