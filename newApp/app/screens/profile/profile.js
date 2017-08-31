import React from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Config from 'newApp/app/config/config';
import { Button } from 'react-native-elements';
import { getDefaultImage } from 'newApp/app/redux/actions/image';


class HomeScreen extends React.Component {
	displayUser({isFetching} = this.props.user, {user} = this.props.user){
    let page = [];
		user && page.push(<Text key='client'>{user.email}</Text>);

    return <View>{page}</View>
	}

  displayDefaultImage({user} = this.props.user, {images} = this.props.image){    
    if(!user || !images)return;
    console.log(user, images);
    
    let img = getDefaultImage(user.profile.defaultImage, this.props.image.images);
    
    return <Image source={{uri: img.url}} style={styles.profileImage} />   
  }
		
  render() {
    return (
      <View style={styles.container}>
        {this.displayDefaultImage()}
        {this.displayUser()}
        <Button 
          raised
          icon={{name: 'credit-card', size: 15}}
          buttonStyle={styles.profileButton}
          textStyle={{textAlign: 'center'}}
          title="Cards"
          onPress={() => this.props.navigation.navigate('Cards')}
        />
        <Button 
          raised
          icon={{name: 'image', size: 15}}
          buttonStyle={styles.profileButton}
          textStyle={{textAlign: 'center'}}
          title="Profile Images"
          onPress={() => this.props.navigation.navigate('Images')}
        />
        
      </View>
    )
  }

}

const styles = StyleSheet.create({
  profileButton:{
    backgroundColor: '#2980b9', 
    borderRadius: 5
  },
  profileImage: {
    width:Config.w,
    height:Config.h / 2
  }
})




export default connect(
  (state) => ({user: state.user, image: state.image}), 
  // (dispatch) => (bindActionCreators({userServiceCall, selectUser}, dispatch))
)(HomeScreen);