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

const Online = () => {
  const uid = Firebase.auth().currentUser.uid;
  const reference = Firebase.database().ref('online/' + uid);
  reference.set({uuid: uid}).then(() => console.log('Online presence set'));
};
const Login = props => {
  useEffect(() => {
    async function getUID() {
      const uid = await AsyncStorage.getItem('UID');
      if (uid) {
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
        backgroundColor: '#43425D'
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
            onSubmit={(values, { resetForm}) => {
              console.log(values, 'users');
              resetForm({values: ''})
              SignInUser(values.Email, values.Password)
                .then(async res => {
                  const uid = Firebase.auth().currentUser.uid;
                  await AsyncStorage.setItem('UID', uid);
                  props.navigation.navigate('dashboard');
                  Online();
                })
                .catch(error => {
                  alert("User doesn't exists");
                });
            }}>
            {({errors, values, resetForm, touched, handleSubmit, setFieldValue}) => {
              return (
                <View
                  style={{
                    flex: 2.5,
                    marginLeft: 10,
                    flexDirection: 'column',
                    alignItems:'flex-start',
                    paddingVertical: 36,
                  }}>
                  <View style={{ justifyContent: 'center', flexDirection: 'column', paddingVertical: 36 }}>
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
                      flex: 0.9,
                      flexDirection: 'column',
                      alignItems:'flex-start',
                      paddingVertical: 20,
                    }}>
                    <View style={styles.buttonContainer1}>
                      <RadioButton
                        buttonStyle={styles.loginButtonStyle}
                        textStyle={styles.signinTextStyle}
                        onPress={handleSubmit}
                        title="login"
                      />
                    </View>
                    <View style={[styles.buttonContainer1, { marginBottom: 95 }]}>
                      <TouchableOpacity
                        onPress={() => {
                          resetForm({values: '', errors: ''})
                          
                          props.navigation.navigate('signup');
                        }}>
                        <Text style={styles.signup}>New User? Click Here</Text>
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
  signinTextStyle: {
    color: 'white',
  },
  error: {
    color: '#f00',
    fontSize: 9,
    marginTop: 1,
    marginLeft: 17,
  },
  email: {
    height: 40,
    width: '80%',
    marginVertical: 15,
    color: 'grey',
    borderBottomWidth: 1.9,
    borderBottomColor: '#D3D3D3',
  },
  buttonContainer1: {
    width: '85%',
    marginBottom: 2,
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 35,
    justifyContent: 'flex-start'
},
  password: {
    height: 40,
    width: '80%',
    color: 'grey',
    marginVertical: 15,
    borderBottomWidth: 1.9,
    borderBottomColor: '#D3D3D3',
  },
  signup: {
    fontSize: 12,
    fontWeight: 'bold',
    marginLeft: 25,
    color: 'white',
  },
});

export default Login;
