app.controller('users', function(http) {
	this.currentUser;
	this.users;

    
    this.updateUsers = function() {
    	http.post('/admin/get-all-users', (users) => {
	    	this.users = users
			this.currentUser = users[0];    	
	    });
    }

    this.uploadIamge = function() {
    	console.log('uploading');
    	
    	http.post('/admin/upload-image-for-user/' + this.currentUser.email, new FormData(document.querySelector('.upload')), (user) => {
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