import {Dimensions} from 'react-native';

const window = Dimensions.get('window');
export default class Settings{
    static baseUrl = 'http://diamondlovers.herokuapp.com/';
    static defaultView = 'home';
    static w = window.width;
    static h = window.height;
}