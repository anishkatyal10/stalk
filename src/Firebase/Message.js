import Firebase from './firebaseConfig';

export const SendMessage = async (currentUid, msgValue) => {
    try {
        return await Firebase.database().ref('messages/').
        push({
            sender: currentUid,
            msg: msgValue
        })
    } catch (error) {
        return error;
    }
}

