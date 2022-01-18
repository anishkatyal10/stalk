import React, {useState, useEffect} from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  Text,
  TextInput,
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
import {useLinkProps} from '@react-navigation/native';
import Firebase from '../Firebase/firebaseConfig';
import {SignInUser} from '../Firebase/SignInUser';

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
          resizeMode="repeat"
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
              SignInUser(values.Email, values.password)
                .then(res => {
                  console.log('res', res);
                  alert('logged in');
                  props.navigation.navigate('dashboard');
                })
                .catch(error => {
                  alert(error);
                });
              setTimeout(() => {}, 500);
            }}>
            {({errors, values, touched, handleSubmit, setFieldValue}) => {
              return (
                <View
                  style={{
                    flex: 2.5,
                    flexDirection: 'column',
                    paddingVertical: 10,
                  }}>
                  <View
                    style={{
                      flex: 2.5,
                      flexDirection: 'column',
                      justifyContent: 'center',
                      paddingVertical: 10,
                    }}>
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
                      title="login"
                    />
                  </View>
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
});

export default Login;
