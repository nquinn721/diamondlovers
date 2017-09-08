import React from 'react';
import { Text, View, StyleSheet, ActivityIndicator, ScrollView, Animated } from 'react-native';
import Config from 'newApp/app/config/config';
import Image from 'react-native-image-progress';

const avatar = require('newApp/app/assets/img/avatar.png');
const FIXED_BAR_WIDTH = 100
const BAR_SPACE = 10

export default class Carousel extends React.Component {
	constructor(props){
		super();
		this.numItems = props.images.length;
		this.itemWidth = (FIXED_BAR_WIDTH / this.numItems) - (BAR_SPACE);
	  this.animVal = new Animated.Value(0);
    if(this.numItems === 1)
      this.itemWidth = FIXED_BAR_WIDTH / 2;
	}



	renderImages(imgs){
	    let images = [];
	    if(!imgs.length)return <Image source={avatar} style={this.props.imageSize}/>;
	    
	    for(let i = 0; i < imgs.length; i++)
	      images.push(<Image key={i} style={this.props.imageStyle} source={{uri: imgs[i].url}} />)
	    return images;
  	}

  renderImageBars(imgs){
    return imgs.map((image, i) => {

      let scrollBarVal = this.animVal.interpolate({
          inputRange: [Config.w * (i - 1), Config.w * (i + 1)],
          outputRange: [-this.itemWidth, this.itemWidth],
          extrapolate: 'clamp',
        })

      let bar = (
          <View
            key={`bar${i}`}
            style={[
              styles.track,
              {
                width: this.itemWidth,
                marginLeft: i === 0 ? 0 : BAR_SPACE,
              },
            ]}
          >
            <Animated.View

              style={[
                styles.bar,
                {
                  width: this.itemWidth,
                  transform: [
                    { translateX: scrollBarVal },
                  ],
                },
              ]}
            />
          </View>
        )
      return bar;
    });
  }
	render(){

		return (
			<View style={styles.container}>
				<ScrollView
	              horizontal
	              showsHorizontalScrollIndicator={false} 
	              scrollEventThrottle={10} 
	              pagingEnabled
	              style={styles.container}
	              onScroll={            
	                Animated.event(
	                  [{ nativeEvent: { contentOffset: { x: this.animVal } } }]               
	                )          
	              }
	            >
	            	{this.renderImages(this.props.images || [])}
	            </ScrollView>
	            <View style={styles.barContainer} >
	          		{this.renderImageBars(this.props.images || [])}
	          	</View>
	        </View>
		)
	}
}

const styles = StyleSheet.create({
  barContainer: {
    position: 'absolute',
    zIndex: 2,
    bottom: 10,
    width: Config.w,
    justifyContent: 'center',
    flexDirection: 'row',
  },
  track: {
    backgroundColor: '#ccc',
    overflow: 'hidden',
    height: 3,
    borderRadius: 10
  },
  bar: {
    backgroundColor: '#2980b9',
    height: 3,
    position: 'absolute',
    left: 0,
    top: 0,
  }
})
