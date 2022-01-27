import React from 'react';
import {
    TouchableOpacity,
    StyleSheet,
    Text,
    TextInput,
    View,
    ImageBackground,
    ScrollView,
    Image
} from 'react-native';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import firebase from '../Firebase/firebaseConfig';


const CustomDrawer = (props) => {

    signout = (props) => {
        firebase.auth().signOut()
            .then(() => {
                props.navigation.navigate('login');
            })
            .catch((error) => { alert(error) })
    }

    return (
        <View style={{ flex: 1, justifyContent:"center", }}>
            <DrawerContentScrollView {...props} contentContainerStyle={{ backgroundColor: '#fff' }}>
                <ImageBackground source={require('../asset/bg2.jpg')} style={{ padding: 20 }}>
                    <Image source={require('../asset/user.jpg')} style={{ height: 80, width: 80, borderRadius: 80/2, marginBottom: 10 }} />
                    <Text style={{ color: 'black', fontFamily: 'Roboto-Regular', fontSize: 20 }}>Username</Text>
                </ImageBackground>

                <DrawerItemList {...props} />

            </DrawerContentScrollView>
            <View style={{ padding: 20, borderTopWidth: 1, borderTopColor: '#ccc' }}>
                <TouchableOpacity onPress={signout} style={{ paddingVertical: 5 }}>
                    <Text style={{ color: 'black', fontSize: 20, marginLeft: 20 }}>Sign out</Text>
                </TouchableOpacity>

            </View>





        </View>



    )
}

export default CustomDrawer;