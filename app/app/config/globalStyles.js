import { StyleSheet } from 'react-native';
import {Dimensions} from 'react-native';
const window = Dimensions.get('window');
const defaultColor = '#ed3671';
const styles = StyleSheet.create({
	padding: {
		padding: 10
	},
	buttonText: {
		color: 'white'
	},
	container: {
	    flex: 1
	},
	hr: {
		height: 1,
		backgroundColor: '#aaa'
	},
	containerCenter: {
	    justifyContent: 'center', 
		alignItems: 'center',
		flex: 1
	},
	smallText: {
		fontSize: 12,
		color: '#999'
	},
	center: {
	    alignItems: 'center',
	    justifyContent: 'center'
	},
	row: {
		flexDirection: 'row',
		alignItems: 'center'
	},
	group: {
		flexDirection: 'row',
		alignItems: 'center'
	},
	paragraph: {
		paddingTop:10,
		paddingBottom:10
	},
	textCenter: {
	    textAlign: 'center'
	}
});
export default styles;
export const defaults = {
	color: defaultColor,
	borderRadius: 20,
	red: '#ed4d46',
	green: '#6dbf02',
	iconWidth: 26,
	iconHeight: 25,
	height: window.height,
	width: window.width,
	availableHeight: window.height - 128,
	defaultButton: {
	  	backgroundColor: defaultColor,
	  	borderRadius: 30,
	  	padding: 15,
	  	alignItems: 'center',
	  	justifyContent: 'center'
	},
	buttonBottom : {
		flex: 1, 
		justifyContent: 'flex-end', 
		paddingBottom : 15
	},

	capitalize: function(str){
	    if(!str)return;
	    return str.substr(0,1).toUpperCase() + str.substr(1)
	}
}