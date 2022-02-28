import React from 'react';
import {
    StyleSheet,
    Text,
    TextInput,
    View,
    Dimensions
} from 'react-native';

const { width, height } = Dimensions.get('window')

const EmailInput = ({value, setFieldValue,name,id,placeholder,placeholderTextColor,type,emailStyle}) => {
    const handleChange = (value) => {
        
        console.log(value, 'hello')
        setFieldValue(name, value)
        console.log(name, 'Hey')
    }
    return (
        <View style={[emailStyle, styles.textFieldView]}>
            <TextInput
            style={styles.textField}
            autoCorrect={false}
            value={value}
            name={name}
            id={id}
            type={type}
            placeholder={placeholder}
            onChangeText={handleChange}
            placeholderTextColor={placeholderTextColor}
            />
        </View>
    )
}

const styles = StyleSheet.create ({
    textField: {
        flex: 1,
        marginHorizontal: 0,
        marginLeft: 30,
        fontSize: 15,
        color: 'white'
    },
    textFieldView: {
        height: 50,
        width: width * 0.7,
        marginTop: 5,
        marginLeft: 15
    }
})
export default EmailInput;