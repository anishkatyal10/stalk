import React, {PureComponent} from 'react';
import {View, Text, TouchableOpacity, FlatList, Image} from 'react-native';
import 'firebase/firestore';
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AppHeader from '../components/AppHeader';

class RegisteredUsers extends PureComponent {
  state = {
    allUsers: [],
    allImages: [],
    loggedInUserName: '',
    loggedInUserImage: '',
  };
  async componentDidMount() {
    try {
      await database()
        .ref('users')
        .on('value', async(datasnapshot) => {
          const uuid = await AsyncStorage.getItem('UID');
          let users = [];
          let images = [];
          datasnapshot.forEach(child => {
            if (child.val().uuid === uuid) {
              this.setState({
                loggedInUserName: child.val().name,
                loggedInUserImage: child.val().image,
              });
            } else {
              users.push({
                username: child.val().name,
                uuid: child.val().uuid,
                userImage: child.val().image,
              });
              console.log(users, 'all users');
              console.log(users[0].userImage, 'all the uses');

            }
          });
          this.setState({allUsers: users});
        });
    } catch (error) {
      alert(error);
    }
  }
  render() {
    return (
      <View style={{flex: 1, backgroundColor: '#000'}}>
        <FlatList
          alwaysBounceVertical={false}
          data={this.state.allUsers}
          style={{padding: 5}}
          keyExtractor={(_, index) => index.toString()}
          ListHeaderComponent={
            <View
              style={{
                height: 160,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <TouchableOpacity
                style={{height: 90, width: 90, borderRadius: 45}}>
                <Image
                  style={{height: 90, width: 90, borderRadius: 45}}
                  source={{
                    uri:
                      this.state.loggedInUserImage === ''
                        ? 'https://www.gravatar.com/avatar/3ab55ddf029b22784705ae27722bfb8d'
                        : this.state.loggedInUserImage,
                  }}
                />
              </TouchableOpacity>
              <Text
                style={{
                  color: '#fff',
                  fontSize: 20,
                  marginTop: 10,
                  fontWeight: 'bold',
                }}>
                {this.state.loggedInUserName}
              </Text>
            </View>
          }
          renderItem={({item}) => (
              <View style={{marginBottom: 10, marginTop: 20}}>
              <TouchableOpacity
                style={{flexDirection: 'row', marginBottom: 10}} onPress={()=> this.props.navigation.navigate('personalChat', { UserName: item.username, guestUid: item.uuid })}>
                  <View
                    style={{
                      width: '14%',
                      alignItems:'flex-start',
                      justifyContent:'flex-start',
                      flexDirection:'row'
                    }}
                    >
                    <Image
                      style={{
                        width: 50,
                        height: 50,
                        borderRadius: 40,
                        marginLeft: 10,
                      }}
                      source={{
                        uri: item.userImage
                      }}
                    />
                    
                  </View>
                <View
                  style={{
                    width: '86%',
                    alignItems: 'flex-start',
                    justifyContent: 'center',
                    marginLeft: 45,
                  }}>
                  <Text
                    style={{color: '#fff', fontSize: 16, fontWeight: 'bold'}}>
                    {item.username}
                  </Text>
                </View>
              </TouchableOpacity>
              <View style={{borderWidth: 0.7, borderColor:'#fff'}}/>
              </View>
          )}
        />
      </View>
    );
  }
}

export default RegisteredUsers;
