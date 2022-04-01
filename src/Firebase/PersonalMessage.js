import database from '@react-native-firebase/database';
import moment from 'moment';

export const SendMessage = async (currentUid, guestUid, msgValue) => {
  var todayDate = moment();

  try {
    return await database()
      .ref('personalMessages/' + currentUid)
      .child(guestUid)
      .push({
        message: {
          sender: currentUid,
          reciever: guestUid,
          msg: msgValue,
          date: todayDate.format('D MMM, YYYY'),
          time: todayDate.format('hh:mm A'),
        },
      });
  } catch (error) {
    return error;
  }
};

export const RecieveMessage = async (currentUid, guestUid, msgValue) => {
  var todayDate = moment();

  try {
    return await database()
      .ref('personalMessages/' + guestUid)
      .child(currentUid)
      .push({
        message: {
          sender: currentUid,
          reciever: guestUid,
          msg: msgValue,
          date: todayDate.format('D MMM, YYYY'),
          time: todayDate.format('hh:mm A'),
        },
      });
  } catch (error) {
    return error;
  }
};
