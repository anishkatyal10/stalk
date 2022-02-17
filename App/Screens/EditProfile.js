import React, {useState, useEffect} from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  Text,
  TextInput,
  View,
  ImageBackground,
  Alert,
  Image,
} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import storage from '@react-native-firebase/storage';
import BottomSheet from 'reanimated-bottom-sheet';
import Animated from 'react-native-reanimated';
import ImagePicker from 'react-native-image-crop-picker';
import Firebase from '../Firebase/firebaseConfig';

const EditProfile = () => {
  const imj = require('../asset/user.jpg');
  const [image, setImage] = useState('../asset/user.jpg');
  const [userData, setUserData] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [Name, setName] = useState('');
  const [allUsers, setAllusers] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setemail] = useState('');

  var userUID = Firebase.auth().currentUser.uid;
  Firebase.database()
    .ref('users/' + userUID)
    .once('value', snap => {
      setAllusers(snap.val().image);
      setName(snap.val().name);
      setPhone(snap.val().phone);
      setemail(snap.val().email);
    });
  console.log(userUID, 'uid');
  const reference = storage().ref(`${userUID}.jpg`);

  bs = React.createRef();
  fall = new Animated.Value(1);

  const uploadImage = async () => {
    console.log('upload');
    if (image == null) {
      return null;
    }
    reference
      .putFile(image)
      .then(snapshot => {
        //You can check the image is now uploaded in the storage bucket
        console.log(`1.png has been successfully uploaded.`);
      })
      .catch(e => console.log('uploading image error => ', e));

    try {
      const url = await reference.getDownloadURL();
      setImage(null);

      // Alert.alert(
      //   'Image uploaded!',
      //   'Your image has been uploaded to the Firebase Cloud Storage Successfully!',
      // );
      console.log(url, 'url');
      return url;
    } catch (e) {
      console.log(e);
      return null;
    }
  };

  const handleSubmit = async () => {
    console.log('handleSubmit');
    let imgUrl = await uploadImage();

    if (imgUrl == null && userData.userImg) {
      imgUrl = userData.userImg;
    }

    // var userUID = Firebase.auth().currentUser.uid;
    // console.log(userUID, 'uid');
    Firebase.database()
      .ref(`/users/${userUID}`)
      .update({
        name: userData.name,
        phone: userData.phone,
        image: imgUrl,
      })
      .then(() => {
        console.log('User Updated');
        Alert.alert(
          'Profile Update',
          'Your profile has been updated successfully.',
        );
      });
  };

  const choosePhotoFromLibrary = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 300,
      cropping: true,
      compressImageQuality: 0.7,
    }).then(image => {
      console.log(image);
      console.log(userUID, 'uidhello');
      setImage(image.path);
      this.bs.current.snapTo(1);
    });
  };

  renderInner = () => (
    <View style={styles.panel}>
      <View style={{alignItems: 'center'}}>
        <Text style={styles.panelTitle}>Upload Photo</Text>
        <Text style={styles.panelSubtitle}>Choose Your Profile Photo</Text>
      </View>
      <TouchableOpacity style={styles.panelButton} onPress={() => {}}>
        <Text style={styles.panelButtonTitle}>Take Photo</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.panelButton}
        onPress={choosePhotoFromLibrary}>
        <Text style={styles.panelButtonTitle}>Choose From Library</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.panelButton}
        onPress={() => this.bs.current.snapTo(1)}>
        <Text style={styles.panelButtonTitle}>Cancel</Text>
      </TouchableOpacity>
    </View>
  );

  renderHeader = () => (
    <View style={styles.header}>
      <View style={styles.panelHeader}>
        <View style={styles.panelHandle} />
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <BottomSheet
        ref={this.bs}
        snapPoints={[330, 0]}
        renderContent={this.renderInner}
        renderHeader={this.renderHeader}
        initialSnap={1}
        callbackNode={this.fall}
        enabledGestureInteraction={true}
      />
      <Animated.View
        style={{
          margin: 20,
          opacity: Animated.add(0.5, Animated.multiply(this.fall, 1.0)),
        }}>
        <View style={{alignItems: 'center'}}>
          <TouchableOpacity onPress={() => this.bs.current.snapTo(0)}>
            <View style={styles.imageinner}>
              <ImageBackground
                source={{uri: image}}
                style={{height: 130, width: 130, marginTop: 30}}
                imageStyle={{borderRadius: 130 / 2}}>
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Image
                    source={{uri: allUsers}}
                    style={{
                      height: 110,
                      width: 110,
                      borderRadius: 110 / 2,
                      marginBottom: 10,
                    }}
                  />
                  <Icon
                    name="camera"
                    size={25}
                    color="white"
                    style={{
                      opacity: 0.9,
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderWidth: 1,
                      borderColor: '#fff',
                      borderRadius: 10,
                      position: 'absolute',
                    }}
                  />
                </View>
              </ImageBackground>
            </View>
          </TouchableOpacity>
          <Text
            style={{
              marginTop: 40,
              fontSize: 18,
              fontWeight: 'bold',
              color: 'black',
              marginBottom: 20,
            }}>
            {Name}
          </Text>
        </View>

        <View style={styles.action}>
          <FontAwesome name="user-o" color="#000" size={20} />
          <TextInput
            placeholder="Full Name"
            placeholderTextColor="#666666"
            value={Name}
            onChangeText={txt => setUserData({...userData, name: txt})}
            style={styles.textInput}
          />
        </View>

        <View style={styles.action}>
          <FontAwesome name="phone" color="#000" size={20} />
          <TextInput
            placeholder="Phone Number"
            placeholderTextColor="#666666"
            keyboardType="phone-pad"
            value={phone}
            onChangeText={txt => setUserData({...userData, phone: txt})}
            style={styles.textInput}
          />
        </View>

        <View style={styles.action}>
          <FontAwesome name="envelope-o" color="#000" size={20} />
          <TextInput
            placeholder="Email"
            value={email}
            color="#DFDF3C"
            placeholderTextColor="white"
            keyboardType="email-address"
            editable={false}
            style={styles.textemailinput}
          />
        </View>

        <TouchableOpacity style={styles.commandButton} onPress={handleSubmit}>
          <Text style={styles.panelButtonTitle}>Submit</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};

