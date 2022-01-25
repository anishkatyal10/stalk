import React, {useState, useEffect} from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
  ImageBackground,
  ScrollView,
} from 'react-native';
import {Formik} from 'formik';
import * as Yup from 'yup';
import RadioButton from '../components/RadioButton';
import EmailInput from '../components/EmailInput';
import PasswordInput from '../components/PasswordInput';
import Footer from '../components/Footer';
import Firebase from '../Firebase/firebaseConfig';
import {SignInUser} from '../Firebase/SignInUser';
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
      <ScrollView style={{flex: 1}}>
        <ImageBackground
          source={require('../images/login1.jpg')}
          style={{flex: 1, flexDirection: 'column', paddingHorizontal: 20}}>
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
                    placeholderTextColor="grey"
                  />
                  {errors.Email && touched.Email && (
                    <Text style={styles.error}>{errors.Email}</Text>
                  )}
                  <PasswordInput
                    passwordStyle={styles.password}
                    placeholder="Enter Password"
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
        </ImageBackground>
      </ScrollView>
      <Footer />
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
  },
  welcomeText: {
    marginHorizontal: 20,
    marginTop: 20,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 20,
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
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 25,
    color: 'white',
  },
});

export default Login;
