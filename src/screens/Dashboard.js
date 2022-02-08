import React, {PureComponent} from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  TextInput,
  View,
  FlatList,
  Image,
} from 'react-native';
import Firebase from '../Firebase/firebaseConfig';
import Icons from 'react-native-vector-icons/Feather';
import {SendMessage, Display} from '../Firebase/Message';
import AsyncStorage from '@react-native-async-storage/async-storage';
import storage from '@react-native-firebase/storage';
import 'firebase/firestore';

class Dashboard extends PureComponent {
  state = {
    message: '',
    currentUid: '',
    allMessages: [],
    status: 'online',
    allUsers: []
  };

  async componentDidMount() {
    const currentUid = await AsyncStorage.getItem('UID');
    this.setState({currentUid: currentUid});

    try {
      Firebase.database()
        .ref('messages')
        .on('value', dataSnap => {
          let message = [];
          dataSnap.forEach(data => {
            message.push({
              sendBy: data.val().sender,
              message: data.val().msg,
            });
          });
          this.setState({allMessages: message.reverse()});
        });
    } catch (error) {
      alert(error);
    }
    this.displayUsers();
  }

  displayUsers = () => {
    if (this.state.currentUid) {
      try {
        Firebase.database()
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
    Firebase.database()
      .ref('users/' + uid)
      .once('value', snap => {
        this.setState({allUsers: [...this.state.allUsers, snap.val().image]});
        console.log(this.state.allUsers, 'user images');
      });
  };
  showOnlineUsers = () => {
    {
      this.state.allUsers.map((item, id) => {
        <li key={id} style={{marginVertical: 5, marginHorizontal: 5}}>
          <Image
            style={{width: 58, height: 58, borderRadius: 40}}
            source={{uri: item}}
          />
        </li>;
      });
    }
  };
  sendMessage = () => {
    if (this.state.message) {
      SendMessage(this.state.currentUid, this.state.message)
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
        <View style={{flexDirection:'row'}}>
          {this.state.allUsers.map((image, i) => {
            return (
              <View style={{flexDirection:'row', marginVertical: 5, marginHorizontal: 5}} key={i}>
                <Image style= {{width:40, height: 40, borderRadius: 40}} source={{uri: image}} />
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
              <View
                style={{
                  borderRadius: 20,
                  backgroundColor:
                    this.state.currentUid === item.sendBy ? '#E0D5FF' : '#EBEBEB',
                }}>
                <Text style={styles.messageText}>{item.message}</Text>
              </View>
            </View>
          )}
        />
        <View style={styles.inputBoxView}>
          <View
            style={{width: '10%', justifyContent: 'center', marginLeft: 10}}>
            <Icons name="camera" size={25} color="#00B5BD" />
          </View>
          <View style={{width: '75%', justifyContent: 'center'}}>
            <TextInput
              placeholder="Enter message .."
              placeholderTextColor="#000"
              style={{
                height: 40,
                borderRadius: 15,
                backgroundColor: '#EAEEEF',
                paddingLeft: 25,
              }}
              value={this.state.message}
              onChangeText={text => this.setState({message: text})}
            />
          </View>
          <View
            style={{width: '10%', justifyContent: 'center', marginLeft: 10}}>
            <Icons
              name="send"
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
    padding: 10,
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
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
