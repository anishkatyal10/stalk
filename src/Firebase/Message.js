import database from '@react-native-firebase/database';

export const SendMessage = async (currentUid, msgValue) => {
    try {
        return await database().ref('messages/').
        push({
            sender: currentUid,
            msg: msgValue
        })
    } catch (error) {
        return error;
    }
}

