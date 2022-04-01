import React, {Children, PureComponent} from 'react';
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
                status: child.val().status, 
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
              <TouchableOpacity>
                <Image
                  style={{height: 70, width: 70, borderRadius: 45}}
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
                  fontSize: 15,
                  marginTop: 10,
                }}>
                {this.state.loggedInUserName}
              </Text>
            </View>
          }
          renderItem={({item}) => (
              <View style={{marginBottom: 10, marginTop: 20}}>
              <TouchableOpacity
                style={{flexDirection: 'row', marginBottom: 10}} onPress={()=> this.props.navigation.navigate('personalChat', { UserName: item.username, guestUid: item.uuid, Status: item.status })}>
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
                        width: 40,
                        height: 40,
                        borderRadius: 30,
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
                    marginLeft: 25,
                    marginBottom: 5
                  }}>
                  <Text
                    style={{color: '#fff', fontSize: 15}}>
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
