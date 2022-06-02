import React, {useState, useEffect} from 'react';
import {Button, TextInput, StyleSheet} from 'react-native';
import auth from '@react-native-firebase/auth';

const Login1 = (props) => {
  const [confirm, setConfirm] = useState(null);
  const [code, setCode] = useState('');

   const signInWithPhoneNumber = async() => {
    // console.log(phoneNumber, 'phone');

    const confirmation =  await auth().signInWithPhoneNumber(`91`+number);
    console.log(confirmation, 'confirm');
    setConfirm(confirmation);
  }

  const confirmCode = () => {
    try {
       confirm.confirm(code);
      console.log("success")
      props.navigation.navigate("PhoneLogout")
    } catch (error) {
      console.log('Invalid code.');
    }
  }

  if (!confirm) {
    return (
      <Button
        title="Phone Number Sign In"
        onPress={() => signInWithPhoneNumber('+917982727300')}
      />
    );
  }

  return (
    <>
      <TextInput style={styles.confirmCode} value={code} onChangeText={text => setCode(text)} />
      <Button title="Confirm Code" onPress={() => confirmCode()} />
    </>
  );
};
const styles = StyleSheet.create({
  confirmCode: {
    width: '85%',
    color:'black'
  },
  
});

export default Login1;
