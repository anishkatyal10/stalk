import Firebase from './firebaseConfig';

export const AddUser = async (name, email, phone, uid) => {
    try {
        return await Firebase.database().ref('users/' + uid).
        set({
            name: name,
            email: email,
            phone: phone,
            uuid: uid
        })
    } catch (error) {
        return error;
    }
}

// export const UpdateImage = async (image, uid) => {
//     try {
//         return await Firebase.database().ref('users/' + uid).
//         update({
//             image: image,
            
//         })
//     } catch (error) {
//         return error;
//     }
// }


