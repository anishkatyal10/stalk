import React from 'react';
import {
    TouchableOpacity,
    StyleSheet,
    Text,
    Dimensions
} from 'react-native';

const { width, height } = Dimensions.get('window')

const RadioButton = ({ title, onPress, buttonStyle, textStyle}) => {
    return (
        <TouchableOpacity onPress={onPress} style={[buttonStyle, styles.button]}>
            <Text style={[textStyle, styles.text]}>
                {title}
            </Text>
            </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button: {
        height: 50,
        width: width/2,
        margin: 20,
        borderColor: 'black',
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: 'black',
        shadowOpacity: 0.5,
        shadowOffset: {width:2, height:2}
    },
    text: {
        fontSize: 15,
        textTransform: 'uppercase'
    }
})

export default RadioButton;