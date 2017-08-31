import React from 'react';
import { Text, View, StyleSheet, Alert, ActivityIndicator, TouchableHighlight, Image } from 'react-native';
import { bindActionCreators } from 'redux';
import { ImagePicker, BlurView } from 'expo';
import { connect } from 'react-redux';
import Config from 'newApp/app/config/config';
import gStyles from 'newApp/app/config/globalStyles';
import { addImage, deleteImage, setDefaultImage } from 'newApp/app/redux/actions/image';

class CardsScreen extends React.Component {
  state = {images: {}};
  setDefaultImage(image){
  }
  async addImage(index){
    let result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        aspect: [4, 3]
    });

    if (!result.cancelled) {

        this.props.addImage(result.uri, index === 0);
        let images = Object.assign({['image' + index]: result.uri});
        this.setState({images});
    }
  }

  deleteImage(image){
    Alert.alert(
      'Delete Image',
      `Are you sure you want to delete this image?`,
      [
        {text: 'Cancel', style: 'cancel'},
        {text: 'OK', onPress: () => {
          this.state.imageBeingDeleted = image.id;
          this.props.deleteImage(image.public_id);
        }},
      ],
      { cancelable: true }
    )
  }
  isDefaultImage(imageId){
    return imageId === this.state.defaultImage ? styles.defaultImage : styles.image;
    
  }
  
  renderImages({images} = this.props.image){
    let imgs = []
    let di = this.state.defaultImage;
    if(di && images){
      di = di.toString();
       images.forEach(img => img._id.toString() === di ? imgs.unshift(img) : imgs.push(img))
    }

    console.log(imgs, di);
    
    
    if(imgs){
      return [1,2,3,4].map((card, i) => {
        let image = imgs[i],
            stateImage = this.state.images['image' + i];
            
        
        return (
          <View key={i} style={(i === 0 ? styles.defaultImageContainer : styles.imageContainer)}>
            {
              image ?
                <View style={StyleSheet.absoluteFill} >
                  <Image source={{uri: image.url}} style={StyleSheet.absoluteFill} />
                  <TouchableHighlight onPress={this.deleteImage.bind(this, image)}style={styles.deleteImage}>
                    <Text style={styles.deleteImageText}>-</Text>
                  </TouchableHighlight>
                </View> :
              stateImage && this.props.image.addingImage ? 
                <View style={StyleSheet.absoluteFill} >
                  <Image source={{uri: stateImage}} style={StyleSheet.absoluteFill}  />
                  <BlurView
                    tint="light"
                    intensity={50}
                    style={StyleSheet.absoluteFill}
                  />
                  <ActivityIndicator style={StyleSheet.absoluteFill}/>
                </View> :

                <TouchableHighlight 
                  onPress={this.addImage.bind(this, i)} 
                  style={[StyleSheet.absoluteFill, styles.noImageContainer]}>
                    <Text style={styles.addImage}>+</Text>
                </TouchableHighlight>
            }
            </View>
        );  
      });
      
    }
  }
 
  render() {
    this.state.defaultImage = this.props.user.user.profile.defaultImage;

    return (
      <View style={styles.container}>
				<View style={styles.imagesContainer}>{this.renderImages()}</View>
        <Text style={[gStyles.smallText, gStyles.center]}>Press the card icon to set default card.</Text>

      </View>
    )
  }

}
const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  defaultImageContainer:{
    width: Config.w - 20,
    height: Config.h / 2,
    marginTop: 5,
    marginBottom: 10
  },
  deleteImage: {
    backgroundColor: '#e74c3c',
    width: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: -5,
    marginLeft: -5,
    borderRadius: 100
  },
  deleteImageText: {
    color: 'white',
    fontSize: 18
  },
  imageContainer:{
    width: Config.w * (1/3) - 15,
    height: Config.h / 6,
  },
  noImageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#444'
  },
  imagesContainer: {
    justifyContent: 'space-around',
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 5
  },
  addImage: {
    fontSize: 45,
    color: 'white'
  }
  
})




export default connect(
  (state) => ({image: state.image, user: state.user}), 
  (dispatch) => (bindActionCreators({addImage, deleteImage, setDefaultImage}, dispatch))
)(CardsScreen);