export default EditProfile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageinner: {
    height: 100,
    width: 100,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  action: {
    flexDirection: 'row',
    marginTop: 10,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
    paddingBottom: 5,
  },
  textInput: {
    flex: 1,
    marginTop: -12,
    paddingLeft: 10,
    color: '#05375a',
  },
  textemailinput: {
    flex: 1,
    marginTop: -12,
    paddingLeft: 10,
    color: 'grey',
  },
  commandButton: {
    padding: 15,
    borderRadius: 10,
    backgroundColor: '#FF6347',
    alignItems: 'center',
    marginTop: 10,
  },
  panelButtonTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: 'black',
  },
  panelHeader: {
    alignItems: 'center',
  },
  panelHandle: {
    width: 40,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#00000040',
    marginBottom: 10,
  },
  header: {
    backgroundColor: '#FFFFFF',
    shadowColor: '#333333',
    shadowOffset: {width: -1, height: -3},
    shadowRadius: 2,
    shadowOpacity: 0.4,
    // elevation: 5,
    paddingTop: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  panel: {
    padding: 20,
    backgroundColor: '#FFFFFF',
    paddingTop: 20,
    // borderTopLeftRadius: 20,
    // borderTopRightRadius: 20,
    // shadowColor: '#000000',
    // shadowOffset: {width: 0, height: 0},
    // shadowRadius: 5,
    // shadowOpacity: 0.4,
  },
  panelTitle: {
    fontSize: 27,
    height: 35,
    color: 'black',
  },
  panelSubtitle: {
    fontSize: 14,
    color: 'gray',
    height: 30,
    marginBottom: 10,
  },
  panelButton: {
    padding: 13,
    borderRadius: 10,
    backgroundColor: '#FF6347',
    alignItems: 'center',
    marginVertical: 7,
  },
  panelButtonTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: 'black',
  },
});
