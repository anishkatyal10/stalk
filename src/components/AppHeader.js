import React, {PureComponent} from 'react';
import {Text, View, TouchableOpacity, StyleSheet} from 'react-native';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';

class AppHeader extends PureComponent {
  render() {
    const {title, onPress, navigation} = this.props;
    return (
      <View style={{height: 60, marginBottom: 20}}>
        <View
          style={[
            styles.gradient,
            {paddingTop: 5, backgroundColor: '#ffd31d'},
          ]}>
          <View style={styles.headerView}>
            {title === 'Messages' ? (
              <View style={{width: '10%'}}></View>
            ) : (
              <View style={{ flexDirection:'row'}}>
                <TouchableOpacity
                  style={styles.iconView}
                  onPress={() => {
                    navigation.goBack('Users');
                  }}>
                  <Icons name="arrow-left-thick" size={22} color="#000" />
                </TouchableOpacity>
              
            
              <Text
                style={
                  ([styles.textView],
                  {fontSize: 20, fontWeight: 'bold', color: 'black'})
                }>
                {title}
              </Text>
            </View>
            )}
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  gradient: {
    padding: 10,
    paddingLeft: 50
  },
  headerView: {},
  iconView: {
      marginRight:32,
      marginTop: 10
  },
  textView: {
  },
});

export default AppHeader;
