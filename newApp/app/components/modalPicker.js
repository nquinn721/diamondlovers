import React from 'react';
import {StyleSheet, View, Image, Text, TouchableOpacity, Dimensions} from 'react-native';
import Splash from './splash';
const window = Dimensions.get('window');



export default class CircleImage extends React.Component{
	state = {num: 1};
	showPicker(props){
		console.log('showing splash');
		
		return (
			<Splash
        	style={{height: 300}}
         	content={() => {
            	return (
					<View style={styles.list}>
						{
							props.data &&
							props.data.forEach((value, index) => {
								return (
									<TouchableOpacity style={styles.item} onPress={() => this.setState({value, showingPicker: false})} key={index}>
										<Text>{value.label}</Text>
									</TouchableOpacity>
								)
							})
						}
						<TouchableOpacity onPress={() => this.setState({showingPicker: false})}>
							<Text>Cancel</Text>
						</TouchableOpacity>
					</View>
			       )
	         }}
	       />
		)
	}
	render(){
		console.log('render modal picker', this.state.num++);
		
		let props = this.props;
		return (
			<Splash></Splash>
		)
	}
}




const styles = StyleSheet.create({
	list: {
		height: window.height * 2/3,
		width: window.width - 30,
		backgroundColor: 'white'
	},
	item: {
		borderBottomWidth: 1,
		borderBottomColor: '#aaa'
	}
});
