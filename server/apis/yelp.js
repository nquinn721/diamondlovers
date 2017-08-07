var fetch = require('node-fetch');

var details = {
    client_id: 'D6he_zcS5JLU6LXIKm3e2w',
    client_secret: 'Yx2ewb9NcEP83tjKGdf6KeEPCvF8xg5b7MWSnmSia1nuVP6mJC0sqEBkVtCkkGk2',
    grant_type: 'client_credentials'
};
var headers = {
    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
}


var formBody = [];
for (var property in details) {
    var encodedKey = encodeURIComponent(property);
    var encodedValue = encodeURIComponent(details[property]);
    formBody.push(encodedKey + "=" + encodedValue);
}
formBody = formBody.join("&");

function YelpAPI(){
    this.accessToken;
    this.availableSearchParams = {
        term: true,
        radius: false,
        categories: true,
        price: true,
        limit: true
    };
}
YelpAPI.prototype = {
   

    search: function(term, cb){
        if(!this.accessToken){
            this.authorization(() => this.initSearch(term, cb));
        }else{
            this.requestYelp(term, cb);
        }
    },

    authorization: function (cb) {
        fetch('https://api.yelp.com/oauth2/token', {
            method: 'POST',
            headers: headers,
            body: formBody
        }).then((res) => res.json())
            .then(body => this.accessToken = body.access_token && cb());
    },


    requestYelp: function(params, pos, cb){
        let lat = 39.9826142; //pos.coords.latitude;
        let lng = -83.2710139; //pos.coords.longitude;
        let paramString = 'latitude=' + lat + '&longitude=' + lng;

        if(typeof params == 'object'){
            for(var i in params) {
                if (this.availableSearchParams[i]) {
                    if(i === 'radius')
                        params[i] = Math.round(params[i] * 1609.34);

                    paramString += '&' + i + '=' + params[i];
                }
            }
        }else{
            paramString += '&term=' + params;
        }
        // console.log(params)
        console.log(paramString);


        fetch('https://api.yelp.com/v3/businesses/search?' + paramString, {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + this.accessToken
            },
            // parameters: 'latitude=' + lat + '&longitude=' + lng
        })
            .then(d => d.json())
            .then(d => {
                // console.log(d);
                cb(d.businesses.map(v => new Item(v)))
            })
            .catch(e => console.error(e))

    }



}
var yelpAPI = new YelpAPI;

yelpAPI.search('restaurants', (data) => console.log(data));
