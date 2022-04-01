import Firebase from './firebaseConfig';
import database from '@react-native-firebase/database';
import moment from 'moment';

export const SendMessage = async (currentUid, name, msgValue) => {
  var todayDate = moment();
  try {
    return await database()
      .ref('messages/')
      .push({
        sender: currentUid,
        senderName: name,
        msg: msgValue,
        date: todayDate.format('D MMM, yyyy'),
        time: todayDate.format('hh:mm A'),
      });
  } catch (error) {
    return error;
  }
};
