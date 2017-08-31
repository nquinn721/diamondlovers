import {Dimensions} from 'react-native';
const window = Dimensions.get('window');

export default {
	baseUrl: 'http://dlovers.herokuapp.com/',
	stripeApiKey: 'pk_test_SxLXrzbxiAiTwnt8qiOW1agS',
	h: window.height,
	w: window.width 
}