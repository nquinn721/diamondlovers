import {Dimensions} from 'react-native';

const window = Dimensions.get('window');
export default class Settings{
    static baseUrl = 'http://dlove.herokuapp.com/';
    static defaultView = 'home';
    static w = window.width;
    static h = window.height;
    static stripeApiKey = 'pk_test_SxLXrzbxiAiTwnt8qiOW1agS';
}