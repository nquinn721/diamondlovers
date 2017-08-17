import React from 'react';
import { StyleSheet, Text, View, Image, Button, ScrollView, TouchableOpacity, CameraRoll} from 'react-native';
import { ImagePicker } from 'expo';
import Service from 'app/app/components/service';
import Settings from 'app/app/components/settings';
import User from 'app/app/components/user';

export default class ProfileImages extends React.Component{
    state = {image : ''};

    pickImage = async (i) => {
        let result = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            aspect: [4, 3]
        });

        if (!result.cancelled) {
            Service.uploadImage(result.uri, () => this.setState({user: User.getUser()}));
            this.setState({ ['image' + i]: result.uri });
            // this.setState({ image: result.uri });
        }
    };
    makePicDefault(picId, defaultImage){
        Service.makePicDefault(picId, defaultImage);
    }
    renderProfilePics(){
        console.log('render profile pics', User.getImages());
        console.log('user default', User.defaultImage());
        let pics = [];
        let images = User.getImages();
        for(let i = 0; i < 4; i++){
            let pic = images[i];
            if(pic){
                pics.push(
                    <View style={styles.imageContainer} key={i}>
                        <Image
                            style={[styles.image,(User.defaultImage() === pic.id ? styles.defaultPic : null)]}
                            source={{uri: User.getDefaultImageURI()}}
                            onLoad={() => {console.log('load')}}
                        />
                        <Text>{pic.id}</Text>
                        {User.defaultImage().id === pic.id ? <Text>default</Text> : <TouchableOpacity onPress={() => this.makePicDefault(pic, (i === 0 ? true : false))}><Text>Make Default</Text></TouchableOpacity>}
                    </View>
                ); 
            }else{

                if(this.state['image' + i]){
                    pics.push(
                        <View style={styles.imageContainer} key={i}>

                           <Image
                               style={styles.image}
                                source={{uri: this.state[`image${i}`]}}
                                onLoad={() => {console.log('load')}} 
                            />

                            {i === 0 ? <Text>default</Text> : <Text>Make Default</Text>}
                        </View>
                    );
                }else{
                    pics.push(
                        <TouchableOpacity onPress={() => this.pickImage(i)} key={i}>
                            <View style={[styles.imageContainer, styles.imageContainerFiller]} key={i}></View>
                        </TouchableOpacity>
                        );
                }

                            
            }
            
        }

        return (
            <ScrollView style={styles.images}>
                <View style={styles.imagesContainer}>
                    {pics}
                </View>
            </ScrollView>
        );
    }

    render(){
        return (
            <View style={styles.container}>
                <Text>Images</Text>
                <Button onPress={() => this.props.changeView('profile')} title="Back"/>
                {this.renderProfilePics()}
            </View>
        );
    }
}
console.log(Settings.w, Settings.h / 2)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        marginTop:30
    },
    images: {
        flex: 1,
        flexWrap: 'wrap',
        marginTop: 10
    },
    imagesContainer: {
        justifyContent: 'space-around',
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        padding:5
    },
    imageContainer: {
        width: (Settings.w / 2) - 20,
        height: Settings.h / 4.2,
        margin:5
    },
    imageContainerFiller: {
        backgroundColor: '#444'
    },
    image: {
        flex: 1,
        top: 0,
        left: 0,
        bottom: 0,
        right: 0
    }
});
