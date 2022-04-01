import React, { useState, useEffect } from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Image,
  ScrollView,
} from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import RadioButton from '../components/RadioButton';
import EmailInput from '../components/EmailInput';
import PasswordInput from '../components/PasswordInput';
import Footer from '../components/Footer';
import Firebase from '../Firebase/firebaseConfig';
import { SignInUser } from '../Firebase/SignInUser';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icons from 'react-native-vector-icons/Feather';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';

const loginValidation = Yup.object().shape({
  Email: Yup.string()
    .nullable()
    .email('Invalid email addresss')
    .required('Please enter your Email'),
  Password: Yup.string()
    .required('Please enter your Password')
    .min(8, 'Password is too short - should be 8 characters minimum.')
    .max(15, 'Password is too long - should be 13 characters maximum'),
});

const Online = () => {
  const uid = auth().currentUser.uid;
  const reference = database().ref(`/online/${uid}`);
  reference.set({ uuid: uid }).then(() => console.log('Online presence set'));
  database().ref(`users/${uid}`).update({
    status: 'Online'
  })
};
const Login = props => {
  useEffect(() => {
    async function getUID() {
      const userID = await AsyncStorage.getItem('UID');
      if (userID) {
        props.navigation.navigate('dashboard');
      }
    }
    getUID();
  }, []);
  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#43425D',
        alignItems: 'center'
      }}>
      <ScrollView style={{ flex: 1}}>
        <View style={styles.container}>
          <Image style={{ height: 40, width: 180 }} source={require('../images/logo.jpg')} />
        </View>
        <Formik
          initialValues={{
            Email: '',
            Password: '',
          }}
          validationSchema={loginValidation}
          onSubmit={(values, { resetForm }) => {
            console.log(values, 'users');
            resetForm({ values: '' })
            SignInUser(values.Email, values.Password)
              .then(async res => {
                const uid = auth().currentUser.uid;
                console.log(uid, "user online")
                await AsyncStorage.setItem('UID', uid);
                props.navigation.navigate('dashboard');
                Online();
              })
              .catch(error => {
                alert("User doesn't exists");
              });
          }}>
          {({ errors, values, resetForm, touched, handleSubmit, setFieldValue }) => {
            return (
              <View
                style={{
                  flex: 6,
                  marginLeft: 10,
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                }}>
                <View style={{ justifyContent: 'center', flexDirection: 'column', paddingVertical: 10 }}>
                  <View style={{
                    position: 'relative',
                    flexDirection: 'row',
                  }}>
                    
                    <View style={{marginLeft: 20}}>
                    <Icons style={{marginLeft: 13, top: 40}} name="mail" size={20} color="#00B5BD" />
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
                    </View>
                  </View>
                  <View style={{
                    position: 'relative',
                    flexDirection: 'row',
                    bottom: 10
                  }}>
                    <View style={{marginLeft: 20}}>
                    <Icons style={{marginLeft: 13, top: 40}} name="key" size={20} color="#00B5BD" />
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
                      <Text style={styles.error1}>{errors.Password}</Text>
                    )}
                    </View>
                  </View>
                </View>
                <View
                  style={{
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    marginBottom: 40,
                  }}>
                  <View style={styles.buttonContainer1}>
                    <RadioButton
                      buttonStyle={styles.loginButtonStyle1}
                      textStyle={styles.signinTextStyle}
                      onPress={handleSubmit}
                      title="SIGN IN"
                    />
                  </View>
                  {/* <View>
                    <Text style={styles.or}>OR</Text>
                  </View>
                  <View style={styles.buttonContainer}>

                    <RadioButton
                      buttonStyle={styles.loginButtonStyle}
                      textStyle={styles.signinTextStyle}
                      onPress={handleSubmit}
                      title="Sign In with Facebook"
                    />
                  </View> */}
                  <View style={[styles.buttonContainer1, { marginBottom: 95 }]}>
                    <TouchableOpacity
                      onPress={() => {
                        resetForm({ values: '', errors: '' })

                        props.navigation.navigate('signup');
                      }}>
                      <Text style={styles.signup}>Don't have an account yet? Sign Up</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            );
          }}
        </Formik>
        {/* </ImageBackground> */}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    paddingVertical: 20,
  },
  container: {
    flex: 0.6,
    flexDirection: 'column',
    paddingVertical: 40,
    alignItems: 'center'
  },
  welcomeText: {
    marginHorizontal: 20,
    marginTop: 20,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 20,
    color: 'white',
  },
  loginButtonStyle: {
    backgroundColor: '#28E7EF',
    width: '85%',
  },
  loginButtonStyle1: {
    backgroundColor: '#FE7F14',
    width: '85%',
  },
  signinTextStyle: {
    color: 'white',
  },
  error: {
    color: '#f00',
    fontSize: 9,
    marginLeft: 15,
  },
  error1: {
    color: '#f00',
    fontSize: 9,
    marginLeft: 15,
    marginTop: 15
  },
  email: {
    height: 40,
    marginVertical: 15,
    color: 'grey',
    borderBottomWidth: .8,
    borderBottomColor: '#D3D3D3',
  },
  buttonContainer1: {
    marginBottom: 2,
    paddingHorizontal: 15,
    borderRadius: 35,
    justifyContent: 'flex-start',
    marginBottom: 0
  },
  buttonContainer: {
    marginBottom: 2,
    paddingHorizontal: 15,
    borderRadius: 35,
    justifyContent: 'flex-start',
    marginBottom: 0
  },
  password: {
    color: 'white',
    borderBottomWidth: 1.8,
    borderBottomColor: '#D3D3D3',
  },
  signup: {
    fontSize: 12,
    fontWeight: 'bold',
    marginLeft: 25,
    color: 'white',
  },
  or: {
    marginLeft: 150,
    fontWeight: 'bold',
    color: 'white'
  }
});

export default Login;
