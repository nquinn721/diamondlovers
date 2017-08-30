import Service from './service';

export const addCard = (token) => {
	return (dispatch) => {
		postToCard(dispatch, 'card/add-card', {token}, {
			init: 'ADD_CARD',
			success: 'ADD_CARD_SUCCESS',
			error: 'ADD_CARD_FAILED'
		});	
	}
}

export const setDefaultCard = (card) => {
	return (dispatch) => {
		postToCard(dispatch, 'card/set-default-card', {card}, {
			init: 'SET_DEFAULT_CARD',
			success: 'SET_DEFAULT_CARD_SUCCESS',
			error: 'SET_DEFAULT_CARD_FAILED'
		});
	}
}

export const deleteCard = (card) => {
	return (dispatch) => {
		postToCard(dispatch, 'card/delete-card', {card}, {
			init: 'DELETE_CARD',
			success: 'DELETE_CARD_SUCCESS',
			error: 'DELETE_CARD_FAILED'
		});
	}
}

export const chargeCard = (card, amount) => {
	return (dispatch) => {
		postToCard(dispatch, 'card/charge-card', {card, amount}, {
			init: 'CHARGE_CARD',
			success: 'CHARGE_CARD_SUCCESS',
			error: 'CHARGE_CARD_FAILED'
		});
	}
}

const postToCard = (dispatch, url, data, types) => {
	console.log('oijwefoiewjfioj', data);
	
	dispatch({type: types.init});
	// Service.post(url)
	// 	.then(data => {
	// 		console.log('POST TO CARD', data);
			
	// 			data.error ? 
	// 				dispatch({type: types.error, err}) : 
	// 				dispatch({type: types.success, data})
	// 		})

};

