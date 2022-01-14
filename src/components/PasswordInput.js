import React from 'react';
import {StyleSheet, Text, TextInput, View, Dimensions} from 'react-native';

const {width, height} = Dimensions.get('window');

const PasswordInput = ({
  value,
  setFieldValue,
  name,
  id,
  placeholder,
  placeholderTextColor,
  type,
  passwordStyle
}) => {
  const handleChange = value => {
    console.log(value, 'hello');
    setFieldValue(name, value);
    console.log(name, 'Hey');
  };
  return (
    <View style={[passwordStyle, styles.textFieldView]}>
      <TextInput
        style={styles.textField}        
        secureTextEntry
        name={name}
        autoCorrect={false}
        value={value}
        id={id}
        type={type}
        placeholder={placeholder}
        placeholderTextColor={placeholderTextColor}
        onChangeText={handleChange}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  textField: {
    flex: 1,
    marginHorizontal: 0,
    fontSize: 15,
    color: 'white'
  },
  textFieldView: {
    height: 40,
    width: width * 0.8,
    marginTop: 5,
    marginBottom: 10,
    marginLeft:15,
    justifyContent: 'center',
  },
});
export default PasswordInput;
