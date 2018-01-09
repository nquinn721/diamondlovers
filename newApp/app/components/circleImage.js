import React from 'react';
import {Platform, StyleSheet, View} from 'react-native';
import Image from 'react-native-image-progress';



export default class CircleImage extends React.Component{
	render(){
		let props = this.props;
		return (
			<View style={[props.container, styles.imageContainer]}>
		      <Image source={props.source} style={[props.imageStyle, styles.image, StyleSheet.absoluteFill]} />
		    </View>
		)
	}
}


let obj;
if(Platform.OS === 'ios'){
	obj = {
	  	imageContainer: {
	  		borderRadius: 100,
	  		overflow: 'hidden'
	  	},
	  	image: {}
	};
} else {
	obj = {
		imageContainer: {

		},
		image: {
			borderRadius: 100
		}
	}
}

const styles = StyleSheet.create(obj);
