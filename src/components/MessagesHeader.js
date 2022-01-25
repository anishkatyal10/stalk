import React from 'react';
import {SearchBar} from 'react-native-elements';
import {View, Text, StyleSheet} from 'react-native';

const MessagesHeader = () => {

    return (
      <View>
        <View style={{alignItems: 'center'}}>
          <Text style={styles.MessagesHeader}>Group Chat</Text>
        </View>
        <View>
          <SearchBar placeholder="Search Messages.." />
        </View>
      </View>
    );
  }

export default MessagesHeader;

const styles = StyleSheet.create({
  textHeading: {
    color: 'white', 
    fontSize: 20, 
    fontWeight: 'bold'
  }
})