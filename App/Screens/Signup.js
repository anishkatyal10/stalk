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
import RadioButton from '../Components/RadioButton';
import EmailInput from '../Components/EmailInput';
import PasswordInput from '../Components/PasswordInput';

const data = [
  {
    label: 'Male',
    value: 'Male',
  },
  {
    label: 'Female',
    value: 'Female',
  },
];

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
});

const Signup = (props) => {
  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'column',
      }}>
      <ScrollView style={{flex: 1}}>
        {/* <ImageBackground
          source={require('../images/login1.jpg')}
          style={{flex: 1, flexDirection: 'column', paddingHorizontal: 20}}> */}
          <View style={styles.container}>
            <Text style={styles.welcomeText}>Welcome To STalk</Text>
          </View>
          <Formik
            initialValues={{
              fullName: '',
              Email: '',
              Password: '',
              confirmPassword: '',
            }}
            validationSchema={loginValidation}
            onSubmit={values => {
              console.log(values, 'users');
              setTimeout(() => {
                alert('logged in');
                props.navigation.navigate("login")
              }, 500);
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
    marginVertical: 50,
    borderBottomWidth: 1.9,
    borderBottomColor: '#D3D3D3',
    color: 'white',
  },
  password: {
    height: 40,
    width: '80%',
    marginVertical: 20,
    color: 'grey',
    borderBottomWidth: 1.9,
    borderBottomColor: '#D3D3D3',
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