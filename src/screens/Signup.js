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
  Alert,
} from 'react-native';
import {Formik} from 'formik';
import * as Yup from 'yup';
import RadioButton from '../components/RadioButton';
import EmailInput from '../components/EmailInput';
import PasswordInput from '../components/PasswordInput';
import Footer from '../components/Footer';
import {SignUpUser} from '../Firebase/SignUpUser';
import Firebase from '../Firebase/firebaseConfig';
import {AddUser} from '../Firebase/Users';
import {launchImageLibrary, launchCamera} from 'react-native-image-picker';
import ImgToBase64 from 'react-native-image-base64';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {UserImage} from '../Firebase/Users';
import storage from '@react-native-firebase/storage';

const loginValidation = Yup.object().shape({
  fullName: Yup.string()
    .min(3, 'Must be 3 characters or more')
    .max(15, 'Must be 15 characters or less')
    .required('First Name Required'),
  Email: Yup.string()
    .nullable()
    .email('Invalid email addresss')
    .required('Please enter your Email'),
  Password: Yup.string()
    .required('Please enter your Password')
    .min(8, 'Password is too short - should be 8 characters minimum.')
    .max(15, 'Password is too long - should be 13 characters maximum'),
  phoneNumber: Yup.string().required('Please enter your Phone number'),
});

