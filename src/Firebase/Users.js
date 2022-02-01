import Firebase from './firebaseConfig';

export const AddUser = async (name, email, phone, image, uid) => {
    try {
        return await Firebase.database().ref('users/' + uid).
        set({
            name: name,
            email: email,
            phone: phone,
            image:image,
            uuid: uid
        })
    } catch (error) {
        return error;
    }
}

