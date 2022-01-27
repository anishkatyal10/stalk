import React, { useState, useEffect } from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  Text,
  TextInput,
  View,
  ImageBackground,
  ScrollView,
} from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import RadioButton from '../Components/RadioButton';
import EmailInput from '../Components/EmailInput';
import PasswordInput from '../Components/PasswordInput';

import { useLinkProps } from '@react-navigation/native';
import Firebase from '../Firebase/firebaseConfig';
import { SignInUser } from '../Firebase/SignInUsers';
import AsyncStorage from '@react-native-async-storage/async-storage';

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

const Login = props => {
  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'column',
      }}>
      <ImageBackground
        source={require('../asset/bg.jpg')}
        style={{
          flex: 1,
          height: '100%',
          flexDirection: 'column',
          paddingHorizontal: 20,
        }}>
        <ScrollView style={{flex: 1}}>
          <View style={styles.container}>
            <Text style={styles.welcomeText}>Welcome To STalk</Text>
          </View>
          <Formik
            initialValues={{
              Email: '',
              Password: '',
            }}
            validationSchema={loginValidation}
            onSubmit={values => {
              console.log(values, 'users');
              SignInUser(values.Email, values.Password)
                .then(async res => {
                  console.log(res, 'res')
                  const uid = Firebase.auth().currentUser.uid;
                  await AsyncStorage.setItem('UID', uid);
                  props.navigation.navigate('dashboard');
                })
                .catch(error => {
                  alert(error);
                });
              setTimeout(() => {}, 500);
            }}>
            {({errors, values, touched, handleSubmit, setFieldValue}) => {
              return (
                <View style={styles.main}>
                  <EmailInput
                    emailStyle={styles.email}
                    name="Email"
                    id="Email"
                    type="text"
                    value={values.Email}
                    setFieldValue={setFieldValue}
                    placeholder="Enter Email"
                    placeholderTextColor="white"
                  />
                  {errors.Email && touched.Email && (
                    <Text style={styles.error}>{errors.Email}</Text>
                  )}
                  <PasswordInput
                    passwordStyle={styles.password}
                    placeholder="Enter Password"
                    placeholderTextColor="white"
                    name="Password"
                    id="Password"
                    type="text"
                    setFieldValue={setFieldValue}
                    value={values.Password}
                  />
                  {errors.Password && touched.Password && (
                    <Text style={styles.error}>{errors.Password}</Text>
                  )}

                  <RadioButton
                    buttonStyle={styles.loginButtonStyle}
                    textStyle={styles.signinTextStyle}
                    onPress={handleSubmit}
                    title="login"
                  />

                  <TouchableOpacity
                    onPress={() => {
                      props.navigation.navigate('signup');
                    }}>
                    <Text style={styles.signup}>New User? Click Here</Text>
                  </TouchableOpacity>
                </View>
              );
            }}
          </Formik>
        </ScrollView>
      </ImageBackground>

  
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 0.6,
    flexDirection: 'column',
    paddingVertical: 40,
    justifyContent: 'center'
  },
  welcomeText: {
    marginHorizontal: 20,
    marginTop: 20,
    marginBottom: 40,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 35,
    color: 'white'
  },
  loginButtonStyle: {
    backgroundColor: 'green',
  },
  signinTextStyle: {
    color: 'white',
  },
  error: {
    color: '#f00',
    fontSize: 9,
    marginTop: -5,
    marginLeft: 17,
  },
  email: {
    height: 40,
    width: '80%',
    marginVertical: 20,
    color: 'grey',
    borderBottomWidth: 1.9,
    borderBottomColor: '#D3D3D3',
    
  },
  password: {
    height: 40,
    width: '80%',
    marginVertical: 50,
    color: 'grey',
    borderBottomWidth: 1.9,
    borderBottomColor: '#D3D3D3',
  },
  signup: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 0,
    color: 'white',
  },
  main: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
  },

});

export default Login;