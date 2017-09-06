app.controller('users', function(http, $timeout) {
	this.currentUser;
	this.users;
    this.userStatus = ['new', 'flagged', 'public'];
    this.update = {};
    this.updateStyle = false;

    
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
    	this.updateStyle = true;
    	fetch('/admin/update-user', {
    		method: 'post',
    		headers: {
		      'Accept': 'application/json',
		      'Content-Type': 'application/json'
		    },
		    body: JSON.stringify(user),
		    credentials: 'same-origin'
		    }).then(d => d.json()).then((user) => {
    		this.currentUser = user.data;
            $timeout(() => {
                this.updateStyle = false;
            }, 1000);
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
    this.handleUserUpdate = function(user){
        console.log(user);
        if(user.data){
            user = user.data;
            this.currentUser = user;
            this.users.forEach(u => u.email === user.email ? u = user : null);
        }
    }
    this.uploadIamge = function() {
    	http.post('/admin/upload-image-for-user/' + this.currentUser._id, new FormData(document.querySelector('.upload')), (user) => {
    		this.handleUserUpdate(user);
	    });
    }

    this.deleteImage = function(public_id) {
    	http.postJSON('/admin/delete-image-for-user/' + this.currentUser._id, {public_id}, (user) => {
            this.handleUserUpdate(user);
        });
    }

    this.makeImageDefault = function(imageId) {
    	http.post('/admin/update-user-profile', http.fd({_id: this.currentUser._id, field: 'defaultImage', value: imageId}), (user) => {
            this.handleUserUpdate(user);
        });
    }
    this.updateUsers();
})