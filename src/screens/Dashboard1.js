import React from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';
import RadioButton from '../components/RadioButton';
import {GoogleSignin} from '@react-native-google-signin/google-signin';

const Dashboard1 = props => {
  const googleSignOut = async () => {
    await GoogleSignin.signOut()
      .then(() => {
        console.log('signed out');
        props.navigation.navigate('login');
      })
      .catch(error => {
        alert(error);
      });
  };

  return (
    <View style={styles.buttonContainer1}>
      <RadioButton
        buttonStyle={styles.loginButtonStyle2}
        textStyle={styles.signinTextStyle}
        onPress={() => googleSignOut()}
        title="SIGN OUT WITH GOOGLE"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  loginButtonStyle2: {
    backgroundColor: 'cyan',
    width: '85%',
  },
  signinTextStyle: {
    color: 'white',
  },

  buttonContainer1: {
    marginBottom: 2,
    paddingHorizontal: 15,
    borderRadius: 35,
    justifyContent: 'flex-start',
    marginBottom: 0,
  },
});
export default Dashboard1;
