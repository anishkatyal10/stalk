import React, {useState, useEffect} from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  Text,
  TextInput,
  View,
  ImageBackground,
  ScrollView,
  Image,
} from 'react-native';
import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import Firebase from '../Firebase/firebaseConfig';
import AsyncStorage from '@react-native-async-storage/async-storage';
import 'firebase/firestore';

signout = async props => {
  try {
    const uid = await Firebase.auth().currentUser.uid;
    const reference = await Firebase.database().ref('online/' + uid);
    reference
      .remove()
      .then(() => console.log('On disconnect function configured.'));
    await Firebase.auth()
      .signOut()
      .then(async () => {
        await AsyncStorage.removeItem('UID');
        props.navigation.navigate('login');
      })
      .catch(error => {
        alert(error);
      });
  } catch (error) {
    alert(error);
  }
};

const CustomDrawer = props => {
  const [allUsers, setAllusers] = useState('');
  const [Name, setName] = useState('');
  
  const signinUserData = () => {
    const uid =  Firebase.auth().currentUser.uid;
    console.log(uid, "sign in uid")
    Firebase.database().ref('users/' + uid).once('value', snap => {
      console.log(snap.val(), "snap")
      setAllusers(snap.val().image);
      console.log(allUsers, "userImage")
      setName(snap.val().name);
      console.log(Name, "userName")
  })
  }
  useEffect(() => {
    async function getUID() {
      const uid = AsyncStorage.getItem('UID');
      if(uid){
        signinUserData();
}            
      }
    getUID();
  }, []);

  return (
    <View style={{flex: 1, justifyContent: 'center'}}>
      <DrawerContentScrollView
        {...props}
        contentContainerStyle={{backgroundColor: '#fff'}}>
        <ImageBackground
          source={require('../asset/bg2.jpg')}
          style={{padding: 20}}>
            <Image
              source={{uri: allUsers}}
              style={{
                height: 60,
                width: 60,
                borderRadius: 80 / 2,
                marginBottom: 10,
              }}
            />

          <Text
            style={{
              color: 'black',
              fontFamily: 'Roboto-Regular',
              fontSize: 20,
            }}>
            {Name}
          </Text>
        </ImageBackground>

        <DrawerItemList {...props} />
      </DrawerContentScrollView>
      <View style={{padding: 20, borderTopWidth: 1, borderTopColor: '#ccc'}}>
        <TouchableOpacity
          onPress={() => {
            signout(props);
          }}
          style={{paddingVertical: 5}}>
          <Text style={{color: 'black', fontSize: 20, marginLeft: 20}}>
            Sign out
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CustomDrawer;
