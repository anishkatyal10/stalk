import database from '@react-native-firebase/database';

export const AddUser = async (name, email, phone, uid, image) => {
  try {
    return await database()
      .ref(`/users/${uid}`)
      .set({
        name: name,
        email: email,
        phone: phone,
        uuid: uid,
        image: image
      });
  } catch (error) {
    return error;
  }
};
