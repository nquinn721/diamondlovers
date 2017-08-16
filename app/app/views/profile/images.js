import React from 'react';
import { StyleSheet, Text, View, Image, Button, ScrollView, TouchableOpacity, CameraRoll} from 'react-native';
import { ImagePicker } from 'expo';
import Service from 'app/app/components/service';
import Settings from 'app/app/components/settings';
import User from 'app/app/components/user';

export default class ProfileImages extends React.Component{
    state = {image : ''};
    _pickImage = async (i) => {
        let result = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            base64: true,
            aspect: [4, 3]
        });

        console.log(result);
        if (!result.cancelled) {
            Service.uploadImage(result.uri);
            this.setState({ ['image' + i]: result.uri });
            // this.setState({ image: result.uri });
        }
    };
    renderProfilePics(){
        let pics = [];
        for(let i = 0; i < 4; i++){
            let pic = User.user.profile.images[i];
            if(pic){
                pics.push(
                    <View style={styles.imageContainer} key={i}>
                        <Image
                            style={[styles.image,(pic.default ? styles.defaultPic : null)]}
                            source={{uri: Settings.baseUrl + pic.location +'/' + pic.name}}
                            onLoad={() => {console.log('load');}}
                        />
                    </View>
                ); 
            }else{
                pics.push(
                    <TouchableOpacity onPress={() => this._pickImage(i)} key={i}>
                        {this.state['image' + i] ? <Image
                                style={{width: (Settings.w / 2) - 20, height: Settings.h / 4.2, marginTop: 5}}
                                source={{uri: this.state[`image${i}`]}}
                                onLoad={() => {console.log('load')}} 
                            /> : 
                            <View style={[styles.imageContainer, styles.imageContainerFiller]} key={i}></View>
                        }
                    </TouchableOpacity>
                    );
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
