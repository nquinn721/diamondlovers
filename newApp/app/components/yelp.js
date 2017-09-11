
const details = {
    client_id: 'D6he_zcS5JLU6LXIKm3e2w',
    client_secret: 'Yx2ewb9NcEP83tjKGdf6KeEPCvF8xg5b7MWSnmSia1nuVP6mJC0sqEBkVtCkkGk2',
    grant_type: 'client_credentials'
};
const headers = {
    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
}


let formBody = [];
for (let property in details) {
    let encodedKey = encodeURIComponent(property);
    let encodedValue = encodeURIComponent(details[property]);
    formBody.push(encodedKey + "=" + encodedValue);
}
formBody = formBody.join("&");
let accessToken;
let availableSearchParams = {
    term: true,
    radius: false,
    categories: true,
    price: true,
    limit: true
};

export default class YelpAPI{
    
   

    static search(term, cb){
        if(!accessToken){
            this.authorization(() => this.requestYelp(term, cb));
        }else{
            this.requestYelp(term, cb);
        }
    }

    static authorization (cb) {
        fetch('https://api.yelp.com/oauth2/token', {
            method: 'POST',
            headers: headers,
            body: formBody
        }).then((res) => res.json())
            .then(body => {
                accessToken = body.access_token;
                cb()
            });
    }


    static requestYelp(params, cb){
        let lat = params.lat || 39.9826142; //pos.coords.latitude;
        let lng = params.lng || -83.2710139; //pos.coords.longitude;
        let paramString = 'latitude=' + lat + '&longitude=' + lng;

        if(typeof params == 'object'){
            for(let i in params) {
                if (availableSearchParams[i]) {
                    if(i === 'radius')
                        params[i] = Math.round(params[i] * 1609.34);

                    paramString += '&' + i + '=' + params[i];
                }
            }
        }
        paramString += `&limit=3`;

        if(!params.term)
            paramString += '&term=restuarants';
        console.log(paramString);
        fetch('https://api.yelp.com/v3/businesses/search?' + paramString, {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + accessToken
            },
            // parameters: 'latitude=' + lat + '&longitude=' + lng
        })
            .then(d => d.json())
            .then(d => {
                cb(d.businesses)
            })
            .catch(e => console.error(e))

    }



}