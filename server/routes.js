module.exports = {
    /**
     * WEB
     */
    '/': {
        type: 'get',
        method: 'web.index'
    },
    /**
     * END WEB
     */

    /**
     * DB
     */
    'db/register': {
        type: 'post',
        middleWare: ['formidable'],
        method: 'db.register'
    },
    'db/login': {
        type: 'post',
        middleWare: ['formidable'],
        method: 'db.login'
    },

    /**
     * END DB
     */

    /**
     * IMAGE
     */

    'image/profile-image-upload' : {
        type: 'post',
        middleWare: ['loggedIn'],
        method: 'image.profileImageUpload'
    },

    'image/make-image-default' : {
        type: 'post',
        middleWare: ['loggedIn', 'formidable'],
        method: 'image.makeImageDefault'
    },

    'image/delete-image' : {
        type: 'post',
        middleWare: ['loggedIn', 'formidable'],
        method: 'image.deleteImage'
    },

    /**
     * END IMAGE
     */

    

    /**
     * CARD
     */
    'card/add-card' : {
        type: 'post',
        middleWare: ['loggedIn', 'formidable'],
        method: 'card.addCard'
    }, 
    // {card: cardID}
    'card/remove-card' : {
        type: 'post',
        middleWare: ['loggedIn', 'formidable'],
        method: 'card.removeCard'
    }, 
    // {card: cardID}
    'card/update-default-card' : {
        type: 'post',
        middleWare: ['loggedIn', 'formidable'],
        method: 'card.updateDefaultCard'
    }, 
    // {card: cardID} optional
    'card/charge-card' : {
        type: 'post',
        middleWare: ['loggedIn', 'formidable'],
        method: 'card.chargeCard'
    }
    /**
     * END CARD
     */



     /**
     * ADMIN
     */

    /**
     * END ADMIN
     */ 
}