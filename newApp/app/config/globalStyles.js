import { StyleSheet } from 'react-native';
import {Dimensions} from 'react-native';
const window = Dimensions.get('window');
const styles = StyleSheet.create({
	button: {
		backgroundColor: '#3498db',
		padding:10
	},
	button1: {
		backgroundColor: '#e74c3c',
		padding: 10
	},
	padding: {
		padding: 10
	},
	buttonText: {
		color: 'white'
	},
	container: {
	    flex: 1
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
		flexDirection: 'row'
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
const defaultColor = '#ed3671';
export const defaults = {
	color: defaultColor,
	borderRadius: 20,
	red: '#ed4d46',
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
	  }
}