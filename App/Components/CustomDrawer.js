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




const CustomDrawer = (props) => {
    return (
        <View style={{flex:1}}>
        <DrawerContentScrollView {...props} contentContainerStyle={{backgroundColor: '#EEEFEF'}}>
            <ImageBackground source={require('../asset/bg.jpg')} style = {{padding: 20}}>
                <Image source={require('../asset/user.jpg')} style={{height:80, width: 80, borderRadius: 40, marginBottom: 10}} />
                <Text style={{color: 'black', fontFamily: 'Roboto-Regular', fontSize: 20}}>UserName</Text>
            </ImageBackground>
            
            <DrawerItemList {...props} />
            
        </DrawerContentScrollView>
        <View style={{padding: 20, borderTopWidth: 1, borderTopColor: '#ccd'}}>
            <Text style={{color: 'black'}}>Custom Text</Text>
        </View>





        </View>

        

    )
}

export default CustomDrawer;