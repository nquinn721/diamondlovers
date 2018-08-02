import React from 'react';
import {Platform, StyleSheet, View, Image} from 'react-native';



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
	  	image: {}
	};
} else {
	obj = {
		image: {
			borderRadius: 100
		}
	}
}

obj.imageContainer = {
	borderRadius: 100,
	overflow: 'hidden'
}

const styles = StyleSheet.create(obj);
