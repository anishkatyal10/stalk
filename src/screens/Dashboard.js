import React, {PureComponent} from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  TextInput,
  View,
  FlatList,
  Image,
  BackHandler,
  Alert,
} from 'react-native';
import database from '@react-native-firebase/database';
import Firebase from '../Firebase/firebaseConfig';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import {SendMessage} from '../Firebase/Message';
// import Icons from "react-native-vector-icons/FontAwesome"
import AsyncStorage from '@react-native-async-storage/async-storage';
import 'firebase/firestore';
import moment from 'moment';
import auth from '@react-native-firebase/auth';

class Dashboard extends PureComponent {
  state = {
    message: '',
    currentUid: '',
    currentUserName: '',
    allUserInfo: [],
    allMessages: [],
    status: 'online',
    allUsers: [],
    allNames: [],
  };

  async componentDidMount() {
    const currentUid = await AsyncStorage.getItem('UID');
    const uName = database()
      .ref(`/users/${currentUid}`)
      .on('value', snapshot => {
        this.setState({currentUserName: snapshot.val().name});
      });

    this.setState({currentUid: currentUid})

    try {
      database()
        .ref('messages')
        .on('value', dataSnap => {
          let message = [];
          dataSnap.forEach(data => {
            message.push({
              sendBy: data.val().sender,
              sendName: data.val().senderName,
              message: data.val().msg,
              date: data.val().date,
              time: data.val().time,
            });
          });
          this.setState({allMessages: message.reverse()});
        });
    } catch (error) {
      alert(error);
    }
    BackHandler.addEventListener('hardwareBackPress', this.backStuff);
    // this.userInfo();

    this.displayUsers();
  }

  backStuff = () => {
    Alert.alert('Hold on!', 'Are you sure you want to exit Stalk?', [
      {
        text: 'Cancel',
        onPress: () => null,
        style: 'cancel',
      },
      {text: 'YES', onPress: () => BackHandler.exitApp()},
    ]);
    return true;
  };

  displayUsers = () => {
    if (this.state.currentUid) {
      try {
        database()
          .ref('online')
          .on('value', dataSnap => {
            dataSnap.forEach(data => {
              this.getOnlineUsers(data.val().uuid);
            });
          });
      } catch (error) {
        alert(error);
      }
    }
  };

  getOnlineUsers = uid => {
    this.setState({allUsers: []});
    database()
      .ref(`/users/${uid}`)
      .once('value', snap => {
        this.setState({
          allUsers: [...this.state.allUsers, snap.val().image],
          allNames: [...this.state.allNames, snap.val().name],
        });
        console.log(this.state.allUsers, 'user images');
      });
  };

  // getUserInfo = (uid) => {
  //   console.log(this.state.allUserInfo, "allusers")

  //   const recieverUser =  this.state.allUserInfo.filter((item)=>{
  //    item.currentUid.uuid===uid
  //  })
  //  return recieverUser.length > 0 ? recieverUser[0].name : 'other'
  // };

  // userInfo = () => {
  //   database().ref('users/').once('value', snap => {

  //       this.setState({allUserInfo: [...this.state.allUserInfo, snap.val()]})

  //   })
  // }
  sendMessage = () => {
    if (this.state.message) {
      SendMessage(
        this.state.currentUid,
        this.state.currentUserName,
        this.state.message,
      )
        .then(() => {
          this.setState({message: ''});
        })
        .catch(error => {
          alert(error);
        });
    }
  };

  render() {
    return (
      <View style={{flex: 1, backgroundColor: '#1F313B'}}>
        <View style={{flexDirection: 'row'}}>
          {this.state.allUsers.map((image, i) => {
            console.log(image, 'user');
            return (
              <View
                style={{
                  flexDirection: 'row',
                  marginVertical: 5,
                  marginHorizontal: 5,
                }}
                key={i}>
                <Image
                  style={{width: 50, height: 50, borderRadius: 40}}
                  source={{uri: image}}
                />
                <View style={{top: 35, right: 15}}>
                  <Icons name="circle" color="#31A24C" size={15} />
                </View>
              </View>
            );
          })}
        </View>

        <FlatList
          style={{marginBottom: 60}}
          inverted
          data={this.state.allMessages}
          keyExtractor={index => index.toString()}
          renderItem={({item}) => (
            <View
              style={{
                marginVertical: 5,
                maxWidth: Dimensions.get('window').width / 2 + 10,
                margin: 10,
                alignSelf:
                  this.state.currentUid === item.sendBy
                    ? 'flex-end'
                    : 'flex-start',
              }}>
              <Text style={styles.dateText}>{item.date}</Text>

              <View
                style={{
                  borderRadius: 5,
                  backgroundColor:
                    this.state.currentUid === item.sendBy
                      ? '#ECFFDC'
                      : '#EBEBEB',
                }}>
                <Text style={styles.nameText}>
                  {this.state.currentUid === item.sendBy
                    ? 'You'
                    : item.sendName}
                </Text>

                <Text style={styles.messageText}>{item.message}</Text>
                <Text style={styles.timeText}>{item.time}</Text>
              </View>
            </View>
          )}
        />
        <View style={styles.inputBoxView}>
          <View
            style={{width: '10%', justifyContent: 'center', marginLeft: 10}}>
            <Icons name="camera-outline" size={25} color="#00B5BD" />
          </View>
          <View style={{width: '75%', justifyContent: 'center'}}>
            <TextInput
              placeholder="Enter message .."
              placeholderTextColor="#000"
              style={{
                height: 40,
                color: '#000',
                borderRadius: 15,
                backgroundColor: '#EAEEEF',
                paddingLeft: 25,
                padding: 1,
              }}
              value={this.state.message}
              onChangeText={text => this.setState({message: text})}
            />
          </View>
          <View
            style={{width: '10%', justifyContent: 'center', marginLeft: 10}}>
            <Icons
              name="send-outline"
              size={25}
              color="#00B5BD"
              onPress={() => this.sendMessage()}
            />
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  messgaeContainer: {
    height: 550,
    backgroundColor: 'pink',
  },
  messageText: {
    padding: 5,
    fontSize: 10,
    color: 'black',
  },
  timeText: {
    padding: 5,
    fontSize: 5,
    color: 'black',
    alignItems: 'flex-end',
    position: 'relative',
  },
  dateText: {
    padding: 5,
    fontSize: 5,
    color: 'white',
    alignItems: 'flex-end',
    position: 'relative',
  },
  nameText: {
    padding: 5,
    fontSize: 8,
    color: 'green',
    alignItems: 'flex-end',
    position: 'relative',
  },
  inputBoxView: {
    bottom: 0,
    height: 55,
    width: '100%',
    position: 'absolute',
    flexDirection: 'row',
  },
});

export default Dashboard;
