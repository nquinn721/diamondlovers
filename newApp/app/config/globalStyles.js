import { StyleSheet } from 'react-native';
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