import React, {PureComponent} from 'react';
import {Dimensions,
    StyleSheet,
    Text,
    TextInput,
    View,
    FlatList,
    Image,
    BackHandler,
    Alert,} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import { SendMessage, RecieveMessage } from '../Firebase/PersonalMessage';
import AppHeader from '../components/AppHeader';
import database from '@react-native-firebase/database';
import moment from 'moment';

class PersonalChat extends PureComponent {
    state = {
        message: '',
        guestUid: '',
        currentUid: '',
        allMessages: []
    }

    async componentDidMount(){
        // const { navigation } = this.props;
        // console.log(this.props, "props")
        const currentUid = await AsyncStorage.getItem('UID');
        console.log(currentUid, "current user chat id")
        const guestUid = this.props.route.params.guestUid;
        console.log(guestUid, "reciever user chat id")

        this.setState({currentUid: currentUid, guestUid: guestUid})
        try {
            database().
              ref('personalMessages').
              child(currentUid).
              child(guestUid).
              on('value', (dataSnap) => {
                let messages = [];
                dataSnap.forEach((data) => {
                  messages.push({
                    sendBy: data.val().message.sender,
                    recieveBy:data.val().message.reciever,
                    msg: data.val().message.msg,
                    date: data.val().message.date,
              time: data.val().message.time,
                  });
                });
                this.setState({ allMessages: messages.reverse() });
                console.log("all personal messages", this.state.allMessages)
              });
          } catch (error) {
            alert(error);
          }
    }

    sendMessage = () => {
        if (this.state.message) {
          SendMessage(this.state.currentUid, this.state.guestUid, this.state.message)
            .then(() => {
              this.setState({ message: '' });
            })
            .catch(error => {
              alert(error);
            });
      
          RecieveMessage(this.state.currentUid, this.state.guestUid, this.state.message)
            .then(() => {
              this.setState({ message: '' });
            })
            .catch(error => {
              alert(error);
            });
        }
      };
    render(){
        return(
            <View style={{ flex: 1, backgroundColor: '#1F313B' }}>
                {/* <AppHeader title={this.props.route.params.UserName} navigation={this.props.navigation} /> */}
            <FlatList
              style={{ marginBottom: 60 }}
              inverted
              data={this.state.allMessages}
              keyExtractor={index => index.toString()}
              renderItem={({ item }) => (
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
                      borderRadius: 5,
                      backgroundColor:
                        this.state.currentUid === item.sendBy
                          ? '#ECFFDC'
                          : '#EBEBEB',
                    }}>
                    <Text style={styles.messageText}>{item.msg}</Text>
                    <Text style={styles.timeText}>{item.time}</Text>

                  </View>
                </View>
              )}
            />
            <View style={styles.inputBoxView}>
              <View
                style={{ width: '10%', justifyContent: 'center', marginLeft: 10 }}>
                <Icons name="camera-outline" size={25} color="#00B5BD" />
              </View>
              <View style={{ width: '75%', justifyContent: 'center' }}>
                <TextInput
                  placeholder="Enter message .."
                  placeholderTextColor="#000"
                  style={{
                    height: 40,
                    color: "#000",
                    borderRadius: 15,
                    backgroundColor: '#EAEEEF',
                    paddingLeft: 25,
                  }}
                  value={this.state.message}
                  onChangeText={(text) => this.setState({ message: text })}
                />
              </View>
              <View
                style={{ width: '10%', justifyContent: 'center', marginLeft: 10 }}>
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
    export default PersonalChat;

    const styles = StyleSheet.create({
      messgaeContainer: {
        height: 550,
        backgroundColor: 'pink',
      },
      messageText: {
        padding: 5,
        fontSize: 10,
        fontWeight:'10',
        color: 'black',
      },
      inputBoxView: {
        bottom: 0,
        height: 55,
        width: '100%',
        position: 'absolute',
        flexDirection: 'row',
      },
      timeText: {
        padding: 5,
        fontSize: 5,
        fontWeight:'10',
        color: 'black',
        alignItems:'flex-end',
        position:'relative',
      },
    });
       