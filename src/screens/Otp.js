import React, {useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  Image,
  TextInput,
  ImageBackground,
  TouchableOpacity,
  Pressable,
  StatusBar,
  ToastAndroid,
} from 'react-native';
import { useRoute } from '@react-navigation/native';

const {width, height} = Dimensions.get('window');

const Otp = ({route}) => {
    // const route = useRoute();
// console.log(route.params.confirm, "params")
  const [number, setNumber] = useState('');
//   const confirm1 = props.navigation.getParam('confirm');
const confirm1 = route.params.confirm;
//   console.log('route', confirm);

  const OtpVerify = () => {
    try {
      let data = confirm1.confirm(number);
      console.log('data', data);
    } catch (error) {
      console.log('Invalid code.');
    //   ToastAndroid.show('Invalid code.', ToastAndroid.SHORT);
    }
  };

  return (
    <View
      style={{
        height: height,
        width: '100%',
        flex: 1,
        justifyContent: 'center',
      }}>
      <View
        style={{
          justifyContent: 'space-between',
          flexDirection: 'row',
          height: 40,
          marginTop: 7,
          alignItems: 'center',
          marginHorizontal: 5,
        }}></View>
      <Text
        style={{
          fontSize: 22,
          fontWeight: 'bold',
          color: 'black',
          marginLeft: 20,
          marginTop: 25,
          marginBottom: 15,
        }}>
        Verify OTP
      </Text>
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          marginHorizontal: 20,
        }}>
        <TextInput
          style={{
            marginBottom: 20,
            color: 'black',
            width: '100%',
            borderBottomColor: '#f8f8f8',
            borderBottomWidth: 1,
          }}
          placeholder="Enter 6 digit OTP"
          placeholderTextColor="#fff"
          underlineColorAndroid={'transparent'}
          keyboardType="number-pad"
          onChangeText={value => setNumber(value)}
          value={number}
          maxLength={6}
        />
        <TouchableOpacity
          onPress={() => OtpVerify()}
          disabled={number.length == 6 ? false : true}
          style={[
            styles.listView,
            {backgroundColor: number.length == 6 ? '#000' : 'grey'},
          ]}>
          <Text
            style={{
              color: 'seashell',
              fontSize: 15,
              fontWeight: 'bold',
            }}>
            Login
          </Text>
        </TouchableOpacity>
        <View
          style={{
            justifyContent: 'space-between',
            flexDirection: 'row',
            height: 25,
            width: '100%',
          }}></View>
      </View>
    </View>
  );
};

export default Otp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    opacity: 0.9,
  },
  listView: {
    width: '100%',
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'grey',
    borderRadius: 5,
  },
  fbButton: {
    width: '100%',
    height: 50,
    backgroundColor: '#4267B2',
    borderRadius: 5,
    color: 'white',
    padding: 11,
    flexDirection: 'row',
    marginTop: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  googleButton: {
    width: '100%',
    height: 50,
    backgroundColor: 'black',
    borderRadius: 5,
    color: 'white',
    padding: 11,
    flexDirection: 'row',
    marginTop: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },

  hairline: {
    backgroundColor: '#A2A2A2',
    height: 0.5,
    width: '40%',
    marginTop: 19,
  },

  lineLowText1: {
    fontFamily: 'AvenirNext-Bold',
    fontSize: 15,
    color: '#A2A2A2',
    width: '20%',
    textAlign: 'center',
    marginTop: 7,
  },
});
