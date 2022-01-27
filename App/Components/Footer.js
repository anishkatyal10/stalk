import React from 'react';
import { View, Text, StyleSheet, ImageBackground } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const Footer = () => {
    return (
<View style={{ backgroundColor: '#F5FFFA', height: 70, alignItems: 'center', justifyContent: 'center' }}>
        <View style={{ flexDirection: 'row' }}>
          <FontAwesome5 style={{ paddingHorizontal: 10 }} name={'youtube'} size={20} />
          <FontAwesome5 style={{ paddingHorizontal: 10 }} name={'twitter'} size={20} />
          <FontAwesome5 style={{ paddingHorizontal: 10 }} name={'instagram'} size={20} />
          <FontAwesome5 style={{ paddingHorizontal: 10 }} name={'facebook'} size={20} />
        </View>
        <Text> www.yourweb.com</Text>
      </View>
    )
}

export default Footer;