export const YelpSearch = function(searchData) {
	return (dispatch) => {
		Service.dispatchPost(dispatch, 'yelp/search', searchData, {
			init: 'GET_YELP',
			success: 'GET_YELP_SUCCESS',
			error: 'GET_YELP_FAILED'
		});	
	}
}