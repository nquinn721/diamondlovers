import Service from './service';
let url;

export const addCard = (token) => {
	return (dispatch) => {
		postToCard(dispatch, 'card/add-card', {
			init: 'ADD_CARD',
			success: 'ADD_CARD_SUCCESS',
			error: 'ADD_CARD_FAILED'
		});	
	}
}

export const setDefaultCard = (cardId) => {
	return (dispatch) => {
		postToCard(dispatch, 'card/set-default-card', {
			init: 'SET_DEFAULT_CARD',
			success: 'SET_DEFAULT_CARD_SUCCESS',
			error: 'SET_DEFAULT_CARD_FAILED'
		});
	}
}

export const deleteCard = (cardId) => {
	return (dispatch) => {
		postToCard(dispatch, 'card/delete-card', {
			init: 'DELETE_CARD',
			success: 'DELETE_CARD_SUCCESS',
			error: 'DELETE_CARD_FAILED'
		});
	}
}

export const chargeCard = (cardId, amount) => {
	return (dispatch) => {
		postToCard(dispatch, 'card/charge-card', {
			init: 'CHARGE_CARD',
			success: 'CHARGE_CARD_SUCCESS',
			error: 'CHARGE_CARD_FAILED'
		});
	}
}

const postToCard = (dispatch, url, types) => {
	dispatch({tyep: types.init});
	Service.post(url)
		.then(data => user.error ? dispatch({type: 'not found'}) : dispatch({type: types.success, data}))		
		.catch(err => dispatch({type: types.error, err}));

};

