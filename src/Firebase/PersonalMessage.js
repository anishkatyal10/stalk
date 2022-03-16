import database from '@react-native-firebase/database';

export const SendMessage = async (currentUid, guestUid, msgValue) => {
  try {
    return await database()
      .ref('personalMessages/' + currentUid)
      .child(guestUid)
      .push({
        message: {sender: currentUid, reciever: guestUid, msg: msgValue},
      });
  } catch (error) {
    return error;
  }
};

export const RecieveMessage = async (currentUid, guestUid, msgValue) => {
  try {
    return await database()
      .ref('personalMessages/' + guestUid)
      .child(currentUid)
      .push({
        message: {sender: currentUid, reciever: guestUid, msg: msgValue},
      });
  } catch (error) {
    return error;
  }
};
