import { NavigationActions } from 'react-navigation';
import { TabBar } from 'newApp/app/config/router';

const initialState = TabBar.router.getStateForAction(NavigationActions.init());

export default (state = initialState, action) => {
	const nextState = TabBar.router.getStateForAction(action, state);
	return nextState || state;
}