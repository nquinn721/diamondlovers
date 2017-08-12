import React from 'react';
import { StyleSheet, Text, View, Image, Button, ScrollView, TouchableOpacity } from 'react-native';
import { ImagePicker } from 'expo';
import Service from 'app/app/components/service';
import Settings from 'app/app/components/settings';
import User from 'app/app/components/user';

export default class ProfileImages extends React.Component{
    state = {};
    _pickImage = async (i) => {
        let result = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            aspect: [4, 3],
        });

        if (!result.cancelled) {
            Service.uploadImage(result.uri);
            this.setState({ ['image' + i]: result.uri });
        }
    };
    renderProfilePics(){
        let pics = [];
        for(let i = 0; i < 10; i++){
            let pic = User.user.profile.images[i];
            if(pic){
                pics.push(
                    <View style={styles.imageContainer} key={i}>
                        <Image
                            style={styles.image}
                            source={{uri: Settings.baseUrl + pic.location +'/' + pic.name}}
                        />
                    </View>
                ); 
            }else{
                pics.push(
                    <TouchableOpacity onPress={() => this._pickImage(i)} key={i}>
                        {this.state['image' + i] ? <Image
                            style={styles.image}
                            source={{uri: this.state['image' + i]}}
                        /> : <View style={styles.imageContainer} key={i}></View>}
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
        marginTop: 10
    },
    imagesContainer: {
        justifyContent: 'space-around',
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        margin:5
    },
    imageContainer: {
        width: (Settings.w / 2) - 20,
        height: Settings.h / 4.2,
        margin:5,
        backgroundColor: '#222'
    },
    image: {
        flex: 1,
        height: undefined,
        width: undefined
    }
});