const Signup = props => {
  const [imageuri, setImageuri] = useState('');
  const [uploading, setUploading] = useState(false);
  const openGallery = () => {
    launchImageLibrary('photo', response => {
      console.log(response, 'response');
      setImageuri(response.assets[0].uri);
    });
  };

  const uploadImage = async () => {
    const uploadUri = imageuri;
    console.log(uploadUri, 'upload uri');
    let filename = uploadUri.substring(uploadUri.lastIndexOf('/') + 1);
    setUploading(true);
    try {
      const snapshotObj = await storage().ref(filename).putFile(uploadUri);
      console.log(snapshotObj, "snapshot")
      if (snapshotObj && snapshotObj.metadata && snapshotObj.metadata.name) {
        return `https://firebasestorage.googleapis.com/v0/b/sstalk-64300.appspot.com/o/${snapshotObj.metadata.name}?alt=media`;
      }

      setUploading(false);
      console.log('Image uploaded successfully to cloud');
    } catch (e) {
      console.log(e, "");
    }

    setImageuri(null);
  };
  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'column',
        backgroundColor:'#43425D',
      }}>
      {/* <ImageBackground
        source={require('../images/login1.jpg')}
        style={{
          flex: 1,
          height: '100%',
          flexDirection: 'column',
          paddingHorizontal: 20,
        }}> */}
        <ScrollView style={{flex: 1}}>
          <View style={styles.container}>
            <Text style={styles.welcomeText}>Welcome To STalk</Text>
          </View>
          <Formik
            initialValues={{
              fullName: '',
              Email: '',
              Password: '',
              phoneNumber: '',
            }}
            validationSchema={loginValidation}
            onSubmit={values => {
              SignUpUser(values.Email, values.Password)
                .then(async res => {
                  const downloadedImage = await uploadImage();
                  console.log(downloadedImage, 'downImage');
                  var userUID = Firebase.auth().currentUser.uid;
                  console.log(userUID, 'userid');
                  console.log('upload image called before');
                  AddUser(
                    values.fullName,
                    values.Email,
                    values.phoneNumber,
                    downloadedImage,
                    userUID,
                  )
                    .then(() => {
                      props.navigation.navigate('login');
                      Alert.alert('user saved');
                    })
                    .catch(error => {
                      Alert.alert(error);
                    });
                })
                .catch(error => {
                  Alert.alert(error);
                });
            }}>
            {({errors, values, touched, handleSubmit, setFieldValue}) => {
              return (
                <View style={styles.mainView}>
                  <View style={styles.view}>
                    <EmailInput
                      emailStyle={styles.email}
                      name="fullName"
                      id="fullName"
                      type="text"
                      value={values.fullName}
                      setFieldValue={setFieldValue}
                      placeholder="Full Name"
                      placeholderTextColor="grey"
                    />
                    {errors.fullName && touched.fullName && (
                      <Text style={styles.error}>{errors.fullName}</Text>
                    )}
                    <EmailInput
                      emailStyle={styles.email}
                      name="Email"
                      id="Email"
                      type="text"
                      value={values.Email}
                      setFieldValue={setFieldValue}
                      placeholder="Email"
                      placeholderTextColor="grey"
                    />
                    {errors.Email && touched.Email && (
                      <Text style={styles.error}>{errors.Email}</Text>
                    )}
                    <PasswordInput
                      passwordStyle={styles.password}
                      placeholder="Password"
                      placeholderTextColor="grey"
                      name="Password"
                      id="Password"
                      type="text"
                      setFieldValue={setFieldValue}
                      value={values.Password}
                    />
                    {errors.Password && touched.Password && (
                      <Text style={styles.error}>{errors.Password}</Text>
                    )}
                    <EmailInput
                      emailStyle={styles.email}
                      name="phoneNumber"
                      id="phoneNumber"
                      type="text"
                      value={values.phoneNumber}
                      setFieldValue={setFieldValue}
                      placeholder="Phone Number"
                      placeholderTextColor="grey"
                    />
                    {errors.phoneNumber && touched.phoneNumber && (
                      <Text style={styles.error}>{errors.phoneNumber}</Text>
                    )}
                    <TouchableOpacity
                      onPress={openGallery}
                      style={styles.Image}>
                      <Text numberOfLines={1} style={styles.buttonText}> {imageuri == "" ? "Select image" : imageuri} </Text>
                    </TouchableOpacity>
                  </View>
                  <View
                    style={{
                      flex: 1,
                      flexDirection: 'column',
                      paddingVertical: 20,
                    }}>
                    <RadioButton
                      buttonStyle={styles.loginButtonStyle}
                      textStyle={styles.signinTextStyle}
                      onPress={handleSubmit}
                      title="sign up"
                    />
                    <TouchableOpacity
                      onPress={() => {
                        props.navigation.navigate('login');
                      }}>
                      <Text
                        style={{
                          fontSize: 12,
                          fontWeight: 'bold',
                          marginLeft: 25,
                          color: 'white',
                          paddingTop: 10,
                          paddingBottom:10
                        }}>
                        Already have Account? Click Here
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              );
            }}
          </Formik>
        </ScrollView>
      {/* </ImageBackground> */}
    </View>
  );
};
const styles = StyleSheet.create({
  mainView: {
    flex: 2.5,
    flexDirection: 'column',
    paddingVertical: 10,
    marginLeft: 20

  },
  view: {
    flex: 2.5,
    flexDirection: 'column',
    justifyContent: 'center',
    paddingVertical: 10,
  },
  container: {
    flex: 0.6,
    flexDirection: 'column',
    paddingVertical: 40,
  },
  welcomeText: {
    marginHorizontal: 20,
    marginTop: 20,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 20,
    color: 'white'
  },
  loginButtonStyle: {
    backgroundColor: '#28E7EF',
  },
  signinTextStyle: {
    color: 'white',
  },
  error: {
    color: '#f00',
    fontSize: 9,
    marginTop: 7,
    marginLeft: 17,
  },
  email: {
    width: '80%',
    borderBottomWidth: 1.9,
    borderBottomColor: '#D3D3D3',
    color: 'white',
  },
  buttonText: {
    color: 'grey',
    marginTop: 1,
    fontSize: 15
  },
  password: {
    width: '80%',
    color: 'white',
    borderBottomWidth: 1.9,
    borderBottomColor: '#D3D3D3',
  },
  Image: {
    height: 40,
    borderBottomWidth: 1.9,
    borderBottomColor: '#D3D3D3',
    color: 'white',
    marginLeft: 15,
    margin: 20,
    width: '85%'
  },
  gender: {
    color: 'grey',
    marginLeft: 8,
    marginBottom: 10,
    marginLeft: 15,
  },
  radiobtn: {
    display: 'flex',
    width: '80%',
    marginLeft: 15,
  },
});

export default Signup;