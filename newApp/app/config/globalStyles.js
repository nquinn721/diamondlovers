import { StyleSheet } from 'react-native';
const styles = StyleSheet.create({
	button: {
		backgroundColor: '#3498db',
		padding:10
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
		color: '#aaa'
	},
	center: {
	    alignItems: 'center',
	    justifyContent: 'center',
	    textAlign: 'center'
	}
});
export default styles;